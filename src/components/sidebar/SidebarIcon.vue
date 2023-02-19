<template>
  <div class="sidebar-icon">
    <logo-app :isSidebar="true" :imgSrc="require('@/assets/logo-short.png')" />
    <div class="icons-wrapper">
      <icon-app
        v-for="icon in icons"
        :key="icon.name"
        :name="icon.name"
        :open="open"
        :inSide="true"
        :title="icon.title"
        @iclick="scrollBlock(icon.title)"
      />
    </div>
  </div>
</template>

<script>
import IconApp from "@/components/ui/IconApp.vue";
import LogoApp from "@/components/ui/LogoApp.vue";

export default {
  components: {
    IconApp,
    LogoApp,
  },
  props: {
    icons: {
      type: Array,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["scrollHandle"],
  methods: {
    scrollBlock(block) {
      this.$emit("scrollHandle", block);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-icon {
  height: 100vh;
  padding: 10px;
  width: 44px;
  background-color: #404041;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  position: relative;
}
</style>
