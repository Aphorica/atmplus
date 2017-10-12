<template>
   <section>
    <div>
      <h4>Select Account for {{type}}:</h4>
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
    this.type = fsm.type;
  },
  data: function() { return {
      type: ''
    }},
  methods: {
    selectAccount(account) {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.data.account = account;
      fsm.provide();
    }
  }
}
</script>

<style>

</style>
