<template>
  <div class="header">
    <div class="container">
      <div class="inner flex">
        <logo-app
          :isSidebar="false"
          :imgSrc="require('@/assets/logo-resume.png')"
          class="col-15"
        />
        <div class="header-nav">
          <div class="header-routes" :class="{ _mobile: isOpenMenu }">
            <header-menu class="header-menu" @click="menuToggle" />
          </div>
          <div class="header-right">
            <div class="header-burger">
              <icon-app
                :name="'menu'"
                v-if="!isOpenMenu"
                @iclick="menuToggle"
              />
              <icon-app :name="'close'" v-else @iclick="menuToggle" />
              <!-- <transition name="fade" mode="out-in">
                <icon-app
                  :name="'menu'"
                  v-if="!isOpenMenu"
                  @click="menuToggle"
                />
                <icon-app :name="'close'" v-else @click="menuToggle" />
              </transition> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/layout/HeaderMenu.vue";
import IconApp from "@/components/ui/IconApp.vue";
import LogoApp from "@/components/ui/LogoApp.vue";

export default {
  components: {
    HeaderMenu,
    IconApp,
    LogoApp,
  },
  data() {
    return {
      isOpenMenu: false,
    };
  },
  methods: {
    menuToggle() {
      console.log(33);
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #e1d9d0;

  .inner {
    padding: 5px;
    align-items: center;

    .header-right {
      display: none;

      @include lg-down {
        display: flex;
        justify-content: flex-end;
      }
    }
    .header-nav {
      width: 85%;

      @include lg-down {
        width: 50%;
      }
    }
    .header-routes {
      @include lg-down {
        display: none;
      }

      &._mobile {
        @include lg-down {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
          width: 100%;
          position: fixed;
          top: 59.5px;
          left: 0;
          background-color: #404041;
          color: #5a5a5b;
          padding: 15px;
          z-index: 2;

          .header-menu {
            padding-left: 0;
          }
        }
      }
    }
  }
}
</style>
