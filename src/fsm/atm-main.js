import StateMachine from 'javascript-state-machine';
import DotStyle from './fsm_dot_styles.js';

export default new StateMachine({
  init: 'ready',
  data: {
      returnState: ''
    },
  transitions: [
    { name: 'card-inserted', from: 'ready',                     to: 'pin', dot: DotStyle.SUCCESS},
    { name: 'confirm',     from: 'pin',               to: 'action-selection', dot: DotStyle.SUCCESS },
    { name: 'reject',      from: 'pin',               to: 'pin-error', dot: DotStyle.ERROR },
    { name: 'confirm',   from: 'pin-error',      to: 'action-selection' , dot: DotStyle.SUCCESS },
    { name: 'reject', from: 'pin-error', to: 'pin-error', dot: DotStyle.ERROR },
    { name: 'card-returned',    from: 'return-card',               to: 'ready', dot: DotStyle.SUCCESS },

    { name: 'deposit',     from: 'action-selection',             to: 'deposit-transaction', dot: DotStyle.SUCCESS },
    { name: 'transaction-complete', from: 'deposit-transaction', to: 'continue', dot: DotStyle.SUCCESS },

    { name: 'withdraw',    from: 'action-selection',             to: 'withdrawal-transaction', dot: DotStyle.SUCCESS },
    { name: 'transaction-complete', from: 'withdrawal-transaction', to: 'continue', dot: DotStyle.SUCCESS },

    { name: 'next-transaction',    from: 'continue',                  to: 'action-selection', dot: DotStyle.SUCCESS },
    { name: 'finish',      from: 'continue',                  to: 'return-card', dot: DotStyle.SUCCESS },

    { name: 'cancel', from: ['action-selection', 'deposit-transaction', 'withdrawal-transaction', 'pin-error'],
                      to: 'confirm-cancel' , dot: DotStyle.CANCEL },
    { name: 'cancel-confirmed', from: 'confirm-cancel', to: 'return-card' , dot: DotStyle.SUCCESS},
    { name: 'cancel-rejected', from: 'confirm-cancel', to: function(s) { return this.priorState();}, dot: DotStyle.SUCCESS },

    { name: 'timed-out', from: ['action-selection', 'deposit-transaction', 'withdrawal-transaction', 'pin', 'pin-error'],
                         to:'return-card', dot: DotStyle.TIMEOUT },
  ]
});
