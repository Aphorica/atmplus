<template>
  <section id="main-content">
    <div id="atm-screen">
      <h3>Hello, {{name}}</h3>
      <h4>Please Enter Your Pin:</h4>
      <form v-on:submit.prevent="pinEntered()">
        <div class="mdl-textfield mdl-js-textfield" id="pin-input-wrapper">
          <input class="mdl-textfield__input" type="number"
                 id="pin-input" maxlength="4" autofocus="true" required="true"
                 v-model="pin" ref="pin_input">
        </div>
        <div v-if="error_bad_pin" class="error bad-pin">Pin must be four digits</div>
        <div v-if="error_invalid_pin" class="error invalid-pin">Incorrect pin entered</div>
        <div>
          <button type="submit"
                  class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                  v-bind:class="{'mdl-button-colored': pin.length === 4}"
                  v-bind:disabled="pin.length < 4">Ok</button>
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
    this.name = this.$store.getters.currentCustomerAcctInfo.name;
  },
  mounted() {
    this.$refs.pin_input.focus();
  },
  name: 'pin',
  data: function(){ return {
    pin: '',
    error_bad_pin: false,
    error_invalid_pin: false,
    name: ''
  }},
  methods:  {
    pinEntered: function() {
      let fsm = this.$fsm_manager.currentFSM();
      let pinVal = parseInt(this.pin);

      this.error_bad_pin = this.error_invalid_pin = false;

      if (isNaN(parseInt(this.pin)) || this.pin.length < 4) {
        this.error_bad_pin = true;
        fsm.reject();  // in case something else is interested...
      } else if (this.pin !== this.$store.getters.currentCustomerID) {
        this.error_invalid_pin = true;
        fsm.reject();  // ditto
      } else
        fsm.confirm();
    }
  }
}
</script>

<style scoped>
  #pin-input { width:5em; text-align:center; }
  #pin-input-wrapper {width:5em; padding:0; margin-left:auto; margin-right:auto; margin-bottom:1em;}
</style>
