<template>
  <div id="app" :data-color-scheme="colorScheme">
    <div class="dark-mode-toggle" @click="toggleDarkMode">
      <font-awesome-icon icon="moon"/>
    </div>
    <the-sidebar v-if="platformLoaded" />
    <div class="view-wrapper" :class="{ dashboard: platformLoaded}">
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
    import TheSidebar from "@/components/TheSidebar/TheSidebar"

    export default {
        name: 'app',
        components: {
            TheSidebar,
            TheFooter
        },
        data() {
            return {}
        },
        computed: {
            platformLoaded() {
              return PlatformModule.loaded
            },
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
    min-height: 100vh;
    overflow: hidden;
  }

  .dark-mode-toggle {
    position: fixed;
    top: 20px;
    right: 30px;
    cursor: pointer;
    z-index: 1000;

    @include theme() {
      color: t($text);
    }
  }

  .view-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-y: scroll;

    &.dashboard {
      margin-left: 18rem;
    }

    @include theme() {
      background-color: t($background-secondary);
      color: t($text);
    }
  }
</style>
