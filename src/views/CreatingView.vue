<template>
  <div class="main main--creating-resume">
    <div class="inner">
      <left-sidebar />
      <div class="main">
        <div>{{ formdataMain.name }}</div>
        <div>{{ formdataMain.age }}</div>
        <div>{{ formdataMain.birthday }}</div>
        <div>{{ formdataMain.position }}</div>
        <div>{{ formdataMain.self }}</div>
        <div>{{ formdataMain.employment }}</div>
        <div>{{ formdataMain.schedule }}</div>
        <div v-if="formdataMain.photo.isSet">
          <img :src="formdataMain.photo.value" width="100" />
        </div>
        <div>{{ formdataAdress.country }}</div>
        <div>{{ formdataAdress.pasport }}</div>
        <div>{{ formdataAdress.city }}</div>
        <div>{{ formdataAdress.street }}</div>
        <div>{{ formdataAdress.remove }}</div>
        <div>{{ formdataContacts.phone }}</div>
        <div>{{ formdataContacts.email }}</div>
        <div>{{ formdataContacts.links }}</div>
        <div>{{ formdataContacts.wt }}</div>
        <div>{{ formdataContacts.otherContacts }}</div>
        <!-- <div v-if="formdataBriefcases.length">
          <div v-for="(Briefcases, i) in formdataBriefcases" :key="i">
            {{ Briefcases.fields[0].value }}
          </div>
        </div> -->
      </div>
      <div class="right-sidebar">trr</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LeftSidebar from "@/components/leftSidebar/SidebarLeftApp.vue";
export default {
  components: {
    LeftSidebar,
  },
  computed: {
    ...mapGetters([
      "formdataMain",
      "formdataAdress",
      "formdataContacts",
      "formdataBriefcases",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.main--creating-resume {
  height: 100%;

  .inner {
    height: 100%;
    display: flex;

    .right-sidebar {
      background-color: #222222;
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 30%;
      overflow: hidden;
      z-index: 2;
    }

    .main {
      background-color: #482d11;
      width: 40%;
      position: fixed;
      top: 0;
      left: 30%;
      height: 100%;
    }
  }
}
</style>
