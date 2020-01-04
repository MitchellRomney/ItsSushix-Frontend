<template>
  <div id="personal-stats">
    <UserStatsRowItem icon="crown" label="Sushi Rolls" :value="twitchUser.loyaltyPoints + ' Sushi Rolls'"/>
    <UserStatsRowItem icon="eye" label="Total Watchtime" :value="twitchUser.minutesWatched + ' Minutes'"/>
    <UserStatsRowItem icon="comment-dots" label="Chat Message Count" :value="twitchUser.messagesCount + ' Messages'"/>
    <UserStatsRowItem icon="crown" label="Total Subscribed Months" :value="twitchUser.subscriptionMonths + ' Months'"/>
  </div>
</template>

<script>
    import UserStatsRowItem from "@/components/UserStatsRow/UserStatsRowItem"

    export default {
        name: "PersonalStats",
        props: {
          twitchUser: {
              type: Object,
              required: true
          }
        },
        components: {
          UserStatsRowItem
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