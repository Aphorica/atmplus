<template>
   <section>
    <div>
      <h4>Returning Card:</h4>
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="done()">
          Take Card
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReturnCard",
  methods: {
    done() {
      let fsm = this.$fsm_manager.currentFSM();
      fsm.cardReturned();
    }
  }
}
</script>
