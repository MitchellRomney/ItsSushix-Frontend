<template>
  <div id="loading">
    Loading...
  </div>
</template>

<script>
    import {PlatformModule} from "../store/modules/platform";

    export default {
        name: "Loading",
        methods: {
            loadPlatform() {
                PlatformModule.loadPlatform()
            }
        },
        mounted() {
            this.loadPlatform()
        }
    }
</script>

<style lang="scss" scoped>
  #loading {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    @include theme() {
      background-color: t($background-secondary);
    }
  }
</style>