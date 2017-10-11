import StateMachine from 'javascript-state-machine';

export default new StateMachine({
  transitions: [
    { name: 'begin',     from: 'none',             to: 'account' },
    { name: 'provide',     from: 'account',    to: 'amount' },
    { name: 'provide',     from: 'amount',     to: 'transaction-validator' },
    { name: 'transaction-invalid',     from: 'transaction-validator',    to: 'transaction-error' },
    { name: 'transaction-valid',     from: 'transaction-validator',          to: 'transaction' },
    { name: 'transaction-error-retry', from: 'transaction-error', to: 'account' },
    { name: 'complete-transaction', from: 'transaction', to: 'completed' },
    { name: 'cancel', from: ['account', 'amount', 'transaction-error'], to: 'cancelled' }
  ]
});