<template>
  <div class="footer">
    <div class="container">
      <div class="inner">
        <p>© 2018, ResuMe. Все права защищены.</p>
        <p class="footer-link" @click="isOpenPolicy = true">
          Политика конфиденциальности
        </p>
        <div class="footer-modal" v-if="isOpenPolicy">
          <div class="policy-close" @click="isOpenPolicy = false">
            <mdicon name="close" class="policy-close__icon" />
          </div>
          <policy-app />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import PolicyApp from "@/components/layout/PolicyApp.vue";

export default {
  components: {
    PolicyApp,
  },
  data() {
    return {
      isOpenPolicy: false,
    };
  },
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #222222;
  font-family: Roboto Condensed, Arial, sans-serif;
  font-size: 14px;

  .inner {
    padding: 5px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    color: #848383;

    @include lg-down {
      justify-content: center;
    }

    .footer-link {
      color: #a7a7a7;
      cursor: pointer;

      &:hover,
      &:active {
        color: #fff;
      }
    }

    .footer-modal {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fff;
      color: #2b2b2d;
      padding: 15px;
      z-index: 2;

      .policy-close {
        margin-left: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: content-box;
        width: 24px;
        height: 24px;
        padding: 10px 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
