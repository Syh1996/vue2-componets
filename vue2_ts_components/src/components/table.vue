<template>
  <section class="table-components">
    <div class="batch-handle" v-if="$scopedSlots['batchHandle']">
      <slot name="batchHandle" :data="selectTr.value"></slot>
    </div>
    <div :class="[tableGlobalConfig.custormClass]">
      <el-table
        ref="tableComponentRef"
        :data="tableData"
        v-bind="tableAttributes"
        v-on="tableEvents"
        :border="tableGlobalConfig.border === true"
        :stripe="tableGlobalConfig.stripe === true"
        :row-class-name="tableGlobalConfig.rowClassName"
        :max-height="tableGlobalConfig.maxHeight"
        :table-layout="tableGlobalConfig.tableLayout"
        :cell-class-name="tableGlobalConfig.cellClassName"
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
        :row-key="getCurRowKey"
        size="small"
        v-loading="loading"
      >
        <el-table-column
          type="selection"
          width="55"
          v-if="tableGlobalConfig.selection"
          :selectable="tableGlobalConfig.selectable || defaultSelectable"
          :reserve-selection="true"
          :fixed="tableGlobalConfig.selectionFixed || 'left'"
        />
        <el-table-column
          type="index"
          :label="$t('SerialNo')"
          :index="tableGlobalConfig.indexMethod"
          v-if="tableGlobalConfig.showIndex"
          :width="tableGlobalConfig.indexWidth || 80"
        />
        <el-table-column
          v-for="(item, index) in getTableColumnConfig"
          :label="item.title"
          :key="index"
          :width="item.width || 'auto'"
          :fixed="item.fixed || false"
          :sortable="item.sortable || false"
          :show-overflow-tooltip="item.key !== 'handle'"
        >
          <template #default="scope">
            <div v-if="item.key !== 'handle'">
              <div v-if="$scopedSlots[item.key]">
                <slot
                  :name="item.key"
                  :data="scope.row"
                  :index="scope.$index"
                ></slot>
              </div>
              <p v-else>
                <span v-if="item.isMoney">{{
                  forMatterMoney(scope.row[item.key])
                }}</span>
                <span v-else>{{
                  scope.row[item.key] || scope.row[item.key] == "0"
                    ? scope.row[item.key]
                    : "--"
                }}</span>
              </p>
            </div>
            <div v-else>
              <slot name="handle" :row="scope.row" :index="scope.$index"></slot>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination
      @getPaginationData="getPaginationData"
      v-if="tableGlobalConfig.showPagination"
      :config="paginationData"
    ></Pagination>
  </section>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import Pagination from "@Components/pagination.vue";
export default {
  name: "TableComponent",
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    Pagination,
  },
  props: {
    tableData: {
      type: Array,
      default: ()=>[],
    },
    tableColumnConfig: {
      type: Array,
      default: ()=>[],
    },
    tableConfig: {
      type: Object,
      default: ()=>({}),
    },
    paginationData: {
      type: Object,
      default: ()=>({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tableAttributes: {
      type: Object,
      default: ()=>({}),
    },
    tableEvents: {
      type: Object,
      default: ()=>({}),
    },
  },
  data() {
    return {
      // 表格配置项
      tableGlobalConfig: {},
      // 选择的行
      selectTr: { value: [] },
      // 表数据
      data: [],
    };
  },
  computed: {
    getTableColumnConfig() {
      return this.tableColumnConfig;
    },
  },
  /** mounted */
  mounted() {
    this.initTableGlobalConfig();
    this.$bus.$on("clearTableTr", (res) => {
      this.clearSelection();
    });
  },
  beforeDestroy() {
    this.$bus.$off("clearTableTr");
  },
  methods: {
    // 初始defaultSelectable
    defaultSelectable(row, index) {
      return true;
    },
    // 获取生成当前行key
    getCurRowKey(row) {
      return JSON.stringify({ ...row });
    },
    // 取消已选
    clearSelection() {
      if (this.$refs.tableComponentRef) {
        this.$refs.tableComponentRef.clearSelection();
      }
    },
    //初始表单配置默认值
    initTableGlobalConfig() {
      this.tableGlobalConfig = {
        border: true,
        stripe: true,
        showIndex: true,
        rowClassName: () => {
          return "custorm-row";
        },
        indexMethod: (index) => {
          return index + 1;
        },
        cellClassName: () => {
          return "custorm-cell";
        },
        maxHeight: 800,
        selection: true,
        tableLayout: "fixed",
        showPagination: true,
        custormClass: "table-loading-box",
        ...this.tableConfig,
      };
    },
    // 表格选择
    handleSelectionChange(val) {
      this.selectTr.value = val;
      this.$emit("getSelectRow", val);
    },
    /** 分页变化 */
    getPaginationData() {
      this.$emit("currentPageChange", data);
    },
    /** @param { string | number | null }  value
     * 格式化当前数据为金额 */
    forMatterMoney(value) {
      const dataType = typeof value;
      const reg = /^\-?\d+(\.\d+)?$/;
      const formatter = (cur) => {
        if (!cur || !reg.test(cur)) {
          return cur;
        }
        const arr = cur.split(".") || [];
        const xiaoshu = arr && arr.length >= 2 ? arr[1] : "00";
        const subXiaoshu =
          xiaoshu.length >= 2 ? xiaoshu.substring(0, 2) : `${xiaoshu}0`;
        return Number(`${arr[0]}`).toLocaleString() + `.${subXiaoshu}`;
      };
      const typeFunctiony = {
        string: () => formatter(value),
        number: () => formatter(value.toString()),
        object: () => value,
      };
      return typeFunction[dataType] ? typeFunction[dataType]() : "--";
    },
  },
};
</script>

<style scoped lang="less">
.table-components {
  margin-top: 15px;

  .batch-handle {
    margin: 0 0 15px 0;
    text-align: right;
    vertical-align: middle;
    .el-button {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
  ::v-deep {
    table.el-table__body {
      width: 100% !important;
    }
    .table-loading-box {
      position: relative;
    }
    .el-table--group,
    .el-table--border {
      border-color: #ebeef5 !important;
    }
    .el-table {
      // border:1px solid #EBEEF5;
      box-sizing: border-box;
      th {
        background-color: #f3f3f3;
        text-align: center;
        color: #909399;
        font-weight: 600;
      }
      td {
        text-align: center;
      }
     /*  .el-table__fixed::before,
      .el-table__fixed-right::before {
        background-color: #ddd;
      } */
      th,
      td {
        border-color: #ebeef5 !important;
      }
      &::before,
      &.el-table--group::after,
      &.el-table--border::after,
      .el-table__fixed-right::before {
        background-color: #ebeef5 !important;
      }
      &::before,
      &.el-table--group::after,
      &.el-table--border::after {
        border-color: #ebeef5 !important;
      }
    }
  }
}
</style>
