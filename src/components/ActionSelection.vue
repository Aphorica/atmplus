<template>
   <section>
    <div>
      <h4>Select Action</h4>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="selectTransaction('deposit')">Deposit</button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="selectTransaction('withdraw')">Withdrawal</button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-on:click="selectTransaction('done')">Done</button>
      </div>
    </div>
    <customer></customer>
  </section> 
</template>

<script>
import new_fsm from '../fsm/atm-transaction';

export default {
  name: 'ActionSelection',
  methods: {
    selectTransaction: function(type) {
      let currentFSM = this.$fsm_manager.currentFSM();
      if (type === 'deposit')
        currentFSM.deposit();
      else if (type === 'withdraw')
        currentFSM.withdraw();
      else if (type === 'done')
        currentFSM.done();
    }
  }
}
</script>

<style>

</style>
