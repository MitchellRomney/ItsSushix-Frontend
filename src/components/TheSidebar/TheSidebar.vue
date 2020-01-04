<template>
  <div id="sidebar">
    <div class="sidebar__inner">
      <UserPanel v-if="twitchUser" :twitch-user="twitchUser"/>
      <SidebarNavigation/>
    </div>
  </div>
</template>

<script>
    import UserPanel from "@/components/TheSidebar/UserPanel"
    import SidebarNavigation from "@/components/TheSidebar/SidebarNavigation/SidebarNavigation"
    import {AuthModule} from "@/store/modules/auth";

    export default {
        name: "the-sidebar",
        components: {
            UserPanel,
            SidebarNavigation
        },
        computed: {
            twitchUser() {
                return AuthModule.profile ? AuthModule.profile.twitchUser : null
            },
        },
    }
</script>

<style lang="scss">
  #sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 18rem;

    @include theme() {
      background-color: t($background);
      border: 1px solid t($border);
      color: t($text);
    }

    .sidebar__inner {
      display: grid;
      grid-template: auto 1fr / auto;
      height: 100%;
    }
  }
</style>