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
<script>
import { Select, Option } from "element-ui";
export default {
  name: "RemoteMethodSelect",
  components: {
    Select,
    Option,
  },
  props: {
    loadApi: {
      type: Function,
      require: true,
    },
    queryKey: {
      type: String,
      default: "ouParam",
    },
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modelValue: {},
      loading: false,
      options: [],
    };
  },
  methods: {
    /** 初始时获取默认列表 */
    async getOptions() {
      const data =
        (await this.loadApi({
          [this.queryKey]: this.modelValue,
        })) || [];
      this.options = data;
      this.$emit("getFullData", this.options, this.modelValue);
    },
    /**
     *  远程搜索
     */
    async remoteMethod(value) {
      if (!value.trim()) {
        return;
      }

      const query = {
        [this.queryKey]: value,
      };
      this.loading = true;
      const data = (await this.loadApi(query)) || [];
      this.options = data;
      this.loading = false;
    },
    /**
     * 选择数据
     */
    selectChange(data) {
      // const rows = this.options.find((item: any) => item.value === data);
      this.$emit("input", data);
      this.$emit("getFullData", this.options, data);
    },
  },
  watch: {
    value: {
      handler(newValue) {
        if (newValue && newValue !== this.modelValue) {
          this.modelValue = newValue;
          this.getOptions();
        }
      },
      immediate: true,
    },
  },
};
</script>
