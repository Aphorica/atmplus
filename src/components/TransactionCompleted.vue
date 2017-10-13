<template>
  <section>
    <div>
      <h4>Transaction Completed. Another?</h4>
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
