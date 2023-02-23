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
        @iclick="scrollBlock(icon.idUrl)"
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
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["scrollHandle"],
  data: () => ({
    icons: [
      { name: "account", title: "Основное", idUrl: "ls-main" },
      { name: "map", title: "Местоположение", idUrl: "ls-adress" },
      { name: "phone", title: "Способы связи", idUrl: "ls-contacts" },
      { name: "briefcase", title: "Опыт работы", idUrl: "ls-briefcase" },
      { name: "school", title: "Образование", idUrl: "ls-schools" },
      { name: "certificate", title: "Курсы", idUrl: "ls-certificates" },
      { name: "web", title: "Знание языков", idUrl: "ls-language" },
      { name: "seal", title: "Награды", idUrl: "ls-seals" },
      { name: "math-compass", title: "Навыки", idUrl: "ls-skills" },
      { name: "brush", title: "Интересы", idUrl: "ls-interests" },
      { name: "book-account", title: "Портфолио", idUrl: "ls-portfolio" },
      { name: "account-group", title: "Отзывы", idUrl: "ls-testimonials" },
      { name: "star", title: "Кастомная секция", idUrl: "ls-different" },
    ],
  }),
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
