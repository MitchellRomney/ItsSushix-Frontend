<template>
  <div id="login">
    <div class="login-panel">
      <div class="login-panel__wrapper">
        <router-link to="/">
          <div class="login-panel__logo">
            <img alt="sushix" src="../assets/images/sushix-avatar.png"/>
          </div>
        </router-link>
        <a :href="twitchLoginLink">
          <button class="btn btn--twitch btn--icon" :class="{ 'btn--disabled' : returnedFromTwitch }">
            <font-awesome-icon :icon="['fab', 'twitch']"/>
            <span v-if="!returnedFromTwitch">Login with Twitch</span>
            <span v-else>Logging you in...</span>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    import * as JWT from 'jwt-decode'
    import {AuthModule} from "../store/modules/auth";

    export default {
        name: 'login',
        data() {
            return {}
        },
        computed: {
            returnedFromTwitch() {
                const hash = window.location.hash.substr(1);
                if (hash) {
                    return hash.split('&').reduce(function (result, item) {
                        const parts = item.split('=');
                        result[parts[0]] = parts[1];
                        return result;
                    }, {});
                } else {
                    return null
                }
            },
            twitchLoginLink() {
                if (!this.returnedFromTwitch) {
                    const client_id = process.env.VUE_APP_TWITCH_CLIENT_ID
                    const redirect_uri = process.env.NODE_ENV === 'development' ? 'http://localhost:8060/login' : 'https://sushix.tv/login'
                    const state = localStorage.getItem('state')
                    const response_type = 'token+id_token'
                    const scope = 'openid'
                    const claims = JSON.stringify({
                        id_token: {
                            email: null,
                            preferred_username: null
                        }
                    })

                    return (
                        'https://id.twitch.tv/oauth2/authorize' +
                        '?client_id=' + client_id +
                        '&redirect_uri=' + redirect_uri +
                        '&response_type=' + response_type +
                        '&scope=' + scope +
                        '&state=' + state +
                        '&claims=' + claims
                    )
                } else {
                    return ''
                }
            }
        },
        methods: {
            generateStateKey() {
                localStorage.setItem('state', [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join(''))
            }
        },
        mounted() {
            this.generateStateKey()
            if (this.returnedFromTwitch) {
                const parsedIdToken = JWT(this.returnedFromTwitch.id_token)
                this.$cookie.set('twitch_access_token', this.returnedFromTwitch.access_token)
                AuthModule.twitchLogin({
                    username: parsedIdToken.preferred_username,
                    email: parsedIdToken.email,
                    twitchId: parsedIdToken.sub
                })
            }
        }
    }
</script>

<style scoped lang="scss">
  #login {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    @include theme() {
      background-color: t($background-secondary);
    }

    .login-panel {
      width: 40%;

      .login-panel__wrapper {
        margin: auto;
        padding: 10px 50px;

        .login-panel__logo {
          img {
            width: 80%;
            @media #{$bp-lg}{
              width: 40%;
            }
          }
        }

        .login-panel__byline {
          margin: 25px 0;
        }

        .login-panel__error {
          padding: 20px;
          background-color: #EB5757;
          color: white;
          margin: 20px 0;
          border-radius: 2px;
        }

        .login-form {
          width: 100%;
          margin: auto auto 20px;
          box-shadow: 0 5px 5px rgba(69, 93, 199, .05), 0 10px 10px rgba(69, 93, 199, .1);
          @media #{$bp-lg}{
            width: 60%;
          }

          .login-form__username, .login-form__password {
            display: flex;
            flex-direction: column;
            padding: 10px 20%;
            border: 1px solid #DFE3E8;
          }

          .login-form__username {
            border-radius: 5px 5px 0 0;
          }

          .login-form__password {
            border-radius: 0 0 5px 5px;
            border-top: none;
          }

          label {
            opacity: 0.6;
            font-size: 0.8rem;
            padding: 5px;
          }

          input {
            border: none;
            text-align: center;
            font-size: 1rem;
            font-family: 'Panton', sans-serif;

            &:-webkit-autofill {
              -webkit-box-shadow: 0 0 0 30px white inset !important;

              &:hover {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
              }

              &:focus {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
              }

              &:active {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
              }
            }
          }
        }

        .login-panel__submit {
          width: 100%;
          height: 50px;
          background-color: $curious-blue;
          color: white;
          border: none;
          text-transform: uppercase;
          font-size: 1rem;
          margin-top: 20px;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          @media #{$bp-lg}{
            width: 60%;
          }
        }
      }

      .login-panel__register {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;

        span {
          opacity: 0.6;
        }
      }

      button {
        width: 100%;
        @media #{$bp-lg}{
          width: 60%;
        }
      }
    }
  }
</style>