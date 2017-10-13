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
          <tr v-if="isVerifyingState">
            <th class="mdl-data-table__cell--non-numeric">Set Error?</th>
            <td class="mdl-data-table__cell--non-numeric">
                <input type="checkbox" v-model="executeError">
              </label>
              </form>
            </td>
          </tr>
        </table>
        <p class="error" v-if="errStr">{{errStr}}</p>
      </div>
      <div>
        <button v-if="!isExecState" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="accept()">Ok</button>
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
    let self = this;
    let fsm = this.$fsm_manager.currentFSM();
    fsm = this.$fsm_manager.currentFSM();
    fsm.observe('onEnterState', function(info){
      self.currentState = info.to;
      self.updateTransientData();
    });
    this.currentState = fsm.state;
    this.type = fsm.type;
    this.amount = fsm.amount;
    this.account = fsm.account;
    this.tofrom = this.type === 'deposit'? 'To' : 'From';
    this.updateTransientData();
  },
  data: function() {return{
    type: '',
    amount: '',
    account: '',
    tofrom: '',
    title: '',
    errStr: '',
    executeError: false,
    isExecState: false,
    isErrorState: false,
    isVerifyingState: false
  }},
  methods: {
    accept: function() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.executeError = this.executeError;
      fsm.provide();
    },
    cancelled: function() {
      fsm.cancelled();
    },
    stateChanged: function(info) {

    },
    updateTransientData: function() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm = this.$fsm_manager.currentFSM();

      this.title = this.currentState === 'transaction-verify'? 'Verifying: continue ' + this.type + '?' :
                   this.currentState === 'transaction-exec'? 'Executing ' + this.type + ':' :
                   this.currentState === 'transaction-error'? 'Error: ' + this.type + ':' :
                   'Error: Bad State';

      this.isExecState = this.currentState === 'transaction-exec';
      this.isVerifyingState = this.currentState === 'transaction-verify';
      this.isErrorState = this.currentState === 'transaction-error';
      this.errStr = fsm.errStr;
    }
  }
}
</script>

<style scoped>
  #table-wrapper table { width:18em; margin-left:auto; margin-right:auto; margin-bottom:2em; }
  #table-wrapper table th { font-size: 1.3em; text-align:left; }
  #table-wrapper table td { font-size: 1.3em; border:none; text-align:right; }
</style>
