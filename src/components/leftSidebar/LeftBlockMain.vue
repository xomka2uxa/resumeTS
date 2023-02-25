<template>
  <div class="block-content" id="ls-main">
    <div class="block-title">
      <icon-app :name="name" isWhite />
      {{ title }}
    </div>
    <v-row>
      <v-col cols="12" v-for="field in form.fileFields" :key="field.name">
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
      <v-col
        cols="12"
        md="6"
        v-for="(field, index) in form.dateFields"
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
              :label="field.label"
              outlined
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="field.value"
            @change="setDataAge(field.value, field.name)"
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
      <v-col
        cols="12"
        v-for="field in form.multiSelectFields"
        :key="field.name"
      >
        <v-select
          v-model="field.value"
          outlined
          :items="field.variants"
          :menu-props="{ maxHeight: '400' }"
          :label="field.label"
          multiple
          persistent-hint
          @input="setSelects(field.value, field.name)"
        ></v-select>
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
    name: "account",
    idStore: "formdataMain",
    title: "Основное",
    form: {
      textFields: [
        { name: "name", value: "", label: "ваше имя" },
        { name: "position", value: "", label: "должность" },
      ],
      fileFields: [{ name: "photo", value: {}, label: "ваше фото" }],
      dateFields: [
        {
          name: "birthday",
          value: new Date().toISOString().substr(0, 10),
          label: "дата рождения",
        },
      ],
      multiSelectFields: [
        {
          name: "employment",
          variants: ["gjkysq", "здесь", "тамй"],
          value: [],
          label: "занятости",
        },
        {
          name: "schedule",
          variants: ["eer", "полный", "неполный"],
          value: [],
          label: "график",
        },
      ],
      textAreaFields: [{ name: "self", value: "", label: "О себе" }],
    },
    modal: false,
    src: {
      url: "",
      name: "",
    },
  }),
  methods: {
    ...mapActions(["updateForm", "updateFile"]),
    setData(value, name) {
      this.updateForm({ value, name, id: this.idStore });
    },
    setDataAge(value, name) {
      this.updateForm({ value, name, id: this.idStore });
      let birthday = value.split("-");
      let current = new Date().toISOString().substr(0, 10).split("-");
      let years = current[0] - birthday[0];
      if (
        current[1] < birthday[1] ||
        (current[1] == birthday[1] && current[2] < birthday[2])
      ) {
        years = years - 1;
      }
      this.updateForm({ value: years, name: "age", id: this.idStore });
    },
    setSelects(value, name) {
      let str = value.join(", ");
      this.updateForm({ value: str, name, id: this.idStore });
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
        this.updateFile({ value, name, id: this.idStore });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
