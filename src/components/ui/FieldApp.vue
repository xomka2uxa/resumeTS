<template>
  <div class="field-wrapper">
    <input name="browser" type="text" class="input" v-model="ff" />
    <label class="field-label" :class="{ _top: ff }">{{ fieldName }}</label>
  </div>
</template>

<script>
export default {
  props: {
    fieldName: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    ff: "",
  }),
};
</script>

<style lang="scss" scoped>
.field-wrapper {
  position: relative;
  height: 38px;
  margin-bottom: 15px;

  .field-label {
    position: absolute;
    color: #656565;
    top: 12px;
    left: 10px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 1;

    &._top {
      font-size: 12px;
      top: -7px;
      left: 15px;
      padding: 0 5px;
      color: #656565;
      background-color: #222;
      z-index: 3;
    }
  }
  .input {
    position: relative;
    border-radius: 5px;
    border: 1px solid #4b4b4b;
    padding: 10px;
    color: #fff;
    background-color: transparent;
    z-index: 2;

    &:focus + .field-label {
      font-size: 12px;
      top: -7px;
      left: 15px;
      padding: 0 5px;
      color: #fff;
      background-color: #222;
      z-index: 3;
    }
  }
}
</style>
