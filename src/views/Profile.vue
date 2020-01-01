<template>
  <div id="profile">
    <div class="content-wrapper">
      <div class="profile" v-if="profile">
          {{ profile.loyaltyPoints }}
      </div>
    </div>
  </div>
</template>

<script>
    import Axios from "axios";
    import {query_getTwitchUser} from "../queries";

    export default {
        name: "Profile",
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
    width: 100vw;

    @include theme() {
      background-color: t($background-secondary);
    }

    .content-wrapper {
      display: grid;
      grid-gap: 20px;
      grid-template: auto / 2fr 1fr;
      padding: 50px 10%;
      min-height: calc(100vh - 100px);
    }
  }
</style>