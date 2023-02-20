<template>
  <div>
    <div v-if="!edit" class="text-right">
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
            >{{ text }}</v-btn
          >
        </template>
        <v-card>
          <v-toolbar dark elevation="0">
            <v-card-title class="text-h5">
              {{ text }}
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
                      <v-btn text color="primary" @click="field.modal = false">
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
            <v-btn color="primary" text @click="modalClose()"> Добавить </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else v-for="(briefcase, i) in briefcases" :key="i">
      <v-dialog
        scrollable
        v-model="dialogEdit"
        width="500"
        :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            outlined
            class="btn-add item-name"
            v-bind="attrs"
            v-on="on"
            @click="dialogEdit = true"
            >{{ briefcases[i].fields[0].value }}</v-btn
          >
        </template>
        <v-card>
          <v-toolbar dark elevation="0">
            <v-card-title class="text-h5">
              {{ text }}
            </v-card-title>
            <v-btn icon dark @click="dialogEdit = false">
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
                      <v-btn text color="primary" @click="field.modal = false">
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
            <v-btn color="primary" text @click="dialogEdit = false">
              Сохранить
            </v-btn>
            <v-btn color="primary" text @click="deleteBrief(briefcase.id)">
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    edit: {
      type: Boolean,
      required: true,
    },
    i: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    dialogEdit: false,
  }),
  emits: ["addList"],
  computed: {
    ...mapGetters(["briefcases"]),
    textFields() {
      return this.list[this.i].fields.filter((item) => item.type == "text");
    },
    fileFields() {
      return this.list[this.i].fields.filter((item) => item.type == "file");
    },
    textAreaFields() {
      return this.list[this.i].fields.filter((item) => item.type == "textarea");
    },
    dateFields() {
      return this.list[this.i].fields.filter((item) => item.type == "date");
    },
    multiSelectFields() {
      return this.list[this.i].fields.filter(
        (item) => item.type == "multiselect"
      );
    },
    selectFields() {
      return this.list[this.i].fields.filter((item) => item.type == "select");
    },
  },
  methods: {
    ...mapActions(["addBriefcases", "deleteBriefcases"]),
    AddList() {
      this.$emit("addList");
    },
    modalClose() {
      this.dialog = false;
      this.addBriefcases(this.list[this.i], this.name);
    },
    deleteBrief(id) {
      this.dialogEdit = false;
      this.deleteBriefcases(id, this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-add {
  margin-top: 30px;
  border: 1px solid #efdfb7 !important;
  font-weight: 400 !important;
  font-size: 12px !important;

  &.item-name {
    margin-top: 0;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.24) !important;
    padding: 12px;
    display: flex;
    color: #fff;

    .v-btn__content {
      align-items: right;
      opacity: 1;
    }
  }
}
</style>
