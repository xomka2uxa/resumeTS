<template>
  <div class="main main--creating-resume">
    <div class="inner">
      <!-- <left-sidebar /> -->
      <div class="left-sidebar">
        <left-sidebar />
      </div>
      <div class="main">
        <div>{{ formdata.name }}</div>
        <div>{{ formdata.age }}</div>
        <div>{{ formdata.birthday }}</div>
        <div>{{ formdata.position }}</div>
        <div>{{ formdata.self }}</div>
        <div>{{ formdata.employment }}</div>
        <div>{{ formdata.schedule }}</div>
        <div v-if="formdata.photo.isSet">
          <img :src="formdata.photo.value" width="100" />
        </div>
      </div>
      <div class="right-sidebar">
        <!-- {{ formdata }}
        {{ selects }}
        {{ files }}
        <div v-if="!files[0].isSet">feteter</div>
        <div v-else>
          нуж6о
          <img :src="files[0].value" width="100" />
        </div> -->
      </div>
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
    ...mapGetters(["formdata"]),
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

    .left-sidebar {
      position: fixed;
      top: 0;
      left: 0;
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
