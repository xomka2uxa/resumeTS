<template>
  <div class="block-content" id="ls-adress">
    <div class="block-title">
      <icon-app :name="name" isWhite class="left-block-icon" />
      {{ title }}
    </div>
    <v-row>
      <v-col
        cols="12"
        md="6"
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
      this.updateForm({ value, name, id: this.idStore });
    },
  },
};
</script>

<style lang="scss" scoped></style>
