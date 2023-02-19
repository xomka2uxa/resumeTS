<template>
  <div
    class="wrapper-icon"
    :class="{ __sidebar: inSide, __dark: inToggle, __white: isWhite }"
    @click="iconClick"
  >
    <a>
      <mdicon :name="name" class="icon" />
    </a>
    <div class="icon-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    inSide: {
      type: Boolean,
      default: false,
    },
    inToggle: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["iclick"],
  methods: {
    iconClick() {
      this.$emit("iclick");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-icon {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  width: 24px;
  height: 24px;
  padding: 10px 10px;
  cursor: pointer;

  .icon-title {
    position: absolute;
    border-radius: 5px;
    opacity: 0;
    white-space: nowrap;
    top: 0;
    left: 42px;
    background-color: rgba(#5a5a5b, 0.8);
    color: #fff;
    font-family: Roboto Condensed, Arial, sans-serif;
    font-size: 14px;
    transition: opacity 0.2s linear;
    padding: 7px;
    z-index: 2;

    // @include xl-down {
    //   display: none;
    // }
  }

  a {
    color: #383839;
  }

  &.__sidebar {
    padding: 4px;
    margin: 8px 0;
    border-radius: 50%;
    transition: background-color 0.2s linear;

    :deep(svg) {
      fill: #a7a7a7;
      transition: fill 0.2s linear;
    }

    &:hover,
    &:active {
      background-color: #5a5a5b;

      .icon-title {
        opacity: 1;
      }

      :deep(svg) {
        fill: #e1c98e;
      }
    }
  }

  &.__white {
    a {
      color: #fff;
    }
  }

  &.__dark {
    padding: 0;

    :deep(svg) {
      fill: #efdfb7;
      transition: fill 0.2s linear;
    }
  }
}
</style>
