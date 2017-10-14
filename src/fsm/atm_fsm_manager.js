import FSM_Manager from '../lib/fsm_manager';
import atm_transaction_fsm from './atm-transaction';

export default class ATM_FSM_Manager extends FSM_Manager {
  constructor(_router) {
    super(_router);
  }
  handleStateChange(info) {
     switch (info.to) {
       case 'deposit-transaction': 
       case 'withdrawal-transaction':
         this.setupTransaction(info); break;
       case 'transaction-validate':
         this.validateTransaction(info); break;
       case 'transaction-exec':
         this.executeTransaction(info); break;
       case 'transaction-exit':
         this.exitTransaction(info); break;
       default:;
     }
  }

  setupTransaction(info) {
    this.pushFSM(atm_transaction_fsm);
    let fsm = this.currentFSM();
    fsm.type = info.transition;
    fsm.init(); 
  }

  validateTransaction(info) {
    let fsm = this.currentFSM();
    fsm.errStr = '';
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
                // allow prior transition to complete
        let amount_val = parseFloat(fsm.amount);
        let current_val = parseFloat(fsm.balances[fsm.account]);
        if (fsm.type !== 'deposit' && amount_val > current_val) {
          fsm.errStr = 'Insufficient funds';
          resolve(false);
        } else
          fsm.provide();
          resolve(true);
      }, 0);
    }).then(function(result) {
      if (result)
        fsm.provide();
      else
        fsm.transactionInvalid();
    });
  }

  executeTransaction(info) {
    let fsm = this.currentFSM();
    fsm.errStr = '';
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (fsm.executeError) {
          fsm.errStr = "BitBank transaction failed.  Try again?"
          resolve(false);
        }
      else {
        let amount_val = parseFloat(fsm.amount);
        if (fsm.type !== 'deposit')
            amount_val = -amount_val;
        fsm.balances[fsm.account] += amount_val;
        resolve(true);
        }
      }, 1000);
    }).then(function(success) {
      if (success)
        fsm.provide();
      else
        fsm.transactionError();
    });
  }

  exitTransaction(info) {
    this.popFSM();
    this.currentFSM.transactionCompleted();
  }

}