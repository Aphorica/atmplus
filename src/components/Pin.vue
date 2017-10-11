<template>
  <section>
    <div>
      <h4>Enter Your Pin</h4>
      <form>
        <div class="mdl-textfield mdl-js-textfield" id="pin-input-wrapper">
          <input class="mdl-textfield__input" pattern="[0-9]{4}" type="number"
                 id="pin-input" maxlength="4" autofocus="true" required="true"
                 v-model="pin" ref="pin_input">
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
      console.log(pin);
      if (pin.length < 4 || parseInt(pin) == NaN) {
        error_bad_pin = true;
        this.$store.current_fsm.reject();
      } else if (pin !== this.$store.getters.currentCustomerID) {
        error_invalid_pin = true;
        this.$store.current_fsm.reject();
      } else
        this.$store.current_fsm.confirm();
    }
  }
}
</script>

<style scoped>
  #pin-input { width:5em; text-align:center; }
  #pin-input-wrapper {width:5em; padding:0; margin-left:auto; margin-right:auto; margin-bottom:1em;}
  .error { color: red; }
</style>
