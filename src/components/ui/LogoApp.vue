<template>
  <div class="logo-wrapper col-15" :class="{ __sidebar: isSidebar }">
    <router-link to="/">
      <img :src="imgSrc" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    isSidebar: {
      type: Boolean,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-wrapper {
  width: 85px;
  display: flex;

  .router-link-active {
    line-height: 0;
  }

  &.__sidebar {
    width: 34px;
    padding: 5px;
    border-bottom: 1px solid #5a5a5b;
  }

  img {
    width: 100%;
  }
}
</style>
