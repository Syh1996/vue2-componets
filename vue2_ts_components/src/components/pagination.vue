<template>
  <section :class="['pagination reset-style-pagination', custormConfig.align]">
    <el-pagination
      :current-page="custormConfig.currentPage"
      :page-size="custormConfig.pageSize"
      :page-sizes="custormConfig.sizes"
      :small="custormConfig.small"
      :disabled="custormConfig.disabled"
      :background="custormConfig.background"
      :layout="custormConfig.layout"
      :total="custormConfig.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Pagination } from "element-ui";
const defaultConfig = {
  align: "right",
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30, 50, 100],
  total: 0,
  small: false,
  background: true,
  disabled: false,
  layout: "total, prev, pager, next,sizes, jumper",
};
@Component({
  name: 'PaginationComponent',
  components: {
    "el-pagination": Pagination,
  },
})
/** 分页组件  */
export default class PaginationComponent extends Vue {
  @Prop({ default: () => {} }) config?: any;
  @Watch("config", { deep: true, immediate: true }) configChange(newVal: any) {
    this.custormConfig = { ...this.custormConfig, ...(this.config || {}) };
  }
  // 自定义配置
  custormConfig: any = { ...defaultConfig };

  /** 分页大小变化 */
  public handleSizeChange = (val: number) => {
    this.custormConfig.pageSize = val;
    this.custormConfig.currentPage = 1;
    this.$emit("getPaginationData", {
      ...this.getPaginationData(),
      pageSize: val,
      currentPage: 1
    });
  };
  /** 获取分页信息 */
  public getPaginationData() {
    return {
      currentPage: this.custormConfig.currentPage,
      pageSize: this.custormConfig.pageSize,
      total: this.custormConfig.total,
    };
  }
  /** 当前页变化 */
  public handleCurrentChange(val: number) {
    this.custormConfig.currentPage = val;
    this.$emit("getPaginationData", {
      ...this.getPaginationData(),
      currentPage: val,
    });
    if (val >= 30) {
      document.documentElement.scrollTop = 0;
    }
  }
  /** 重置分页 */
  public resetPagination() {
    this.custormConfig.currentPage = 1;
    this.custormConfig.pageSize = 10;
    this.custormConfig.total = 0;
  }
}
</script>

<style scoped lang="less">
.reset-style-pagination {
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  &.left {
    .el-pagination {
      float: left;
    }
  }
  &.right {
    .el-pagination {
      float: right;
    }
  }
  &.center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-pagination__sizes {
    margin-left: 20px;
  }
}
</style>
