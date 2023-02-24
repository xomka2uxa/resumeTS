<template>
  <div class="left-sidebar">
    <div class="left-sidebar-content">
      <left-sidebar-panel @scrollHandle="scrollBlock" :open="isSidebarMain" />
      <left-sidebar-content
        class="sidebar-text"
        :class="{ __mobile: isSidebarMain }"
      />
      <div class="btn-toggle" @click="isSidebarMain = !isSidebarMain">
        <icon-app :name="nameIcon" :inToggle="true" />
      </div>
    </div>
    <div class="overlay" @click="close"></div>
  </div>
</template>

<script>
import LeftSidebarPanel from "@/components/leftSidebar/LeftSidebarPanel.vue";
import LeftSidebarContent from "@/components/leftSidebar/LeftSidebarContent.vue";
import IconApp from "@/components/ui/IconApp.vue";

export default {
  components: {
    LeftSidebarPanel,
    LeftSidebarContent,
    IconApp,
  },
  data: () => ({
    isSidebarMain: false,
    // icons: [
    //   {
    //     name: "account",
    //     title: "Основное",
    //     isAddible: false,
    //     fields: [
    //       { name: "ваше фото", type: "file", value: {} },
    //       { name: "ваше имя", type: "text", value: "" },
    //       {
    //         name: "дата рождения",
    //         type: "date",
    //         value: new Date().toISOString().substr(0, 7),
    //       },
    //       { name: "возраст", type: "text", value: "" },
    //       { name: "должность", type: "text", value: "" },
    //       {
    //         name: "занятости",
    //         type: "multiselect",
    //         variants: ["gjkysq", "здесь", "тамй"],
    //         value: [],
    //       },
    //       {
    //         name: "график",
    //         type: "multiselect",
    //         variants: ["eer", "полный", "неполный"],
    //         value: [],
    //       },
    //       { name: "О себе", type: "textarea", value: "" },
    //     ],
    //   },
    //   {
    //     name: "map",
    //     title: "Местоположение",
    //     isAddible: false,
    //     fields: [
    //       { name: "город", type: "text", value: "" },
    //       { name: "улица и дом", type: "text", value: "" },
    //       {
    //         name: "готовность к переезду",
    //         type: "select",
    //         variants: ["готов", "не готов", "готов к командировкам"],
    //         value: "",
    //       },
    //     ],
    //   },
    //   {
    //     name: "phone",
    //     title: "Способы связи",
    //     isAddible: false,
    //     fields: [
    //       { name: "телефон", type: "text", value: "" },
    //       { name: "почта", type: "text", value: "" },
    //       { name: "email", type: "text", value: "" },
    //       { name: "сайт", type: "text", value: "" },
    //       { name: "соц. сеть", type: "text", value: "" },
    //       { name: "др. способы связи", type: "textarea", value: "" },
    //     ],
    //   },
    //   {
    //     name: "briefcase",
    //     nameList: "briefcases",
    //     title: "Опыт работы",
    //     isAddible: true,
    //     buttonText: "Добавить место работы",
    //     editButtonText: "Редактировать место работы",
    //     list: [],
    //     i: -1,
    //     fields: [
    //       {
    //         name: "название компании",
    //         label: "название компании*",
    //         type: "text",
    //         value: "",
    //         isRequired: true,
    //       },
    //       {
    //         name: "сайт компании",
    //         label: "сайт компании",
    //         type: "text",
    //         value: "",
    //         isRequired: false,
    //       },
    //       {
    //         name: "сфера деятельности",
    //         label: "сфера деятельности",
    //         type: "text",
    //         value: "",
    //         isRequired: false,
    //       },
    //       {
    //         name: "должность",
    //         label: "должность*",
    //         type: "text",
    //         value: "",
    //         isRequired: true,
    //       },
    //       {
    //         name: "дата начала",
    //         label: "дата начала*",
    //         modal: false,
    //         isRequired: true,
    //         type: "date",
    //         // value: new Date().toISOString().substr(0, 7),
    //         value: "",
    //       },
    //       {
    //         name: "дата окончания",
    //         label: "дата окончания*",
    //         modal: false,
    //         isRequired: true,
    //         type: "date",
    //         // value: new Date().toISOString().substr(0, 7),
    //         value: "",
    //       },
    //       {
    //         name: "свободная форма",
    //         label: "свободная форма",
    //         type: "textarea",
    //         value: "",
    //         isRequired: false,
    //       },
    //     ],
    //   },
    //   {
    //     name: "school",
    //     nameList: "schools",
    //     title: "Образование",
    //     isAddible: true,
    //     buttonText: "Добавить место учебы",
    //     editButtonText: "Редактировать место учебы",
    //     i: -1,
    //     list: [],
    //   },
    //   {
    //     name: "certificate",
    //     nameList: "courses",
    //     title: "Курсы",
    //     isAddible: true,
    //     buttonText: "Добавить курс",
    //     editButtonText: "Редактировать курс",
    //     i: -1,
    //     list: [],
    //   },
    //   // {
    //   //   name: "web",
    //   //   title: "Знание языков",
    //   //   fields: ["список", "кнопка", "название языка", "уровень владения"],
    //   // },
    //   // {
    //   //   name: "seal",
    //   //   title: "Награды",
    //   //   fields: [
    //   //     "список",
    //   //     "кнопка",
    //   //     "кто выдал",
    //   //     "дата выдачи",
    //   //     "направление",
    //   //     "фото",
    //   //     "свободная форма",
    //   //   ],
    //   // },
    //   // {
    //   //   name: "math-compass",
    //   //   title: "Навыки",
    //   //   fields: ["список", "кнопка", "название", "уровень"],
    //   // },
    //   // {
    //   //   name: "brush",
    //   //   title: "Интересы",
    //   //   fields: ["список", "кнопка", "название", "свободная форма"],
    //   // },
    //   // {
    //   //   name: "book-account",
    //   //   title: "Портфолио",
    //   //   fields: [
    //   //     "список",
    //   //     "кнопка",
    //   //     "название проекта",
    //   //     "ссылка на сайт",
    //   //     "короткое описание",
    //   //     "дата начала",
    //   //     "дата конца",
    //   //     "фото",
    //   //     "свободная форма",
    //   //   ],
    //   // },
    //   // {
    //   //   name: "account-group",
    //   //   title: "Отзывы",
    //   //   fields: [
    //   //     "список",
    //   //     "кнопка",
    //   //     "название компании",
    //   //     "кто написал отзыв имя",
    //   //     "кто написал отзыв должность",
    //   //     "дата отзыва",
    //   //     "должность",
    //   //     "текст отзыва",
    //   //     "фото",
    //   //   ],
    //   // },
    //   // {
    //   //   name: "star",
    //   //   title: "Кастомная секция",
    //   //   fields: [
    //   //     "кнопка для добавления секции",
    //   //     "список",
    //   //     "кнопка для добавления инфы в секцию",
    //   //     "заголовок",
    //   //     "подзаголовок",
    //   //     "сайт",
    //   //     "уровень",
    //   //     "свободная форма",
    //   //     "фото",
    //   //     "дата туда",
    //   //     "дата сюда",
    //   //   ],
    //   // },
    // ],
  }),
  computed: {
    nameIcon() {
      return this.isSidebarMain
        ? "arrow-left-drop-circle"
        : "arrow-right-drop-circle";
    },
  },
  methods: {
    scroll(block) {
      document.getElementById(block).scrollIntoView({
        behavior: "smooth",
      });
    },
    scrollBlock(blockId) {
      if (!this.isSidebarMain) {
        this.isSidebarMain = true;
        setTimeout(this.scroll, 100, blockId);
      } else {
        document.getElementById(blockId).scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    close() {
      console.log(5555);
      this.isSidebarMain = false;
    },
    // addList(name) {
    //   let icon = this.icons.find((item) => item.name == name);
    //   icon.i = icon.i + 1;
    //   let briefFields = [
    //     {
    //       name: "название компании",
    //       label: "название компании*",
    //       type: "text",
    //       value: "",
    //       isRequired: true,
    //     },
    //     {
    //       name: "сайт компании",
    //       label: "сайт компании",
    //       type: "text",
    //       value: "",
    //       isRequired: false,
    //     },
    //     {
    //       name: "сфера деятельности",
    //       label: "сфера деятельности",
    //       type: "text",
    //       value: "",
    //       isRequired: false,
    //     },
    //     {
    //       name: "должность",
    //       label: "должность*",
    //       type: "text",
    //       value: "",
    //       isRequired: true,
    //     },
    //     {
    //       name: "дата начала",
    //       label: "дата начала*",
    //       modal: false,
    //       isRequired: true,
    //       type: "date",
    //       // value: new Date().toISOString().substr(0, 7),
    //       value: "",
    //     },
    //     {
    //       name: "дата окончания",
    //       label: "дата окончания*",
    //       modal: false,
    //       isRequired: true,
    //       type: "date",
    //       // value: new Date().toISOString().substr(0, 7),
    //       value: "",
    //     },
    //     {
    //       name: "свободная форма",
    //       label: "свободная форма",
    //       type: "textarea",
    //       value: "",
    //       isRequired: false,
    //     },
    //   ];
    //   let educationFields = [
    //     {
    //       name: "название учреждения",
    //       label: "название учреждения*",
    //       type: "text",
    //       value: "",
    //       isRequired: true,
    //     },
    //     {
    //       name: "направление",
    //       label: "направление",
    //       type: "text",
    //       value: "",
    //       isRequired: false,
    //     },
    //     {
    //       name: "дата начала",
    //       label: "дата начала*",
    //       modal: false,
    //       isRequired: true,
    //       type: "date",
    //       value: "",
    //     },
    //     {
    //       name: "дата окончания",
    //       label: "дата окончания*",
    //       modal: false,
    //       isRequired: true,
    //       type: "date",
    //       value: "",
    //     },
    //     {
    //       name: "свободная форма",
    //       label: "свободная форма",
    //       type: "textarea",
    //       value: "",
    //       isRequired: false,
    //     },
    //   ];
    //   let coursesField = [
    //     {
    //       name: "название курса",
    //       label: "название курса*",
    //       type: "text",
    //       value: "",
    //       isRequired: true,
    //     },
    //     {
    //       name: "автор курса",
    //       label: "автор курса",
    //       type: "text",
    //       value: "",
    //       isRequired: false,
    //     },
    //     {
    //       name: "дата прохождения",
    //       label: "дата прохождения*",
    //       modal: false,
    //       isRequired: true,
    //       type: "date",
    //       value: "",
    //     },
    //     {
    //       name: "фото сертификата",
    //       label: "фото сертификата",
    //       type: "file",
    //       value: {},
    //       isRequired: false,
    //     },
    //     {
    //       name: "свободная форма",
    //       label: "свободная форма",
    //       type: "textarea",
    //       value: "",
    //       isRequired: false,
    //     },
    //   ];
    //   if (icon.isAddible) {
    //     if (name == "briefcase") {
    //       icon.list.push({ id: icon.i, fields: briefFields });
    //     } else if (name == "school") {
    //       icon.list.push({ id: icon.i, fields: educationFields });
    //     } else if (name == "certificate") {
    //       icon.list.push({ id: icon.i, fields: coursesField });
    //     }
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.left-sidebar {
  transition: width 0.3s ease;
  width: 30%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  @include xl-down {
    width: 100%;
  }

  .overlay {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 3;
    cursor: pointer;

    @include xl-down {
      display: block;
    }
  }

  .left-sidebar-content {
    display: flex;
    position: relative;
    z-index: 4;
    overflow: hidden;
  }

  .sidebar-text {
    @include xl-down {
      display: none;
    }

    &.__mobile {
      display: block;
      // width: 50%;

      @include xl-down {
        width: 45%;
      }

      @include sm-down {
        width: 75%;
      }
    }
  }

  .btn-toggle {
    display: none;
    position: absolute;
    top: 21px;
    left: 44px;
    width: 26px;
    height: 50px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    z-index: 4;
    background-color: #de8e22;

    @include xl-down {
      display: flex;
    }

    &:hover,
    &:active {
      background-color: #c07209;
    }
  }
}
</style>
