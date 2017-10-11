<template>
   <section>
    <div>
      <h4>Select Action</h4>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="selected('deposit')">Deposit</button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="selected('withdrawal')">Deposit</button>
      </div>
    </div>
    <customer></customer>
  </section> 
</template>

<script>
export default {
  name: 'ActionSelection',
  methods: {
    selected: function(which) {
      console.log('in ActionSelection: ' + which + ' selected');
    }
  }
}
</script>

<style>

</style>
