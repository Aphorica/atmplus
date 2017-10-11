<template>
  <div id="app">
    <header>
      <span>Welcome to <em>BitBank</em></span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import mainFSM from './fsm_defs/atm-main';

export default {
  name: 'app',
  created() {
    let self = this;
    mainFSM.observe('onEnterState', function(info) { 
        console.log('State Changed'); 
        console.log(info);
        if (self.$router.getMatchedComponents('info.to').length > 0)
          self.$router.push({name: info.to});
       }) ;
    this.$store.commit('PUSH_FSM', mainFSM);
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
