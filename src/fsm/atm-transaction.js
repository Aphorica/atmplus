import StateMachine from 'javascript-state-machine';

export default new StateMachine({
  data: {
      type: '',
      account: ''
    },
  transitions: [
    { name: 'init',     from: 'none',             to: 'account-selection' },
    { name: 'provide',     from: 'account-selection',    to: 'amount' },
    { name: 'provide',     from: 'amount',     to: 'transaction-validator' },
    { name: 'transaction-invalid',     from: 'transaction-validator',    to: 'transaction-error' },
    { name: 'transaction-valid',     from: 'transaction-validator',          to: 'transaction' },
    { name: 'transaction-error-retry', from: 'transaction-error', to: 'account-selection' },
    { name: 'complete-transaction', from: 'transaction', to: 'completed' },
    { name: 'cancel', from: ['account-selection', 'amount', 'transaction-error'], to: 'cancelled' }
  ]
});