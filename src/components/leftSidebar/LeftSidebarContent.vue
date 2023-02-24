<template>
  <div class="sidebar-main">
    <div class="sidebar-main--inner">
      <block-main />
      <block-adress />
    </div>
  </div>
</template>

<script>
import BlockMain from "@/components/leftSidebar/LeftBlockMain.vue";
import BlockAdress from "@/components/leftSidebar/LeftBlockAdress.vue";
export default {
  components: {
    BlockMain,
    BlockAdress,
  },
  // emits: ["addList"],
  // methods: {
  //   addList(icon) {
  //     this.$emit("addList", icon);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.sidebar-main {
  width: calc(100% - 54px);
  background-color: #191515;
  overflow-y: scroll;
  height: 100vh;
  // box-sizing: content-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 44px;
  // padding-left: 10px;

  &::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-main--inner {
    padding-bottom: 30px;
  }
}
</style>
