<template>
  <div>
    <hr/>
    <div class="demo-card-wide mdl-card">
      <div class="title-wrapper mdl-card__title">
        <p class="mdl-card__title-text">Account Info ({{customerAcctInfo.name}})</p>
      </div>
      <div class="mdl-card__supporting-text">
        <table>
          <tr><th class="cust-th" >Account # (pin):</th><td class="cust-td">{{customerID}}</td></tr>
          <tr><td colspan="2"><hr/></td></tr>
          <tr><th>Checking:</th><td>${{customerAcctInfo.balances.checking}}</td></tr>
          <tr><th>Savings:</th><td>${{customerAcctInfo.balances.savings}}</td></tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'customer',
  created() {
    this.customerID = this.$store.getters.currentCustomerID;
    this.customerAcctInfo = this.$store.getters.currentCustomerAcctInfo;
  },
  data: function() { return {
    customerID: '',
    customerAcctInfo: {}
  }},
}
</script>
<style scoped>
  .cust-td,.cust-th { font-weight:bold; font-size: 1.3rem;}
  .cust-td { color: crimson; }
  .cust-td::before, .cust-td::after { content: '--'; }
  .demo-card-wide {border: thin solid #ccc; width:300px; margin-left:auto; margin-right:auto;
                   margin-top:4rem;  }
  .mdl-card__title { background-color: cyan;}
  .mdl-card__title-text { color:#777; font-size: 1.5rem; font-weight:bold; margin-left:auto; margin-right:auto; }
  .title-wrapper { text-align:center!important; }
  .mdl-card__supporting-text table { width:100%; }
  th {text-align:left; font-size:1.2rem; }
  td {text-align:right; font-size:1.2rem; }
</style>