<template>
  <div class="block-content" id="ls-briefcase">
    <div class="block-title">
      <icon-app :name="name" isWhite class="left-block-icon" />
      {{ title }}
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
          + место работы
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog scrollable v-model="modal" :retain-focus="false" width="500">
      <dialog-app
        :buttonText="buttonText"
        :tFields="textFields"
        :taFields="textAreaFields"
        :dFields="dateFields"
        :id="id"
        @close="closeModal"
        @edit="editList"
        @delete="deleteList"
        @set="setList"
      />
    </v-dialog>
  </div>
</template>

<script>
import IconApp from "@/components/ui/IconApp.vue";
import DialogApp from "@/components/ui/DialogApp.vue";
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
    DialogApp,
  },
  data: () => ({
    name: "briefcase",
    idStore: "formdataBriefcases",
    title: "Опыт работы",
    buttonText: "Добавить место работы",
    editButtonText: "Редактировать место работы",
    list: [],
    textFields: [],
    textAreaFields: [],
    dateFields: [],
    modal: false,
    id: null,
  }),

  computed: {
    ...mapGetters(["formdataBriefcases"]),
  },

  methods: {
    ...mapActions(["updateList", "deleteListStore", "editListStore"]),
    AddList() {
      this.textFields = cloneArrayObj(textFieldsForm);
      this.textAreaFields = cloneArrayObj(textAreaFieldsForm);
      this.dateFields = cloneArrayObj(dateFieldsForm);
      this.modal = true;
    },
    setList(text, textArea, date) {
      this.textFields = text;
      this.textAreaFields = textArea;
      this.dateFields = date;
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
      this.textFields = cloneArrayObj(textFieldsForm);
      this.textAreaFields = cloneArrayObj(textAreaFieldsForm);
      this.dateFields = cloneArrayObj(dateFieldsForm);
      this.closeModal();
    },

    editOpen(item) {
      this.id = item.id;
      this.modal = true;
      this.textFields = cloneArrayObj(
        item.fields.filter((el) => el.type == "text")
      );
      this.textAreaFields = cloneArrayObj(
        item.fields.filter((el) => el.type == "textarea")
      );
      this.dateFields = cloneArrayObj(
        item.fields.filter((el) => el.type == "date")
      );
    },

    editList(text, textArea, date) {
      this.textFields = text;
      this.textAreaFields = textArea;
      this.dateFields = date;
      // this.editListStore({
      //   list: {
      //     id: this.formdataBriefcases.length + 1,
      //     fields: [
      //       ...this.textFields,
      //       ...this.textAreaFields,
      //       ...this.dateFields,
      //     ],
      //   },
      //   id: this.idStore,
      // });
      this.closeModal();
    },

    deleteList() {
      this.deleteListStore({ id: this.id, idBlock: this.idStore });
      this.closeModal();
    },

    closeModal() {
      this.modal = false;
      this.id = null;
      this.textFields = cloneArrayObj(textFieldsForm);
      this.textAreaFields = cloneArrayObj(textAreaFieldsForm);
      this.dateFields = cloneArrayObj(dateFieldsForm);
    },
  },
};
</script>

<style lang="scss" scoped></style>
