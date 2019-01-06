<template>
   <section id="main-content">
    <div id="atm-screen">
      <h4>Select Action</h4>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                v-on:click="selectTransaction('deposit')">&nbsp;Deposit&nbsp;</button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                v-on:click="selectTransaction('withdraw')">Withdrawal</button>
      </div>
      <br/>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                v-on:click="selectTransaction('done')">Done</button>
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
      let fsm = this.$fsm_manager.currentFSM();
      if (type === 'deposit')
        fsm.deposit();
      else if (type === 'withdraw')
        fsm.withdraw();
      else if (type === 'done')
        fsm.done();
    }
  }
}
</script>

<style scoped>
</style>
