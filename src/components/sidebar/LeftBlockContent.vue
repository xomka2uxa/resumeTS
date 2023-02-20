<template>
  <v-row>
    <v-col cols="12" v-for="field in fileFields" :key="field.name">
      <v-file-input
        label="Выберите фото"
        placeholder="Ваше фото"
        v-model="field.value"
        prepend-icon=""
        ref="file"
        outlined
        @change="setFile(field.value, field.name)"
      ></v-file-input>
    </v-col>
    <v-col cols="12" sm="6" v-for="field in textFields" :key="field.name">
      <v-text-field
        :label="field.name"
        outlined
        v-model="field.value"
        @input="setName(field.value, field.name)"
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      v-for="(field, index) in dateFields"
      :key="field.name"
    >
      <v-dialog
        ref="dateFields"
        v-model="modal"
        return-value.sync="field.value"
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="field.value"
            :label="field.name"
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="field.value"
          @change="setName(field.value, field.name)"
          type="month"
          scrollable
          locale="ru-ru"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Отмена </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dateFields[index].save(field.value)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-col cols="12" v-for="field in multiSelectFields" :key="field.name">
      <v-select
        v-model="field.value"
        outlined
        :items="field.variants"
        :menu-props="{ maxHeight: '400' }"
        :label="field.name"
        multiple
        persistent-hint
        @input="setSelects(field.value, field.name)"
      ></v-select>
    </v-col>
    <v-col cols="12" v-for="field in selectFields" :key="field.name">
      <v-select
        v-model="field.value"
        outlined
        :items="field.variants"
        :menu-props="{ maxHeight: '400' }"
        :label="field.name"
        persistent-hint
        @input="setName(field.value, field.name)"
      ></v-select>
    </v-col>
    <v-col cols="12" v-for="field in textAreaFields" :key="field.name">
      <v-textarea
        :label="field.name"
        v-model="field.value"
        outlined
        @input="setName(field.value, field.name)"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    modal: false,
    src: {
      url: "",
      name: "",
    },
  }),
  computed: {
    textFields() {
      return this.fields.filter((item) => item.type == "text");
    },
    fileFields() {
      return this.fields.filter((item) => item.type == "file");
    },
    textAreaFields() {
      return this.fields.filter((item) => item.type == "textarea");
    },
    dateFields() {
      return this.fields.filter((item) => item.type == "date");
    },
    multiSelectFields() {
      return this.fields.filter((item) => item.type == "multiselect");
    },
    selectFields() {
      return this.fields.filter((item) => item.type == "select");
    },
  },
  methods: {
    ...mapActions(["updateForm", "updateFile", "updateSelects"]),
    setName(value, name) {
      this.updateForm({ value, name });
    },
    setSelects(value, name) {
      let str = value.join(", ");
      this.updateSelects({ str, name });
    },
    setFile(value, name) {
      let file = "";
      file = value;
      this.src.name = name;
      let reader = new FileReader();
      if (this.src.name) {
        reader.addEventListener(
          "load",
          function () {
            this.src.url = reader.result;
          }.bind(this),
          false
        );
      }
      reader.readAsDataURL(file);
    },
    onClickOutside() {
      this.modal = !this.modal;
    },
  },
  watch: {
    src: {
      deep: true,
      handler() {
        let value = this.src.url;
        let name = this.src.name;
        this.updateFile({ value, name });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
