<template>
  <div id="home">
    <div class="content-wrapper">
      <div class="sidebar">
        <UserPanel v-if="twitchUser" :twitch-user="twitchUser"/>
        <button class="btn btn--blue" @click="login()" v-else>
          Login
        </button>
      </div>
      <UserLeaderboard/>
    </div>
  </div>
</template>

<script>
    import UserPanel from "@/components/UserPanel/UserPanel"
    import UserLeaderboard from "@/components/UserLeaderboard/UserLeaderboard"
    import {AuthModule} from "@/store/modules/auth";

    export default {
        name: 'landing',
        components: {
            UserPanel,
            UserLeaderboard
        },
        data() {
            return {
                statistics: null
            }
        },
        computed: {
            twitchUser() {
                return AuthModule.profile ? AuthModule.profile.twitchUser : null
            },
        },
        methods: {
            login() {
                this.$router.push({name: 'Login'})
            },
        },
    }
</script>

<style lang="scss">
  #home {
    max-width: 100vw;

    @include theme() {
      background-color: t($background-secondary);
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      padding: 50px 10%;
      min-height: calc(100vh - 100px);

      @media #{$bp-md}{
        display: grid;
        grid-gap: 30px;
        grid-template: auto auto / 2fr 1fr;
        grid-template-areas: 'leaderboard sidebar' 'leaderboard .';
      }

      .sidebar {
        position: sticky;
        grid-area: sidebar;
        text-align: left;
        display: flex;
        flex-direction: column;
        top: 0;
      }
    }
  }
</style>
