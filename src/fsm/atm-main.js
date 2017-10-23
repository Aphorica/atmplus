import StateMachineHistory from 'javascript-state-machine/lib/history';
import DotStyle from './fsm_dot_styles.js';

export default {
  data: {
      timed_out: false
    },
  methods: {
    resetData: function() {
      this.timed_out = true;
    },
    onInvalidTransition: function(transition, from, to) {
      if (to === 'timeout')
        return;

      throw new Exception("transition not allowed: " + transition +
                          ", from: " + from + ", to: " + to);
    }
  },
  plugins: [
    new StateMachineHistory()
  ],
  transitions: [
    { name: 'init', from: 'none', to: 'ready', dot: DotStyle.SUCCESS },
    { name: 'card-inserted', from: 'ready',                     to: 'pin', dot: DotStyle.SUCCESS},
    { name: 'confirm',     from: 'pin',               to: 'action-selection', dot: DotStyle.SUCCESS },
    { name: 'reject',      from: 'pin',               to: 'pin-error', dot: DotStyle.ERROR },
    { name: 'confirm',   from: 'pin-error',      to: 'action-selection' , dot: DotStyle.SUCCESS },
    { name: 'reject', from: 'pin-error', to: 'pin-error', dot: DotStyle.ERROR },
    { name: 'card-returned',    from: 'return-card',               to: 'ready', dot: DotStyle.SUCCESS },

    { name: 'deposit',     from: 'action-selection',             to: 'deposit-transaction', dot: DotStyle.SUCCESS },
    { name: 'transaction-popped', from: 'deposit-transaction', to: 'action-selection', dot: DotStyle.SUCCESS },

    { name: 'withdraw',    from: 'action-selection',             to: 'withdrawal-transaction', dot: DotStyle.SUCCESS },
    { name: 'transaction-popped', from: 'withdrawal-transaction', to: 'action-selection', dot: DotStyle.SUCCESS },

    { name: 'done', from: 'action-selection', to: 'return-card', dot: DotStyle.CANCEL },
    { name: 'timeout', from: ['action-selection', 'deposit-transaction', 'withdrawal-transaction', 'pin', 'pin-error'],
                         to:'return-card', dot: DotStyle.TIMEOUT },
  ]
};