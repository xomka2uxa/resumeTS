<template>
  <div class="block-content" id="ls-briefcase">
    <div class="block-title">
      <icon-app :name="name" isWhite />
      {{ title }}
      {{ list }}
    </div>
    <v-row>
      <v-col cols="12">
        <div v-if="!list.length" class="empty-list">Ваш список пуст</div>
        <div v-else>
          <div v-for="(item, i) in list" :key="i" class="list-wrapper">
            <v-dialog
              scrollable
              v-model="modalEdit"
              width="500"
              :retain-focus="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  depressed
                  outlined
                  class="btn-add item-name"
                  @click="editOpen(item.id)"
                  v-bind="attrs"
                  v-on="on"
                  >{{ item.fields[0].value }}</v-btn
                >
              </template>
              <v-card>
                <v-toolbar dark elevation="0">
                  <v-card-title class="text-h5">
                    {{ editButtonText }}
                  </v-card-title>
                  <v-btn icon dark @click="modalEdit = false">
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
                  <v-btn color="primary" text @click="modalEdit = false">
                    Сохранить
                  </v-btn>
                  <v-btn color="primary" text @click="deleteList(item.id)">
                    Удалить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          depressed
          outlined
          plain
          @click="AddList"
          @click.stop="modal = true"
          class="btn-add"
          >{{ buttonText }}</v-btn
        >
        <v-dialog
          v-if="list.length"
          scrollable
          v-model="modal"
          :retain-focus="false"
          width="500"
        >
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
    textFields: [],
    textAreaFields: [],
    dateFields: [],
    modal: false,
    modalEdit: false,
    id: -1,
  }),
  methods: {
    ...mapActions(["updateList", "deleteListStore"]),
    AddList() {
      let briefFields = [
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
        {
          name: "briefcaseFree",
          value: "",
          label: "Свободная форма",
          type: "textarea",
        },
      ];
      this.id++;
      this.list.push({ id: this.id, fields: briefFields });
      this.textFields = this.list[this.id].fields.filter(
        (item) => item.type == "text"
      );
      this.textAreaFields = this.list[this.id].fields.filter(
        (item) => item.type == "textarea"
      );
      this.dateFields = this.list[this.id].fields.filter(
        (item) => item.type == "date"
      );
      console.log(this.id);
    },
    setList() {
      this.modal = false;
      this.updateList({ list: this.list[this.id], id: this.idStore });
    },
    editOpen(id) {
      this.modalEdit = true;
      this.textFields = this.list[id].fields.filter(
        (item) => item.type == "text"
      );
      this.textAreaFields = this.list[id].fields.filter(
        (item) => item.type == "textarea"
      );
      this.dateFields = this.list[id].fields.filter(
        (item) => item.type == "date"
      );
    },
    deleteList(id) {
      this.modalEdit = false;
      this.list = this.list.filter((item) => item.id != id);
      this.deleteListStore({ list: this.list, idBlock: this.idStore });
    },
  },
};
</script>

<style lang="scss" scoped></style>
