<template>
  <div class="block-content" id="ls-briefcase">
    <div class="block-title">
      <icon-app :name="name" isWhite />
    </div>
    <v-row>
      <v-col cols="12">
        <div v-if="!formdataBriefcases.length" class="empty-list">
          Ваш список пуст
        </div>
        <div v-else>
          <div
            v-for="(item, i) in formdataBriefcases"
            :key="i"
            class="list-wrapper"
          >
            <v-btn
              depressed
              outlined
              class="btn-add item-name"
              @click="editOpen(item)"
              >{{ item.fields[0].value }}</v-btn
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn depressed outlined plain @click="AddList" class="btn-add">
          {{ buttonText }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog scrollable v-model="modal" :retain-focus="false" width="500">
      <v-card>
        <v-toolbar dark elevation="0">
          <v-card-title class="text-h5">
            {{ buttonText }}
          </v-card-title>
          <v-btn icon dark @click="closeModal">
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
          <v-btn
            v-if="modalType == 'new'"
            color="primary"
            text
            @click="setList"
          >
            Добавить
          </v-btn>
          <v-btn
            v-if="modalType == 'edit'"
            color="primary"
            text
            @click="editList"
          >
            Сохранить
          </v-btn>
          <v-btn
            v-if="modalType == 'edit'"
            color="primary"
            text
            @click="deleteList"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import IconApp from "@/components/ui/IconApp.vue";
import { mapGetters, mapActions } from "vuex";
const textFieldsForm = [
  {
    name: "companyName",
    value: "",
    label: "название компании",
    type: "text",
  },
  { name: "companyUrl", value: "", label: "сайт компании", type: "text" },
  {
    name: "companyBussiness",
    value: "",
    label: "сфера деятельности",
    type: "text",
  },
  { name: "position", value: "", label: "должность", type: "text" },
];
const dateFieldsForm = [
  {
    name: "dateStart",
    value: "",
    label: "дата начала",
    type: "date",
    modal: false,
  },
  {
    name: "dateFinish",
    value: "",
    label: "дата окончания",
    type: "date",
    modal: false,
  },
];
const textAreaFieldsForm = [
  {
    name: "briefcaseFree",
    value: "",
    label: "Свободная форма",
    type: "textarea",
  },
];
function cloneArrayObj(array) {
  return array.map((el) => {
    return { ...el };
  });
}
export default {
  components: {
    IconApp,
  },
  data: () => ({
    name: "briefcase",
    idStore: "formdataBriefcases",
    title: "Опыт работы",
    buttonText: "Добавить место работы",
    editButtonText: "Редактировать место работы",
    list: [],
    textFields: cloneArrayObj(textFieldsForm),
    textAreaFields: cloneArrayObj(textAreaFieldsForm),
    dateFields: cloneArrayObj(dateFieldsForm),
    modal: false,
    modalType: "new",
    id: null,
  }),

  computed: {
    ...mapGetters(["formdataBriefcases"]),
  },

  methods: {
    ...mapActions(["updateList", "deleteListStore"]),
    AddList() {
      this.modal = true;
    },
    setList() {
      this.updateList({
        list: {
          id: this.formdataBriefcases.length + 1,
          fields: [
            ...this.textFields,
            ...this.textAreaFields,
            ...this.dateFields,
          ],
        },
        id: this.idStore,
      });
      this.closeModal();
    },

    editOpen(item) {
      this.id = item.id;
      this.modal = true;
      this.modalType = "edit";
      this.textFields = item.fields.filter((el) => el.type == "text");
      // this.textAreaFields = this.list[id].fields.filter(
      //   (item) => item.type == "textarea"
      // );
      // this.dateFields = this.list[id].fields.filter(
      //   (item) => item.type == "date"
      // );
    },

    editList() {
      console.log(444);
    },

    deleteList() {
      this.deleteListStore({ id: this.id, idBlock: this.idStore });
      this.closeModal();
    },

    closeModal() {
      this.modal = false;
      this.modalType = "new";
      this.id = null;
      this.textFields = cloneArrayObj(textFieldsForm);
      this.textAreaFields = cloneArrayObj(textAreaFieldsForm);
      this.dateFields = cloneArrayObj(dateFieldsForm);
    },
  },
};
</script>

<style lang="scss" scoped></style>
