<template>
  <div class="block-content" id="ls-schools">
    <div class="block-title">
      <icon-app :name="name" isWhite class="left-block-icon" />
      {{ title }}
    </div>
    <v-row>
      <v-col cols="12">
        <div v-if="!formdataSchools.length" class="empty-list">
          Ваш список пуст
        </div>
        <div v-else>
          <div
            v-for="(item, i) in formdataSchools"
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
        :textFields="textFields"
        :textAreaFields="textAreaFields"
        :dateFields="dateFields"
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
    name: "schoolsName",
    value: "",
    label: "название учреждения*",
    type: "text",
  },
  { name: "educationPosition", value: "", label: "направление", type: "text" },
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
    name: "school",
    idStore: "formdataSchools",
    title: "Образование",
    buttonText: "Добавить место обучения",
    editButtonText: "Редактировать место обучения",
    list: [],
    textFields: [],
    textAreaFields: [],
    dateFields: [],
    modal: false,
    id: null,
  }),

  computed: {
    ...mapGetters(["formdataSchools"]),
  },

  methods: {
    ...mapActions(["updateList", "deleteListStore"]),
    AddList() {
      this.textFields = cloneArrayObj(textFieldsForm);
      this.textAreaFields = cloneArrayObj(textAreaFieldsForm);
      this.dateFields = cloneArrayObj(dateFieldsForm);
      this.modal = true;
    },
    setList() {
      this.updateList({
        list: {
          id: this.formdataSchools.length + 1,
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
      this.textFields = item.fields.filter((el) => el.type == "text");
      this.textAreaFields = item.fields.filter((el) => el.type == "textarea");
      this.dateFields = item.fields.filter((el) => el.type == "date");
    },

    editList() {
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
