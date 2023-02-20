<template>
  <div class="block-content" :id="icon.title">
    <div class="block-title">
      <icon-app :name="icon.name" isWhite />
      {{ icon.title }}
    </div>
    <left-block-content v-if="!icon.isAddible" :fields="icon.fields" />
    <v-row v-else>
      <v-col cols="12">
        <div v-if="!briefcases.length" class="empty-list">Ваш список пуст</div>
        <left-edit-block-content
          :name="icon.name"
          :list="icon.list"
          :edit="true"
          :i="icon.i"
          :text="icon.editButtonText"
          @addList="AddList"
        />
      </v-col>
      <v-col cols="12">
        <left-edit-block-content
          :list="icon.list"
          :edit="false"
          :i="icon.i"
          :text="icon.buttonText"
          @addList="AddList"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import IconApp from "@/components/ui/IconApp.vue";
import LeftBlockContent from "@/components/sidebar/LeftBlockContent.vue";
import LeftEditBlockContent from "@/components/sidebar/LeftEditBlockContent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    IconApp,
    LeftBlockContent,
    LeftEditBlockContent,
  },
  props: {
    icon: {
      type: Object,
      required: true,
    },
  },
  emits: ["addList"],
  computed: {
    ...mapGetters(["briefcases"]),
  },
  methods: {
    AddList() {
      this.$emit("addList");
    },
  },
};
</script>

<style lang="scss" scoped>
.block-content {
  padding: 0 25px;
}
.block-title {
  min-height: 77.22px;
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Roboto Condensed, Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  padding: 10px 0;
}
.empty-list {
  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  padding: 12px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
}
</style>
