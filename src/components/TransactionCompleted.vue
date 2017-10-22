<template>
  <section>
    <div>
      <h4><span class="item-highlight">{{type}}</span> {{tofrom}} 
          <span class="item-highlight">{{account}}</span> Completed.<br/>Another?</h4>
    </div>
    <div>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="clicked('yes')">Yes</button>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-on:click="clicked('no')">No</button>
    </div>
    <customer></customer>
  </section>
</template>

<script>
export default {
  name: 'TransactionCompleted',
  created() {
    let fsm = this.$fsm_manager.currentFSM();
    fsm = this.$fsm_manager.currentFSM();
    this.account = fsm.account;
    this.type = fsm.type;
    this.tofrom = this.type === "deposit"? "to" : "from";
  },
  data: function() { return{
    account: '',
    type: '',
    tofrom: ''
  }},
  methods: {
    clicked: function(action) {
      let fsm = this.$fsm_manager.currentFSM();
      fsm = this.$fsm_manager.currentFSM();
      if (action === 'yes')
        fsm.another();
      else
        fsm.provide();
    }
  }

}
</script>

<style>

</style>
