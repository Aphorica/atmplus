<template>
  <section>
    <div>
      <h4>Enter Amount to <span class="action-type">{{type}}:</span></h4>
      <form>
        <div class="mdl-textfield mdl-js-textfield" id="amount-input-wrapper">
          <input class="mdl-textfield__input" pattern="[1-9][0-9]*([.][0-9][0-9]){0,1}" 
                 id="amount-input" maxlength="12" autofocus="true" required="true"
                 v-model="amount" ref="amount_input">
          <p v-if="errStr" class="error">{{errStr}}</p>
        </div>
        <div>
          <button v-on:click.prevent="amountEntered()" type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Ok</button>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                  v-on:click.prevent="cancel()">Cancel</button>
        </div>
      </form>
    </div>
    <customer></customer>
  </section>
</template>
<script>
export default {
  name: 'Amount',
  created() {
    let self = this;
    let fsm = this.$fsm_manager.currentFSM();
    fsm.observe('onEnterState', function(info) {
      self.errStr = fsm.errStr;
    });
    this.type = fsm.type;
    this.errStr = fsm.errStr;
  },
  data: function() { return {
    amount: '',
    type: '',
    errStr: ''
  }},
  methods: {
    amountEntered() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.amount = this.amount;
      fsm.balances = this.$store.getters.currentCustomerAcctInfo.balances;
      fsm.provide();
    },
    cancel() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.cancel();
    }
  }
}
</script>

<style scoped>
  #amount-input { width:16em; text-align:right; padding-right:0.5em; }
  #amount-input-wrapper {width:16em; padding:0; margin-left:auto; margin-right:auto; margin-bottom:1em;}
</style>
