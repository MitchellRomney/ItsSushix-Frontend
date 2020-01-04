<template>
  <div id="leaderboard">
    <UserLeaderboard/>
  </div>
</template>

<script>
    import UserLeaderboard from "../components/UserLeaderboard/UserLeaderboard"

    export default {
        name: 'Leaderboard',
        components: {
            UserLeaderboard
        },
        data() {
            return {
                statistics: null
            }
        },
    }
</script>

<style lang="scss" scoped>
  #leaderboard {
    padding: 20px 5%;
  }
</style>