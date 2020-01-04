<template>
  <div id="UserLeaderboard">
    <div class="leaderboard__header">
      <h2>Twitch Leaderboard</h2>
      <div class="leaderboard__select-wrapper">
        <div class="leaderboard__select-label">
          <div class="leaderboard__select-info" v-if="metric === 'subscriptionMonths'" v-tooltip="'Make sure you send a message in chat and then check back!'">
            Not seeing your name?
          </div>
          <label for="metric">
            Category:
          </label>
        </div>
        <div class="leaderboard__select">
          <div class="leaderboard__refresh" @click="getLeaderboard()">
            <font-awesome-icon icon="sync"/>
          </div>
          <select id="metric" v-model="metric">
            <option value="loyaltyPoints">Sushi Rolls</option>
            <option value="minutesWatched">Minutes Watched</option>
            <option value="subscriptionMonths">Subscribed Months</option>
            <option value="messagesCount">Total Chat Messages</option>
          </select>
        </div>
      </div>
    </div>
    <div class="leaderboard__panel">
      <div class="leaderboard__list">
        <div class="leaderboard__column-headers">
          <div>
            Position
          </div>
          <div class="leaderboard__header-user">
            User
          </div>
          <div>
            {{ metricLabel }}
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <transition-group name="list-item" tag="div" class="leaderboard__items" v-if="!leaderboardLoading">
            <leaderboard-item v-for="(user, index) in sortedLeaderboard" :key="user.id" :user="user" :index="index"
                              :metric="metric"/>
          </transition-group>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
    import {query_getLeaderboard} from "../../queries";
    import LeaderboardItem from "@/components/UserLeaderboard/LeaderboardItem"
    import {PlatformModule} from "@/store/modules/platform";

    export default {
        name: "user-leaderboard",
        components: {
            LeaderboardItem
        },
        data() {
            return {
                leaderboardLoading: true,
                leaderboard: [],
                metric: 'loyaltyPoints',
                statistics: null
            }
        },
        computed: {
            metricLabel() {
                const labels = {
                    'loyaltyPoints': 'Sushi Rolls',
                    'minutesWatched': 'Minutes Watched',
                    'subscriptionMonths': 'Months Subscribed',
                    'messagesCount': 'Total Chat Messages'
                }
                return labels[this.metric]
            },
            platformVersion() {
                return PlatformModule.packageVersion
            },
            sortedLeaderboard() {
                let leaderboard = this.leaderboard
                return leaderboard.sort( (a, b) => {
                      let x = a[this.metric]
                    let y = b[this.metric]
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            }
        },
        watch: {
            metric() {
                this.getLeaderboard()
            }
        },
        methods: {
            getLeaderboard() {
                this.leaderboardLoading = true
                this.$http({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: 'POST',
                    data: {
                        query: query_getLeaderboard,
                        variables: {
                            metric: this.metric
                        }
                    }
                }).then((response) => {
                    this.leaderboard = response.data.data.leaderboard
                    this.leaderboardLoading = false
                })
            },
        },
        mounted() {
            this.getLeaderboard()
        }
    }
</script>

<style lang="scss" scoped>
  #UserLeaderboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin-top: 20px;

    @media #{$bp-md}{
      grid-area: leaderboard;
      margin-top: 0;
    }

    .leaderboard__header {
      position: relative;
      display: flex;
      align-items: center;
      text-align: left;
      font-weight: bold;
      font-size: 0.8rem;
      opacity: 0.9;
      text-transform: uppercase;
      height: 70px;

      .leaderboard__select-wrapper {
        display: flex;
        margin-left: auto;
        flex-direction: column;

        .leaderboard__select-label {
          display: flex;
          align-items: center;
          margin-bottom: 3px;

          label {
            font-weight: bold;
            font-size: 0.8rem;
            opacity: 0.9;
            text-transform: uppercase;
            margin-left: auto;
          }

          .leaderboard__select-info {
            font-size: 0.6rem;
            margin-right: 10px;
            font-weight: bold;
            cursor: pointer;
          }
        }

        .leaderboard__select {
          display: flex;
          margin-left: auto;

          .leaderboard__refresh {
            font-size: 0.8rem;
            cursor: pointer;
            padding: 2px 10px 2px 0;
          }
        }
      }
    }

    .leaderboard__panel {
      border-radius: 2px;

      @include theme() {
        background-color: t($background);
        border: 1px solid t($border);
      }

      .leaderboard__list {
        .leaderboard__column-headers {
          font-weight: bold;
          font-size: 0.8rem;
          opacity: 0.9;
          text-transform: uppercase;
          display: grid;
          padding: 10px 0;
          grid-template: auto / .5fr 50px 1fr .5fr;
          text-align: center;

          @include theme() {
            border-top: 1px solid t($border);
            border-bottom: 1px solid t($border);
          }

          .leaderboard__header-user {
            grid-column-end: span 2;
          }
        }

        .leaderboard__items {
          display: grid;
          grid-template: repeat(30, 1fr) / auto;
        }
      }
    }
  }
</style>