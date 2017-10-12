import FSM_Manager from '../lib/fsm_manager';
import atm_transaction_fsm from './atm-transaction';

export default class ATM_FSM_Manager extends FSM_Manager {
  handleStateChange(info) {
     switch (info.to) {
       case 'deposit-transaction': 
       case 'withdraw-transaction':
         this.setupTransaction(info);
         break;
       default:;
     }
  }

  setupTransaction(info) {
    this.pushFSM(atm_transaction_fsm);
    let fsm = this.currentFSM();
    fsm.type = info.name;
    fsm.init(); 
  }
}