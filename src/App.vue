<template>
  <div id="app">
    <query-dialog></query-dialog>
    <header>
      <span>Welcome to <em>BitBank</em></span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { EventBus } from './lib/event-bus';

export default {
  name: 'app',
  created() {
    self = this;
    EventBus.$on('inConfirmCancel', () => {
      self.showCancelDialog();
    });
    EventBus.$on('timeout', () => {
      self.$modal.hide('query-dialog');
    })
  },
  methods: {
    showCancelDialog() {
      let self = this;
      this.$modal.show('query-dialog', {
        title: 'Confirm Cancel?',
        btn1_text: 'Yes',
        btn2_text: 'No',
        btn_action: function(btn_text) {
            self.$modal.hide('query-dialog');
            self.$fsm_manager.cancelResponse(btn_text === 'Yes');
            }
        })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app span em { font-size: 1.5em; font-weight:bold; color:yellow; float:right; }

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

</style>
