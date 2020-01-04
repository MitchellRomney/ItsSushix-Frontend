<template>
  <div id="home">
    <div class="home__header">
      <h2>Home</h2>
    </div>
    <UserStatsRow :twitch-user="twitchUser"/>
  </div>
</template>

<script>
  import UserStatsRow from "@/components/UserStatsRow/UserStatsRow";
  import {AuthModule} from "@/store/modules/auth";
    export default {
        name: 'home',
        components: {
            UserStatsRow
        },
        computed: {
            twitchUser() {
                return AuthModule.profile.twitchUser
            }
        }
    }
</script>

<style lang="scss">
  #home {
    padding: 50px 5%;

    @include theme() {
      background-color: t($background-secondary);
    }

    .home__header {
      display: flex;
      align-items: center;
      height: 70px;
    }
  }
</style>
