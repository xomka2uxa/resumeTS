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
        sm="6"
        v-for="field in form.textFields"
        :key="field.name"
      >
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
          :label="field.name"
          multiple
          persistent-hint
          @input="setSelects(field.value, field.name)"
        ></v-select>
      </v-col>
      <v-col cols="12" v-for="field in form.textAreaFields" :key="field.name">
        <v-textarea
          :label="field.name"
          v-model="field.value"
          outlined
          @input="setName(field.value, field.name)"
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
    title: "Основное",
    form: {
      textFields: [
        { name: "ваше имя", value: "" },
        { name: "возраст", value: "" },
        { name: "должность", value: "" },
      ],
      fileFields: [{ name: "ваше фото", value: {} }],
      dateFields: [
        {
          name: "дата рождения",
          value: new Date().toISOString().substr(0, 7),
        },
      ],
      multiSelectFields: [
        {
          name: "занятости",
          variants: ["gjkysq", "здесь", "тамй"],
          value: [],
        },
        {
          name: "график",
          variants: ["eer", "полный", "неполный"],
          value: [],
        },
      ],
      textAreaFields: [{ name: "О себе", value: "" }],
    },
    modal: false,
  }),
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
