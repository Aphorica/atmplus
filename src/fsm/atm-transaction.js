import StateMachineHistory from 'javascript-state-machine/lib/history';
import DotStyles from './fsm_dot_styles.js';

 export default {
  data: {
      timeout: false,
      type: '',
      account: '',
      amount: '',
      errStr: '',
      infoStr: '',
      executeError: false,
      balances: {}
    },
  methods: {
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
    { name: 'init',     from: 'none',             to: 'account-selection', dot: DotStyles.SUCCESS },
    { name: 'provide',     from: 'account-selection',    to: 'amount', dot: DotStyles.SUCCESS },
    { name: 'provide',     from: 'amount',     to: 'transaction-validate', dot: DotStyles.SUCCESS },
    { name: 'transaction-invalid',     from: 'transaction-validate',    to: 'amount', dot: DotStyles.ERROR },
    { name: 'provide',     from: 'transaction-validate',          to: 'transaction-verify', dot: DotStyles.SUCCESS },
    { name: 'provide', from: ['transaction-verify', 'transaction-error'], to: 'transaction-exec', dot: DotStyles.SUCCESS },
    { name: 'provide', from: 'transaction-exec', to: 'transaction-completed', dot: DotStyles.SUCCESS },
    { name: 'transaction-error', from: 'transaction-exec', to: 'transaction-error', dot: DotStyles.ERROR },
    { name: 'cancel', from: ['account-selection', 'amount', 'transaction-validate', 'transaction-error', 
                             'transaction-verify'],
                      to: 'confirm-cancel', dot: DotStyles.CANCEL },
    { name: 'another', from: ['transaction-completed', 'confirm-cancel'], to: 'account-selection', dot: DotStyles.SUCCESS },
    { name: 'provide', from: 'transaction-completed', to: 'transaction-exit', dot: DotStyles.SUCCESS },
    { name: 'exit', from: ['confirm-cancel'], to: 'transaction-exit', dot: DotStyles.SUCCESS },
    { name: 'timeout', from: ['account-selection', 'amount', 'transaction-verify',
                              'transaction-error', 'transaction-completed', 'confirm-cancel'], to: 'transaction-exit',
                       dot: DotStyles.TIMEOUT },
    { name: 'reset', from: 'transaction-exit', to: 'account-selection', dot:DotStyles.SUCCESS }
  ]
};