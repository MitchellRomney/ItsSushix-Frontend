<template>
  <div id="navigation-item">
    <div class="navigation-item__icon">
      <font-awesome-icon :icon="icon"/>
    </div>
    <div class="navigation-item__label">
      {{ name }}
    </div>
  </div>
</template>

<script>
    export default {
        name: "navigation-item",
        props: {
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
  #navigation-item {
    display: grid;
    grid-gap: 10px;
    grid-template: auto / 1fr 3fr;
    align-items: center;
    padding: 20px;

     .navigation-item__icon {
       display: flex;
       justify-content: center;
     }
  }
</style>