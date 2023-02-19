<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script lang="js">
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  components: { DefaultLayout },
  // computed: {
  //   layout() {
  //     return this.$route.meta.layout || "default-layout";
  //   },
  // },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    layout() {
      return "default-layout";
    },
  },
};
</script>
<style lang="scss"></style>
