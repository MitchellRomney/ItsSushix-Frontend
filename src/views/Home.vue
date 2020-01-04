<template>
  <div id="home">
    <div class="home__header">
      <h2>Home</h2>
    </div>
    <PersonalStats/>
  </div>
</template>

<script>
  import PersonalStats from "@/components/PersonalStats/PersonalStats";
    export default {
        name: 'home',
        components: {
            PersonalStats
        }
    }
</script>

<style lang="scss">
  #home {
    padding: 50px 5%;

    @include theme() {
      background-color: t($background-secondary);
    }

    .home__header {
      display: flex;
      align-items: center;
      height: 70px;
    }
  }
</style>
