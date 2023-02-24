<template>
  <div class="block-content" id="ls-adress">
    <div class="block-title">
      <icon-app :name="name" isWhite />
      {{ title }}
    </div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        v-for="field in form.textFields"
        :key="field.name"
      >
        <v-text-field
          :label="field.label"
          outlined
          v-model="field.value"
          @input="setData(field.value, field.name)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" v-for="field in form.selectFields" :key="field.name">
        <v-select
          v-model="field.value"
          outlined
          :items="field.variants"
          :menu-props="{ maxHeight: '400' }"
          :label="field.label"
          persistent-hint
          @input="setData(field.value, field.name)"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import IconApp from "@/components/ui/IconApp.vue";
import { mapActions } from "vuex";

export default {
  components: {
    IconApp,
  },
  data: () => ({
    name: "map",
    idStore: "formdataAdress",
    title: "Местоположение",
    form: {
      textFields: [
        { name: "country", value: "", label: "страна" },
        { name: "pasport", value: "", label: "гражданство" },
        { name: "city", value: "", label: "город" },
        { name: "street", value: "", label: "улица и дом" },
      ],
      selectFields: [
        {
          name: "remove",
          variants: ["готов", "не готов", "готов к командировкам"],
          value: "",
          label: "готовность к переезду",
        },
      ],
    },
  }),
  methods: {
    ...mapActions(["updateForm"]),
    setData(value, name) {
      // this.updateForm({ value, name });
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
