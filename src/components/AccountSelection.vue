<template>
   <section>
    <div>
      <h4>Select Account to <span class="action-type">{{type}}:</span></h4>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="selectAccount('checking')">Checking</button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="selectAccount('savings')">Savings</button>
      </div>
    </div>
    <customer></customer>
  </section> 
</template>
<script>
export default {
  name: 'AccountSelection',
  created() {
    let fsm = this.$fsm_manager.currentFSM();
    fsm = this.$fsm_manager.currentFSM();
    this.type = fsm.type;
  },
  data: function() { return {
      type: ''
    }},
  methods: {
    selectAccount(account) {
      let fsm = this.$fsm_manager.currentFSM();
      fsm = this.$fsm_manager.currentFSM();
      fsm.account = account;
      fsm.provide();
    }
  }
}
</script>

<style>
  .action-type { font-style:italic; font-weight: bold; font-size: 1.1em; }
</style>
