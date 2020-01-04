<template>
  <div id="personal-stat">
    <div class="personal-stat__icon">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="personal-stat__label">
      {{ label }}
    </div>
    <div class="personal-stat__value">
      {{ value }}
    </div>
  </div>
</template>

<script>
    export default {
        name: "StatItem",
        props: {
            icon: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            },
        }
    }
</script>

<style lang="scss" scoped>
  #personal-stat {
    display: grid;
    grid-gap: 5px 20px;
    align-items: center;
    justify-content: center;
    grid-template: 1fr 1fr / auto 1fr;
    grid-template-areas: 'icon label' 'icon value';

    @include theme() {
      border-right: 1px solid t($border);
    }

    &:last-child {
      border-right: none;
    }

    .personal-stat__icon {
      grid-area: icon;
    }

    .personal-stat__label {
      grid-area: label;
      opacity: 0.6;
    }

    .personal-stat__value {
      grid-area: value;
      font-weight: bold;
    }
  }
</style>