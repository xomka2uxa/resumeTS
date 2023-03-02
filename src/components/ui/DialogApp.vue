<template>
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
          <v-col cols="12" md="6" v-for="field in textFields" :key="field.name">
            <v-text-field
              :label="field.label"
              outlined
              :required="field.isRequired"
              v-model="field.value"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
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
          <v-col cols="12" v-for="field in textAreaFields" :key="field.name">
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
      <v-btn v-if="!id" color="primary" text @click="setList"> Добавить </v-btn>
      <v-btn v-if="id" color="primary" text @click="editList">
        Сохранить
      </v-btn>
      <v-btn v-if="id" color="primary" text @click="deleteList">
        Удалить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
function cloneArrayObj(array) {
  return array.map((el) => {
    return { ...el };
  });
}
export default {
  props: {
    buttonText: {
      type: String,
    },
    id: {
      type: Number,
    },
    tFields: {
      type: Array,
    },
    taFields: {
      type: Array,
    },
    dFields: {
      type: Array,
    },
  },
  emits: ["close"],
  computed: {
    textFields() {
      return cloneArrayObj(this.tFields);
    },
    textAreaFields() {
      return cloneArrayObj(this.taFields);
    },
    dateFields() {
      return cloneArrayObj(this.dFields);
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    setList() {
      this.$emit("set", this.textFields, this.textAreaFields, this.dateFields);
    },
    editList() {
      this.$emit("edit", this.textFields, this.textAreaFields, this.dateFields);
    },
    deleteList() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped></style>
