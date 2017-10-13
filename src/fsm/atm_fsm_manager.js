import FSM_Manager from '../lib/fsm_manager';
import atm_transaction_fsm from './atm-transaction';

export default class ATM_FSM_Manager extends FSM_Manager {
  handleStateChange(info) {
     switch (info.to) {
       case 'deposit-transaction': 
       case 'withdraw-transaction':
         this.setupTransaction(info);
         break;
       case 'transaction-validate':
         this.validateTransaction(info);
         break;
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
    let self = this;
    setTimeout(function() {
      this.errStr = '';
      let fsm = self.currentFSM();
      let amount_val = parseFloat(fsm.amount);
      let current_val = parseFloat(fsm.balances[fsm.type]);
      if (fsm.type !== 'deposit' && amount_val > current_val) {
        self.errStr = 'Insufficient funds';
        fsm.transactionInvalid();
      } else
        fsm.provide();
    }, 0)

  }
}