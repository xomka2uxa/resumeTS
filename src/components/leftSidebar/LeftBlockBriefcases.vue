<template>
  <div class="block-content" id="ls-briefcase">
    <div class="block-title">
      <icon-app :name="name" isWhite />
      {{ title }}
    </div>
    <v-row>
      <v-col cols="12">
        <div v-if="!list.length" class="empty-list">Ваш список пуст</div>
        <v-dialog scrollable v-model="modal" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              outlined
              plain
              @click="AddList"
              class="btn-add"
              v-bind="attrs"
              v-on="on"
              >{{ buttonText }}</v-btn
            >
          </template>
          <v-card>
            <v-toolbar dark elevation="0">
              <v-card-title class="text-h5">
                {{ buttonText }}
              </v-card-title>
              <v-btn icon dark @click="modal = false">
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
              <v-btn color="primary" text @click="setList"> Добавить </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <!-- <v-col cols="12">
        <left-edit-block-content
          :name="icon.nameList"
          :list="icon.list"
          :edit="false"
          :i="icon.i"
          :text="icon.buttonText"
          @addList="AddList"
        />
      </v-col> -->
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
    name: "briefcase",
    idStore: "formdataBriefcases",
    title: "Опыт работы",
    buttonText: "Добавить место работы",
    editButtonText: "Редактировать место работы",
    list: [],
    modal: false,
    id: -1,
    fields: [
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
      {
        name: "dateStart",
        value: "",
        label: "дата начала",
        modal: false,
        type: "date",
      },
      {
        name: "dateFinish",
        value: "",
        label: "дата окончания",
        modal: false,
        type: "date",
      },
      {
        name: "briefcaseFree",
        value: "",
        label: "Свободная форма",
        type: "textarea",
      },
    ],
  }),
  computed: {
    textFields() {
      return this.fields.filter((item) => item.type == "text");
    },
    textAreaFields() {
      return this.fields.filter((item) => item.type == "textarea");
    },
    dateFields() {
      return this.fields.filter((item) => item.type == "date");
    },
  },
  methods: {
    ...mapActions(["updateList"]),
    AddList() {
      let briefFields = [
        { name: "companyName", value: "", label: "название компании" },
        { name: "companyUrl", value: "", label: "сайт компании" },
        { name: "companyBussiness", value: "", label: "сфера деятельности" },
        { name: "position", value: "", label: "должность" },
        { name: "dateStart", value: "", label: "дата начала" },
        { name: "dateFinish", value: "", label: "дата окончания" },
        { name: "briefcaseFree", value: "", label: "Свободная форма" },
      ];
      this.id++;
      this.list.push({ id: this.id, fields: briefFields });
    },
    setList() {
      this.modal = false;
      this.list[this.id].fields = this.fields;
      this.updateList({ list: this.list[this.id], id: this.idStore });
      this.fields.map((item) => (item.value = ""));
    },
  },
};
</script>

<style lang="scss" scoped></style>
