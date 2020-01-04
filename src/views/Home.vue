<template>
  <div id="home">

  </div>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style lang="scss">
  #home {
    max-width: 100vw;

    @include theme() {
      background-color: t($background-secondary);
    }
  }
</style>
