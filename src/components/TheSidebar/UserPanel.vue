<template>
  <div id="user-panel">
    <div class="user-panel__panel">
      <div class="user-panel__user">
        <div class="user-panel__avatar-wrapper">
          <router-link :to="{ name: 'Profile', params: { username: twitchUser.displayName }}">
            <div class="user-panel__avatar">
              <div class="user-panel__avatar-hover">
                Go To Profile
              </div>
              <img :alt="twitchUser.displayName" class="responsive" :src="twitchUser.profileImageUrl"/>
            </div>
          </router-link>
        </div>
        <div class="user-panel__user-name" :style="{color: twitchUser.color}">
          {{ twitchUser.displayName }}
        </div>
        <div class="user-panel__loyalty">
          {{ twitchUser.loyaltyPoints }} Sushi Rolls
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {AuthModule} from "../../store/modules/auth"

    export default {
        name: "UserPanel",
        props: {
            twitchUser: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                platformStatistics: null,
            }
        },
        computed: {
            user() {
                return AuthModule.user
            }
        },
    }
</script>

<style lang="scss" scoped>
  #user-panel {
    display: flex;
    flex-direction: column;
    border-radius: 2px;

    .user-panel__panel {
      padding: 20px;
      border-radius: 2px;

      .user-panel__user {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        text-align: center;
        font-size: 1.2rem;

        .user-panel__avatar-wrapper {
          position: relative;
          padding: 10px;
          height: 100px;
          width: 100px;
          border-radius: 30px;
          border: 2px solid $twitch-purple;
          margin-bottom: 20px;

          .user-panel__avatar {
            height: 100px;
            width: 100px;
            border-radius: 20px;
            overflow: hidden;
            position: relative;

            &:hover {
              cursor: pointer;

              &::before, .user-panel__avatar-hover {
                opacity: 1;
              }
            }

            .user-panel__avatar-hover {
              padding: 10px;
              text-transform: uppercase;
              font-weight: bold;
              font-size: 0.8rem;
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              opacity: 0;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              transition: opacity 0.25s ease;
              z-index: 100;
            }

            &::before {
              content: '';
              position: absolute;
              opacity: 0;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              background-color: rgba(black, 0.5);
              transition: opacity 0.25s ease;
            }

            @include theme() {
              border: 1px solid t($border);
            }
          }
        }

        .user-panel__user-name {
          font-weight: bold;
        }

        .user-panel__loyalty {
          margin-top: 10px;
          font-size: 0.85rem;
          opacity: 0.6;
        }
      }
    }
  }
</style>