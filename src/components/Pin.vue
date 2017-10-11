<template>
  <section>
    <div>
      <h4>Enter Your Pin</h4>
      <form>
        <div class="mdl-textfield mdl-js-textfield" id="pin-input-wrapper">
          <input class="mdl-textfield__input" pattern="[0-9]{4}" type="text" v-model="pin" id="pin-input" >
        </div>
        <div v-if="error_bad_pin" class="error bad-pin">Pin must be four digits</div>
        <div v-if="error_invalid_pin" class="error invalid-pin">Incorrect pin entered</div>
        <div>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="pin_entered()">Ok</button>
        </div>
      </form>
      <p>(Pin is the account number)</p>
    </div>
    <customer></customer>
  </section>

</template>
<script>
export default {
  created() {
    this.accounts = this.$store.getters.accounts;
  },
  name: 'pin',
  data: function(){ return {
    pin: '',
    error_bad_pin: false,
    error_invalid_pin: false
  }},
  methods:  {
    pinEntered: function() {
    }
  }
}
</script>

<style scoped>
  #pin-input { width:5em; }
  #pin-input-wrapper {width:5em; padding:0; margin-left:auto; margin-right:auto; margin-bottom:1em;}
  .error { color: red; }
</style>
