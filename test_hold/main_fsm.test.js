import test from 'ava';
import StateMachine from 'javascript-state-machine';
import MAIN_FSM_DEF from '../src/fsm_defs/atm-main';

let fsm = null;

test.before(t => {
  fsm = StateMachine.factory(MAIN_FSM_DEF);
});

test.serial('main fsm created', t => {
  t.not(fsm, null, '');
});