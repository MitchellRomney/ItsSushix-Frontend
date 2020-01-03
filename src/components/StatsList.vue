<template>
  <div id="stats-list">
    <div class="stats-list__header">
      {{ title }}
    </div>
    <div class="stats-list__stat" v-for="(stat, key) in stats" :key="key">
      <div class="stat__label">
        {{ key }}
      </div>
      <div class="stat__value">
        {{ stat }}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "stats-list",
        props: {
            title: {
                type: String,
                required: true
            },
            stats: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
  #stats-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    .stats-list__header {
      font-weight: bold;
      font-size: 0.8rem;
      opacity: 0.7;
      text-transform: uppercase;
      margin-top: 10px;
    }

    .stats-list__stat {
      font-size: 0.9rem;
      display: grid;
      grid-template: auto / 2fr 1fr;

      .stat__label {
        font-weight: bold;
      }

      .stat__value {
        align-self: end;
        text-align: right;
      }
    }
  }
</style>