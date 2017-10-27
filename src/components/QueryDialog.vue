<template>
  <modal name="query-dialog"
         @before-open="beforeOpen"
         :width="350"
         :height="150">
    <div class="dialog-container">
    <h5 v-if="title" class="dialog-title">{{title}}</h5>
      <div class="dialog-content">
        <p>{{msg}}</p>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                v-if="btn3_text" v-on:click="btn_clicked(btn3_text)">{{btn3_text}}</button>
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                v-if="btn2_text" v-on:click="btn_clicked(btn2_text)">{{btn2_text}}</button>
        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                v-on:click="btn_clicked(btn1_text)">{{btn1_text}}</button>
        
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'QueryDialog',
  data: function() { return {
    title: null,
    msg: null,
    btn1_text: '',
    btn2_text: null,
    btn3_text: null,
    btn_action: null,
  }},
  methods: {
    beforeOpen(event) {
      if (event.params.title)
        this.title = event.params.title;
      if (event.params.msg)
        this.msg = event.params.msg;

      this.btn1_text = event.params.btn1_text;
      if (event.params.btn2_text)
        this.btn2_text = event.params.btn2_text;
      if (event.params.btn2_text)
        this.btn3_text = event.params.btn3_text;
      this.btn_action = event.params.btn_action;
    },
    btn_clicked(btn_text) {
      this.btn_action(btn_text);
    }
  }
}
</script>

<style>
  .dialog-container { margin-left:auto; margin-right:auto; background-color:lightgray;
                      padding-bottom:20px; }
  .dialog-title { background: darkgray; color:white; padding:10px; margin-top:0;}
  .dialog-content { min-height: 3em;  }
  button { width:initial; }
</style>
