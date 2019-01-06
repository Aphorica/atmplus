<template>
  <section id="main-content">
    <div id="atm-screen">
      <h4>For <span class="item-highlight">{{account}}</span></h4>
      <h4>Enter Amount to <span class="action-type">{{type}}:</span></h4>
      <form>
        <div class="mdl-textfield mdl-js-textfield" id="amount-input-wrapper">
          <input class="mdl-textfield__input" pattern="[1-9][0-9]*([.][0-9][0-9]){0,1}" 
                 id="amount-input" maxlength="12" autofocus="true" required="true"
                 v-model="amount" ref="amount_input" v-on:keydown="input_received()">
          <p v-if="errStr" class="error">{{errStr}}</p>
          <div v-if="infoStr" class="info">
            <p>{{infoStr}}</p>&nbsp;<spinner></spinner></p>
          </div>
        </div>
        <div v-if="infoStr.length === 0">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                  v-on:click.prevent="amountEntered()" type="submit" v-bind:disabled="amount.length === 0"
                  v-bind:class="{'mdl-button--colored': amount.length > 0}">Ok</button>
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
      self.infoStr = fsm.infoStr;
      self.errStr = fsm.errStr;
      self.amount = fsm.amount;
    });
    this.type = fsm.type;
    this.errStr = fsm.errStr;
    this.account = fsm.account;
  },
  mounted() {
    this.$refs.amount_input.focus();
  },
  data: function() { return {
    amount: '',
    account: '',
    type: '',
    errStr: '',
    infoStr: ''
  }},
  methods: {
    amountEntered() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.amount = this.amount;
      fsm.balances = this.$store.getters.currentCustomerAcctInfo.balances;
      fsm.infoStr = "Validating account balances";
      fsm.provide();
    },
    cancel() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.infoStr = '';
      fsm.cancel();
    },
    input_received() {
      this.$fsm_manager.setTimer();
    }
  }
}
</script>

<style scoped>
  #amount-input { width:16em; text-align:right; padding-right:0.5em; }
  #amount-input-wrapper {width:16em; padding:0; margin-left:auto; margin-right:auto; margin-bottom:1em;}
</style>
