<template>
  <div id="footer">
    <div class="footer__inner">
      <div class="footer__left">
        <div class="footer__version">
          <span>Platform Version:</span> {{ platformVersion }}
        </div>
      </div>
      <div class="footer__right">
        <div class="footer__link">
          <a href="https://discord.gg/D59uzQT">
            <font-awesome-icon :icon="['fab', 'discord']"/>
            Discord
          </a>
        </div>
        <div class="footer__divider"/>
        <div class="footer__link">
          <font-awesome-icon icon="list"/>
          <a href="https://www.notion.so/1309c62f30074c26902db4030e70933e?v=78293f405a8f4273937b79af668740a0">
            Project To-Do Board
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {PlatformModule} from "../store/modules/platform";

    export default {
        name: "the-footer",
        computed: {
            platformVersion() {
                return PlatformModule.packageVersion
            }
        }
    }
</script>

<style lang="scss" scoped>
  #footer {
    margin-top: auto;
    width: 100%;

    @include theme() {
      border-top: 1px solid t($border);
    }

    .footer__inner {
      position: relative;
      padding: 20px 50px;
      height: 30px;
      display: flex;
      align-items: center;
      font-weight: bold;
      justify-content: space-between;

      .footer__divider {
        height: 100%;
        margin: 0 10px;
        width: 1px;

        @include theme() {
          background-color: t($border);
        }
      }

      .footer__left {
        display: flex;
        position: relative;
        height: 100%;
        align-items: center;

        .footer__version {
          opacity: 0.6;
          font-size: 0.8rem;
        }
      }

      .footer__right {
        position: relative;
        align-items: center;
        height: 100%;
        display: flex;
      }
    }
  }
</style>