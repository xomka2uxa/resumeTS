<template>
  <ul class="header-menu">
    <li v-for="(item, i) in menu" :key="i" class="menu-link">
      <router-link :to="item.path">{{ item.title }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},

  data: () => ({
    menu: [
      { path: "/", title: "Главная" },
      { path: "/about", title: "О сервисе" },
      { path: "/creating", title: "Создать резюме" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  justify-content: flex-end;
  font-family: Roboto Condensed, Arial, sans-serif;
  font-size: 14px;

  @include lg-down {
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 15px;
  }
}
.menu-link {
  padding: 2px;

  &:not(:last-child) {
    margin-right: 20px;

    @include lg-down {
      margin-right: 0;
    }
  }

  a {
    color: #5a5a5b;

    @include lg-down {
      font-size: 17px;
      color: #a7a7a7;
      padding: 10px 0;
      border-bottom: 1px solid #5a5a5b;
      width: 100%;
    }

    &:hover,
    &:active {
      color: #2b2b2d;

      @include lg-down {
        color: #ffffff;
      }
    }
  }
}
</style>
