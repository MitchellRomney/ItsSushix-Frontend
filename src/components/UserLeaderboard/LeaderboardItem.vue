<template>
  <div class="leaderboard__item-wrapper">
    <router-link :to="{ name: 'Profile', params: { username: user.displayName }}" class="leaderboard__item">
      <span>#{{ index + 1 }}</span>
      <div class="leaderboard__item-avatar" v-if="user">
        <img :alt="user.displayName" class="responsive" :src="user.profileImageUrl"/>
      </div>
      <div class="leaderboard__item-user" :style="{ color: user.color}">
        {{ user.displayName }}
      </div>
      <div class="leaderboard__value">
        <span>{{ user[metric] }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "leaderboard-item",
        props: {
            user: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            metric: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
  .leaderboard__item-wrapper {
    display: inline-flex;
    position: relative;

    .leaderboard__item {
      display: grid;
      grid-template: auto / .5fr 50px 1fr .5fr;
      align-items: center;
      padding: 10px 0;
      cursor: pointer;
      transition: font-weight 0.25s ease;
      width: 100%;
      text-align: center;

      &:hover {
        font-weight: bold;
      }

      .leaderboard__item-avatar {
        height: 30px;
        width: 30px;
        overflow: hidden;
        border-radius: 5px;
        margin: auto 20px auto 0;
      }

      .leaderboard__item-user {
        overflow-x: hidden;
        display: flex;
        align-items: center;
      }
    }
  }
</style>