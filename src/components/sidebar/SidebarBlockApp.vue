<template>
  <div class="block-content" :id="title">
    <div class="block-title">
      <icon-app :name="name" isWhite />
      {{ title }}
    </div>
    <v-row v-if="!isAddible">
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
    <v-row v-else>
      <v-col cols="12">
        <div v-if="!briefcases.length" class="empty-list">Ваш список пуст</div>
        <div v-else>
          <div v-for="(briefcase, i) in briefcases" :key="i">
            {{ briefcases[i][0].value }}
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-right">
          <v-dialog scrollable v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                outlined
                plain
                class="btn-add"
                v-bind="attrs"
                v-on="on"
                @click="AddList"
                >{{ buttonText }}</v-btn
              >
            </template>
            <v-card>
              <v-toolbar dark elevation="0">
                <v-card-title class="text-h5">
                  {{ buttonText }}
                </v-card-title>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-container>
                  <v-row class="__addible">
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-for="field in textFields"
                      :key="field.name"
                    >
                      <v-text-field
                        :label="field.label"
                        outlined
                        :required="field.isRequired"
                        v-model="field.value"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-for="(field, index) in dateFields"
                      :key="field.name"
                    >
                      <v-dialog
                        ref="dateFields"
                        v-model="field.modal"
                        return-value.sync="field.value"
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :required="field.isRequired"
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
                          type="month"
                          scrollable
                          locale="ru-ru"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="field.modal = false"
                          >
                            Отмена
                          </v-btn>
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
                      v-for="field in textAreaFields"
                      :key="field.name"
                    >
                      <v-textarea
                        :label="field.label"
                        v-model="field.value"
                        outlined
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="modalClose()">
                  Добавить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import IconApp from "@/components/ui/IconApp.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    IconApp,
  },
  data: () => ({
    menu: false,
    modal: false,
    dialog: false,
    src: {
      url: "",
      name: "",
    },
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
    },
    isAddible: {
      type: Boolean,
    },
    buttonText: {
      type: String,
    },
    i: {
      type: Number,
    },
    list: {
      type: Array,
    },
  },
  emits: ["addList"],
  computed: {
    ...mapGetters(["briefcases"]),
    textFields() {
      if (this.isAddible) {
        return this.list[this.i].filter((item) => item.type == "text");
      } else {
        return this.fields.filter((item) => item.type == "text");
      }
    },
    fileFields() {
      if (this.isAddible) {
        return this.list[this.i].filter((item) => item.type == "file");
      } else {
        return this.fields.filter((item) => item.type == "file");
      }
    },
    textAreaFields() {
      if (this.isAddible) {
        return this.list[this.i].filter((item) => item.type == "textarea");
      } else {
        return this.fields.filter((item) => item.type == "textarea");
      }
    },
    dateFields() {
      if (this.isAddible) {
        return this.list[this.i].filter((item) => item.type == "date");
      } else {
        return this.fields.filter((item) => item.type == "date");
      }
    },
    multiSelectFields() {
      if (this.isAddible) {
        return this.list[this.i].filter((item) => item.type == "multiselect");
      } else {
        return this.fields.filter((item) => item.type == "multiselect");
      }
    },
    selectFields() {
      if (this.isAddible) {
        return this.list[this.i].filter((item) => item.type == "select");
      } else {
        return this.fields.filter((item) => item.type == "select");
      }
    },
  },
  methods: {
    ...mapActions([
      "updateForm",
      "updateFile",
      "updateSelects",
      "addBriefcases",
    ]),
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
    AddList() {
      this.$emit("addList");
    },
    modalClose() {
      this.dialog = false;
      this.addBriefcases(this.list[this.i]);
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

.btn-add {
  margin-top: 30px;
  border: 1px solid #efdfb7 !important;
  font-weight: 400 !important;
  font-size: 12px !important;
}
</style>
