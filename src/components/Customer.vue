<template>
  <div id="customer">
     <h4>Account Info ({{customerAcctInfo.name}})</h4>
      <table>
        <tr><th class="cust-th" >Account # (pin):</th><td v-bind:class="{'cust-td': isPinState}">{{customerID}}</td></tr>
        <tr class="separator"><td class="separator" colspan="2"></td></tr>
        <tr><th>Checking:</th><td>${{customerAcctInfo.balances.checking}}</td></tr>
        <tr><th>Savings:</th><td>${{customerAcctInfo.balances.savings}}</td></tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'customer',
  created() {
    this.customerID = this.$store.getters.currentCustomerID;
    this.customerAcctInfo = this.$store.getters.currentCustomerAcctInfo;
    this.fsm = this.$fsm_manager.currentFSM();
  },
  data: function() { return {
    customerID: '',
    customerAcctInfo: {},
    fsm: {}
  }},
  computed: {
    isPinState: function() {
      return this.fsm.state === 'pin';
    }
  }
}
</script>
<style scoped>
  #customer { background-color:black; color:white; height:10000px;}
  h4 { padding-top: 0.5em; margin-bottom:3px; }
  table { width:20em; margin-left:auto; margin-right:auto; border:thin solid white;
          padding:0.5em;}
  .cust-td,.cust-th { font-weight:bold; font-size: 1.3rem;}
  .cust-td { color: crimson; }
  .cust-td::before, .cust-td::after { content: '--'; }
  .separator { height: 1px; background-color:gray; padding:0; }
  th {text-align:left; font-size:1.2rem; }
  td {text-align:right; font-size:1.2rem; }
  th,td { padding-top: 5px; padding-bottom:5x;}
</style>