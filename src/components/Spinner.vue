<template>
  <img v-bind:src="imgSrc"/>
</template>

<script>
export default {
  name: 'Spinner',
  computed: {
    imgSrc: function() { return process.env['BASE_URL'] + 'img/Rolling.svg'}
  }
}
</script>