<template>
  <div id="login">
    <div class="login-panel">
      <div class="login-panel__wrapper">
        <router-link to="/">
          <div class="login-panel__logo">
            <img alt="sushix" src="../assets/images/sushix-avatar.png"/>
          </div>
        </router-link>
        <div class="login-panel__error" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <h3 class="login-panel__byline">
          Login to your account you FOOL
        </h3>
        <form @submit.prevent="login" class="login-form">
          <div class="login-form__username">
            <label for="username_input"><b>Username:</b></label>
            <input id="username_input" v-model="username" placeholder="Enter your username..."
                   autocomplete="on" @keyup.enter="login">
          </div>
          <div class="login-form__password">
            <label for="password_input"><b>Password:</b></label>
            <input id="password_input" v-model="password" type="password"
                   placeholder="Enter your password..." autocomplete="on" @keyup.enter="login">
          </div>
        </form>

        <button class="btn btn--blue" @click="login">Login</button>

        <div class="login-panel__register">
          <span>Don't have an account yet?</span>
          <button class="btn btn--blue disabled">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {AuthModule} from "../store/modules/auth";

    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                loading: false,
                errorMessage: null,
            }
        },
        methods: {
            login() {
                AuthModule.login({
                    username: this.username,
                    password: this.password
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