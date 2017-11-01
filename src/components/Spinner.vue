<template>
  <img v-bind:src="imgSrc"/>
</template>

<script>
export default {
  name: 'Spinner',
  computed: {
    imgSrc: function() { return process.env['ROOT_PATH'] + 'static/img/Rolling.svg'}
  }
}
</script>