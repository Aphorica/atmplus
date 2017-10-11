import test from 'ava';
var store = null;

test.before('', t => {
  store = require('../src/store/store.js');
});

test.serial('fetch customer accounts', t => {
  let accounts = store.accounts;
  console.log('>>>> accounts length: ' + accounts.length);
  t.is(accounts.length, 4, 'accounts count is incorrect');
  t.is(object.keys, ['1234','5000','7777','5491'], 'accounts keys are incorrect');
});