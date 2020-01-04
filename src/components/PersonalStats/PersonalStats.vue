<template>
  <div id="personal-stats">
    <StatItem icon="crown" label="My Sushi Rolls" :value="twitchUser.loyaltyPoints + ' Sushi Rolls'"/>
    <StatItem icon="eye" label="My Total Watchtime" :value="twitchUser.minutesWatched + ' Minutes'"/>
    <StatItem icon="comment-dots" label="My Chat Message Count" :value="twitchUser.messagesCount + ' Messages'"/>
    <StatItem icon="crown" label="My Total Subscribed Months" :value="twitchUser.subscriptionMonths + ' Months'"/>
  </div>
</template>

<script>
    import {AuthModule} from "../../store/modules/auth"
    import StatItem from "@/components/PersonalStats/StatItem"

    export default {
        name: "PersonalStats",
        components: {
          StatItem
        },
        computed: {
            twitchUser() {
                return AuthModule.profile.twitchUser
            }
        }
    }
</script>

<style lang="scss" scoped>
  #personal-stats {
    display: grid;
    grid-gap: 50px;
    grid-template: auto / repeat(4, 1fr);
    width: 100%;
    margin-top: 50px;
  }
</style>