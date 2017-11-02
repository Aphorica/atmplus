<template>
   <section id="main-content">
    <div id="atm-screen">
      <h4 v-html="msg"></h4>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                v-if="btnLabel.length > 0" v-on:click="done()">
          {{btnLabel}}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReturnCard",
  data: function() { return {
    msg: 'Returning Card',
    btnLabel: 'Take card',
    takeCardTimeoutID: -1
  }},
  mounted() {
    let self = this;
    this.takeCardTimeoutID = setTimeout(function() {
      let fsm = self.$fsm_manager.currentFSM();
      self.msg = "Card not taken<br/><br/>Retaining card";
      self.btnLabel = '';
      fsm.cardTimeout();
    }, 10000);
  },
  methods: {
    done() {
      if (this.takeCardTimeoutID != -1)
        clearTimeout(this.takeCardTimeoutID);
      let fsm = this.$fsm_manager.currentFSM();
      fsm.cardReturned();
    }
  }
}
</script>
