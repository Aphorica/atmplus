import StateMachine from 'javascript-state-machine';

export default new StateMachine({
  init: 'ready',
  data: {
      returnState: ''
    },
  transitions: [
    { name: 'card-inserted', from: 'ready',                     to: 'pin' },
    { name: 'confirm',     from: 'pin',               to: 'action-selection' },
    { name: 'reject',      from: 'pin',               to: 'pin-error' },
    { name: 'confirm',   from: 'pin-error',      to: 'action-selection' },
    { name: 'reject', from: 'pin-error', to: 'pin-error' },
    { name: 'card-returned',    from: 'return-card',               to: 'ready' },

    { name: 'deposit',     from: 'action-selection',             to: 'deposit-transaction' },
    { name: 'transaction-complete', from: 'deposit-transaction', to: 'continue' },

    { name: 'withdraw',    from: 'action-selection',             to: 'withdrawal-transaction' },
    { name: 'transaction-complete', from: 'withdrawal-transaction', to: 'continue' },

    { name: 'next-transaction',    from: 'continue',                  to: 'action-selection' },
    { name: 'finish',      from: 'continue',                  to: 'return-card' },

    { name: 'cancel', from: ['action-selection', 'deposit-transaction', 'withdrawal-transaction', 'pin-error'],
                      to: 'confirm-cancel' },
    { name: 'cancel-confirmed', from: 'confirm-cancel', to: 'return-card' },
    { name: 'cancel-rejected', from: 'confirm-cancel', to: function(s) { return this.priorState(); }},

    { name: 'timed-out', from: '*', to:'ready' }
  ]
});
