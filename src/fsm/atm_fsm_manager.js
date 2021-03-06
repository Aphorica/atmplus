import StateMachine from 'javascript-state-machine';
import Promise from 'bluebird'

import FSM_Manager from 'fsm-manager';
import atm_main_def  from './atm-main';
import atm_transaction_def from './atm-transaction';
import { EventBus } from '../lib/event-bus.js';

let TIMER_DURATION = 60000;
let LOGGING = true;

export default class ATM_FSM_Manager extends FSM_Manager {
  constructor(_router) {
    super(_router, LOGGING);
    let main_fsm = new StateMachine(atm_main_def);
    this.setupObserver(main_fsm);
    this.pushFSM(main_fsm);
    this.currentFSM().init();
  }

  setTimer() {
    super.setTimer(TIMER_DURATION);
  }

  beforeStateChange(info) {
    if (info.to === "ready")
      this.stopTimer();

    else if (info.transition !== 'timeout')
      this.setTimer();
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
        case 'confirm-cancel':
          this.confirmCancel(info); break;
        case 'swallow-card':
          this.swallowCard(info); break;
        default:;
      }
  }

  setupTransaction(info) {
    let transaction_fsm = new StateMachine(atm_transaction_def);
    this.setupObserver(transaction_fsm);

    this.pushFSM(transaction_fsm);
    let fsm = this.currentFSM();
    fsm.type = info.transition;
    if (fsm.state === 'none') {
      fsm.init(); 
    }
    else {
      fsm.reset();
    }
  }

  validateTransaction(info) {
    let fsm = this.currentFSM();
    fsm.errStr = '';
    return Promise.delay(0).then(function() {
      let amount_val = parseFloat(fsm.amount);
      let current_val = parseFloat(fsm.balances[fsm.account]);
      if (fsm.type !== 'deposit' && amount_val > current_val) {
        fsm.errStr = 'Insufficient funds';
        fsm.infoStr = '';
        return false;
      } else
        return true;
      }).delay(3000).then(function(result) {
      if (result) {
        fsm.provide();
      }
      else
        fsm.transactionInvalid();
    });
  }

  executeTransaction(info) {
    let fsm = this.currentFSM();
    fsm.errStr = '';
    return Promise.delay(5000).then(function() {
        if (fsm.executeError) {
          fsm.errStr = "BitBank transaction failed.  Try again?"
          return(false);
        }
      else {
        let amount_val = parseFloat(fsm.amount);
        if (fsm.type !== 'deposit')
            amount_val = -amount_val;
        fsm.balances[fsm.account] += amount_val;
        return(true);
        }
      }).delay(0).then(function(success) {
        if (success) {
          fsm.provide();
        } else
          fsm.transactionError();
      });
  }

  confirmCancel(info) {
    EventBus.$emit('inConfirmCancel');
  }

  swallowCard(info) {
    let fsm = this.currentFSM();
    return Promise.delay(3000).then(function() {
      fsm.cardSwallowed();
    })
  }

  exitTransaction(info) {
    let self = this;
    setTimeout(function() {
      let currentFSM = self.popFSM();
      self.currentFSM().transactionPopped();
    }, 0);
  }

  cancelResponse(cancel) {
    if (cancel)
      this.currentFSM().exit();
    else 
      this.currentFSM().historyBack();
  }

  handleTimeout() {
    EventBus.$emit('timeout');
  }
}