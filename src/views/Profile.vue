<template>
  <div id="profile">
    <div class="profile__inner" v-if="profile">
      <div class="profile__heading">
        <div class="profile__avatar" v-if="profile">
          <img :alt="profile.displayName" class="responsive" :src="profile.profileImageUrl"/>
        </div>
        <h2 :style="{ color: profile.color}">
          {{ profile.displayName }}
        </h2>
      </div>
      <UserStatsRow :twitch-user="profile"/>
    </div>
  </div>
</template>

<script>
    import Axios from "axios";
    import {query_getTwitchUser} from "../queries";
    import UserStatsRow from "../components/UserStatsRow/UserStatsRow"

    export default {
        name: "Profile",
        components: {
          UserStatsRow
        },
        data() {
            return {
                profile: null
            }
        },
        computed: {
            profileUsername() {
                return this.$route.params.username
            }
        },
        methods: {
            fetchProfile() {
                Axios({
                    url: process.env.VUE_APP_API_URL + '/graphql',
                    method: "post",
                    data: {
                        query: query_getTwitchUser,
                        variables: {
                            username: this.profileUsername,
                        },
                    }
                }).then((response) => {
                    this.profile = response.data.data.twitchUser
                })
            }
        },
        mounted() {
            this.fetchProfile()
        }
    }
</script>

<style lang="scss" scoped>
  #profile {
    padding: 50px 5%;

    .profile__inner {
      .profile__heading {
        display: flex;
        align-items: center;
        margin-bottom: 50px;

        .profile__avatar {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 10px;
          margin-right: 20px;

          @include theme() {
            border: 1px solid t($border);
          }
        }
      }
    }
  }
</style>