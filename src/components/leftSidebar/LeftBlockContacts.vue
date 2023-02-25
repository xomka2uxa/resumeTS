<template>
  <div class="block-content" id="ls-contacts">
    <div class="block-title">
      <icon-app :name="name" isWhite />
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
      <v-col cols="12" v-for="field in form.textAreaFields" :key="field.name">
        <v-textarea
          :label="field.label"
          v-model="field.value"
          outlined
          @input="setData(field.value, field.name)"
        ></v-textarea>
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
    name: "phone",
    idStore: "formdataContacts",
    title: "Способы связи",
    form: {
      textFields: [
        { name: "phone", value: "", label: "телефон" },
        { name: "email", value: "", label: "почта" },
        { name: "links", value: "", label: "сайт" },
        { name: "wt", value: "", label: "Телеграмм" },
      ],
      textAreaFields: [
        { name: "otherContacts", value: "", label: "др. способы связи" },
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
