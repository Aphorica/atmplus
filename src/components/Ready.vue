<template>
  <div>
    <h4>Please Select a Card to Insert</h4>
    <div class="styled-select slate card-select">
      <select v-on:change="cardSelected($event)">
        <option v-for="key in Object.keys(accounts)" v-bind:key="key" v-bind:value="key"
                v-text="makeEntryString(key)"></option>
      </select>
    </div>
    <h4 class="ok" v-if="card_inserted">Card Inserted</h4>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  created() {
    this.accounts = this.$store.getters.accounts;
  },
  name: 'ready',
  data: function(){ return {
    accounts: null,
    key: null,
    card_inserted: false
  }},
  methods:  {
    cardSelected: function(event) {
      let fsm = this.$fsm_manager.currentFSM();
      this.card_inserted = true;
      this.$store.commit('SET_CURRENT_CUSTOMER_ID', event.target.value);
      setTimeout(function() {
        fsm.cardInserted();
      },1000);
    },
    makeEntryString: function(key) {
      let acc = this.accounts[key];
      return acc.name + ', Card# ' + key + ' Checking: $' +
             acc.balances.checking + ', Savings: $' + acc.balances.savings;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .ok { color: green; margin-top: 3em;}
  .card-select { width:470px!important; margin-left:auto; margin-right:auto; }
  .card-select select { width: 500px!important; }
</style>
