import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  accounts: { 
    '1234': { name: 'Rick', balances: { checking: 100.00, savings: 50.00} },
    '5000': { name: 'Joe', balances: { checking: 60.00, savings: 220.00 } },
    '7777': { name: 'Mary', balances: { checking: 120.00, savings: 200.00 } },
    '5491': { name: 'Jane', balances: { checking: 75.00, savings: 320.00 } }
  },
  fsm: [],
  currentCustomerID: ''
};

const getters = {
  accounts: (state) => { return state.accounts; },
  current_fsm: (state) => { return state.fsm.length > 0? state.fsm[state.fsm.length - 1] : null; },
  currentCustomerAcctInfo: (state) => { return state.accounts[state.currentCustomerID]; },
  currentCustomerID: (state) => { return state.currentCustomerID; }
};

const mutations = {
  PUSH_FSM: (state, fsm) => {
    state.fsm.push(fsm);
  },
  POP_FSM: (state) => {
    fsm = state.fsm.pop();
  },

  UPDATE_BALANCE: (state, info) => {
    let customerInfo = state.accounts[info.id];
    customerInfo.balances[info.account] += info.amount;
    state.account[info.id] = customerInfo;
  },

  SET_CURRENT_CUSTOMER_ID: (state, id) => {
    state.currentCustomerID = id;
  }
};

const actions = {
};

export default new Vuex.Store( {
  state, getters, mutations, actions
})