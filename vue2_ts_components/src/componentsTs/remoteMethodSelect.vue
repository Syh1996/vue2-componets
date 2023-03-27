<template>
  <Select
    v-model="modelValue"
    filterable
    remote
    size="small"
    :clearable="true"
    reserve-keyword
    :remote-method="remoteMethod"
    :loading="loading"
    :disabled="disabled"
    @change="selectChange"
    :placeholder="$t('placeInputInfo')"
    style="width: 100%"
  >
    <Option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></Option>
  </Select>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";
import { Select, Option } from "element-ui";
import { IOptions } from "../ts/comm";
@Component({
  name: 'RemoteMethodSelect',
  components: {
    Select,
    Option,
  },
})
export default class RemoteMethodSelect extends Vue {
  modelValue: any = {};
  loading: boolean = false;
  options: IOptions[] = [];
  @Prop({
    required: true,
  })
  loadApi!: (query: any) => any;
  @Prop({
    default: "ouParam",
  })
  queryKey!: string;
  @Prop({}) value!: string;
  @Prop({default: false}) disabled!: boolean;
  @Watch("value", {
    immediate: true,
  })
  public valueInit(newValue: any, oldValue: any) {
    if (newValue && newValue !== this.modelValue) {
      this.modelValue = newValue;
      this.getOptions();
    }
  }
  /** 初始时获取默认列表 */
  public async getOptions() {
    const data =
      (await this.loadApi({
        [this.queryKey]: this.modelValue,
      })) || [];
    this.options = data;
    this.$emit("getFullData", this.options, this.modelValue);
  }
  /**
   *  远程搜索
   */
  public async remoteMethod(value: string) {
    if (!value.trim()) {
      return;
    }

    const query: any = {
      [this.queryKey]: value,
    };
    this.loading = true;
    const data = (await this.loadApi(query)) || [];
    this.options = data;
    this.loading = false;
  }
  /**
   * 选择数据
   */
  public selectChange(data: any) {
    // const rows = this.options.find((item: any) => item.value === data);
    this.$emit("input", data);
    this.$emit("getFullData", this.options, data);
  }
}
</script>
