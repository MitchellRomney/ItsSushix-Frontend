<template>
  <div id="sidebar-navigation">
    <router-link class="sidebar-navigation__item-wrapper" :to="{ name: 'Home' }">
      <NavigationItem name="Home" icon="home"/>
    </router-link>
    <router-link class="sidebar-navigation__item-wrapper" :to="{ name: 'Leaderboard' }">
      <NavigationItem name="Leaderboard" icon="trophy"/>
    </router-link>
    <div class="sidebar-navigation__logout-wrapper" v-if="user" @click="logout">
      <NavigationItem name="Logout" icon="sign-out-alt"/>
    </div>
  </div>
</template>

<script>
    import NavigationItem from "./NavigationItem"
    import {AuthModule} from "@/store/modules/auth";

    export default {
        name: "sidebar-navigation",
        components: {
            NavigationItem
        },
        computed: {
            user() {
                return AuthModule.user
            }
        },
        methods: {
            logout() {
                AuthModule.logout()
            }
        }
    }
</script>

<style lang="scss">
  #sidebar-navigation {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

    .sidebar-navigation__item-wrapper, .sidebar-navigation__logout-wrapper {
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.25s cubic-bezier(0.445, 0.05, 0.55, 0.95);

      &.router-link-exact-active {
        font-weight: bold;
        opacity: 1;
      }

      &:hover {
        opacity: 1;
        transform: scale(1.1, 1.1);
      }
    }

    .sidebar-navigation__logout-wrapper {
      margin-top: auto;
    }
  }
</style>