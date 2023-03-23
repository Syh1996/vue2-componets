<template>
      <el-input
      v-model="text"
      v-bind="$attrs"
      style="width: 100%"
      @blur="inputBlur"
      @focus="inputFous"
    ></el-input>
</template>

<script lang='ts'>
import { Input } from "element-ui";
import Vue from "vue";
import { Component, Model, Prop, Watch } from "vue-property-decorator";
@Component({
  name: 'MoneyInput',
  components: {
    "el-input": Input,
  },
})
export default class InputMoney extends Vue {
  @Model("blurData") val!: string | number | null;
  text: string = "";

  @Watch("val",{
      immediate: true
  }) public valChange(newVal: string | number) {
    if(typeof newVal === 'string'){
       newVal = newVal.replace(/\,/g, "")
    }
    this.text = (["string", "number"].includes(typeof newVal) && newVal) || newVal ===0
      ? Number(newVal).toLocaleString()
      : "";
  }
  /** 获取焦点 */
  public inputFous() {
    this.text = (this.text || "").replace(/\,/g, "");
  }
  /** 失去焦点 */
  public inputBlur() {
    const reg: RegExp = /^\-?\d+(\.\d{1,2})?$/;
    const value: string = this.text;
    if(reg.test(value)){
       this.text = Number(value).toLocaleString();
       // this.$emit("blurData", Number(value).toLocaleString());
       this.$emit("blurData", Number(value));
    }else{
      this.text = '';
      this.$emit("blurData", '');
    }
   
  }
}
</script>

<style>
</style>