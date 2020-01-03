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
    width: 100vw;

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
        grid-template: auto / 2fr 1fr;
        grid-template-areas: 'leaderboard sidebar';
      }

      .sidebar {
        grid-area: sidebar;
        text-align: left;
        display: flex;
        flex-direction: column;

        .stats__panel {
          padding: 20px;
          display: flex;
          flex-direction: column;
          border-radius: 2px;

          @include theme() {
            background-color: t($background);
            border: 1px solid t($border);
          }

          .stats__header {
            text-align: center;
          }

          .stats__category {
            margin-top: 10px;

            .stats__sub-header {
              font-weight: bold;
              font-size: 0.8rem;
              opacity: 0.9;
              text-transform: uppercase;
              margin-top: 10px;
            }

            .stats__stat {
              display: grid;
              grid-template: auto / 2fr 1fr;

              .stats__stat-label {
                font-weight: bold;
              }

              .stats__stat-value {
                align-self: end;
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>
