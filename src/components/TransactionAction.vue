<template>
  <section>
    <div>
      <h4>{{title}}</h4>
      <div id="table-wrapper">
        <table class="mdl-data-table mdl-js-data-table">
          <tr><th class="mdl-data-table__cell--non-numeric">{{tofrom}}:</th>
              <td class="mdl-data-table__cell--non-numeric">{{account}}</td>
          </tr>
          <tr><th class="mdl-data-table__cell--non-numeric">Amount:</th>
              <td class="mdl-data-table__cell--non-numeric">{{amount}}</td>
          </tr>
        </table>
      </div>
      <div>
        <button v-if="showOK" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="accept()">Ok</button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-on:click="cancel()">Cancel</button>
      </div>
    </div>
    <customer></customer>
  </section> 
</template>

<script>
export default {
  name: "TransactionAction",
  created() {
    let fsm = this.$fsm_manager.currentFSM();
    let currentState = fsm.state;
    this.type = fsm.type;
    this.amount = fsm.amount;
    this.account = fsm.account;
    this.tofrom = this.type === 'deposit'? 'To' : 'From';
    this.title = currentState === 'transaction-verify'? 'Verifying: continue ' + fsm.type + '?' :
                 currentState === 'transaction-exec'? 'Executing ' + fsm.type + ':' :
                 currentState === 'transaction-completed'? 'Finished ' + fsm.type + ':' :
                 'Error: Bad State';
    this.showOK = currentState !== 'transaction-exec';
  },
  data: function() {return{
    type: '',
    amount: '',
    account: '',
    tofrom: '',
    title: '',
    showOK: true
  }},
  methods: {
    accept: function() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.provide();
    },
    cancelled: function() {
      fsm.cancelled();
    }
  }
}
</script>

<style scoped>
  #table-wrapper table { width:18em; margin-left:auto; margin-right:auto; margin-bottom:2em; }
  #table-wrapper table th { font-size: 1.3em; text-align:left; }
  #table-wrapper table td { font-size: 1.3em; border:none; text-align:right; }
</style>
