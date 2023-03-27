<template>
  <el-input
    v-model="text"
    v-bind="$attrs"
    style="width: 100%"
    @blur="inputBlur"
    @focus="inputFous"
  ></el-input>
</template>

<script>
import { Input } from "element-ui";
export default {
  name: "MoneyInput",
  components: {
    "el-input": Input,
  },
  model: {
    prop: "val",
    event: "blurData",
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    /** 获取焦点 */
    inputFous() {
      this.text = (this.text || "").replace(/\,/g, "");
    },
    /** 失去焦点 */
    inputBlur() {
      const reg = /^\-?\d+(\.\d{1,2})?$/;
      const value = this.text;
      if (reg.test(value)) {
        this.text = Number(value).toLocaleString();
        // this.$emit("blurData", Number(value).toLocaleString());
        this.$emit("blurData", Number(value));
      } else {
        this.text = "";
        this.$emit("blurData", "");
      }
    },
  },
  watch: {
    val: {
      handler(newVal) {
        if (typeof newVal === "string") {
          newVal = newVal.replace(/\,/g, "");
        }
        this.text =
          (["string", "number"].includes(typeof newVal) && newVal) ||
          newVal === 0
            ? Number(newVal).toLocaleString()
            : "";
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>