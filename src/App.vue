<template>
  <div id="app" :data-color-scheme="colorScheme">
    <div class="dark-mode-toggle" @click="toggleDarkMode">
      <font-awesome-icon icon="moon"/>
    </div>
    <div class="view-wrapper">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      <TheFooter/>
    </div>
  </div>
</template>

<script>
    import {PlatformModule} from "@/store/modules/platform"
    import TheFooter from "@/components/TheFooter"

    export default {
        name: 'app',
        components: {
            TheFooter
        },
        data() {
            return {}
        },
        computed: {
            darkMode() {
                return PlatformModule.darkMode
            },
            colorScheme() {
                return this.darkMode ? 'dark' : 'light'
            },
        },
        methods: {
            toggleDarkMode() {
                PlatformModule.toggleDarkMode()
            }
        }
    }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    overflow: hidden;
  }

  .dark-mode-toggle {
    position: fixed;
    top: 40px;
    right: 50px;
    cursor: pointer;
    z-index: 1000;

    @include theme() {
      color: t($text);
    }
  }

  .view-wrapper {
    @include theme() {
      background-color: t($background-secondary);
      color: t($text);
    }
  }
</style>
