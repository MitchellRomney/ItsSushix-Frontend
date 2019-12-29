<template>
  <div id="home">
    <div class="leaderboard">
      <div class="leaderboard__header">
        <h1>Leaderboard</h1>
        <toggle-button v-model="metricLoyalty" :labels="{ checked: 'Loyalty', unchecked: 'Watch Time' }" :width="100"/>
      </div>
      <transition-group name="list">
        <div class="leaderboard__item" v-for="(user, index) in leaderboard" :key="user.id">
          <span>#{{ index + 1 }}</span>
          <span>{{ user.displayName }}</span>
          <div class="leaderboard__value">
          <span v-if="metricLoyalty">
            {{ user.loyaltyPoints }}
          </span>
            <span v-else>
            {{ user.minutesWatched }}
          </span>
            {{ metric }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
    import {query_getLeaderboard} from "@/queries"

    export default {
        name: 'home',
        data() {
            return {
                leaderboard: [],
                metricLoyalty: true
            }
        },
        watch: {
            metricLoyalty() {
                this.getLeaderboard()
            }
        },
        computed: {
            metric() {
                return this.metricLoyalty ? 'Sushi Rolls' : 'Minutes'
            }
        },
        methods: {
            getLeaderboard() {
                const metric = this.metricLoyalty ? 'loyalty_points' : 'minutes_watched'

                this.$axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'POST',
                    data: {
                        query: query_getLeaderboard,
                        variables: {
                            metric: metric
                        }
                    }
                }).then((response) => {
                    console.log(response.data.data.leaderboard)
                    this.leaderboard = response.data.data.leaderboard
                })
            }
        },
        mounted() {
            this.getLeaderboard()
        }
    }
</script>

<style lang="scss">
  #home {
    .leaderboard {
      width: 500px;
      margin: 0 auto;

      .leaderboard__header {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        align-items: center;
      }

      .leaderboard__item {
        display: grid;
        grid-template: auto / .5fr 1fr .5fr;
      }
    }
  }
</style>
