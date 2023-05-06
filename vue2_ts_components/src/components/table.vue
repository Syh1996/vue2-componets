<template>
  <section class="table-components">
    <div class="batch-handle" v-if="$scopedSlots['batchHandle']">
      <slot name="batchHandle" :data="selectTr.value"></slot>
    </div>
    <div :class="[tableGlobalConfig.custormClass]">
      <el-table
        ref="tableComponentRef"
        :data="tableData"
        @row-click="rowClick"
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
          :align="tableGlobalConfig.align"
        />
        <el-table-column
          type="index"
          :label="$t('SerialNo')"
          :index="tableGlobalConfig.indexMethod"
          v-if="tableGlobalConfig.showIndex"
          :width="tableGlobalConfig.indexWidth || 80"
          :align="tableGlobalConfig.align"
        />
        <el-table-column
          v-for="(item, index) in getTableColumnConfig"
          :align="tableGlobalConfig.align"
          v-bind="item"
          :label="item.title"
          :key="index"
          :width="item.width || 'auto'"
          :fixed="item.fixed || false"
          :sortable="item.sortable || false"
          :show-overflow-tooltip="item.key !== 'handle'"
          :prop="item.key"
          
        >
          <template
            v-if="!item.children || item.children.length === 0"
            slot-scope="scope"
          >
            <div v-if="item.key !== 'handle'">
              <div v-if="$scopedSlots[item.key]" @click="slotClick">
                <slot
                  :name="item.key"
                  :row="scope.row"
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
            <div v-else @click.stop>
              <slot name="handle" :row="scope.row" :index="scope.$index"></slot>
            </div>
          </template>
          
          <el-table-column
            v-for="(cur, index) in item.children"
            :align="tableGlobalConfig.align"
            v-bind="cur"
            :label="cur.title"
            :key="index"
            :width="cur.width || 'auto'"
            :fixed="cur.fixed || false"
            :sortable="cur.sortable || false"
            :show-overflow-tooltip="cur.key !== 'handle'"
            :prop="cur.key"
            
          >
            <template slot-scope="scope">
              <div v-if="cur.key !== 'handle'">
                <div v-if="$scopedSlots[cur.key]" @click="slotClick">
                  <slot
                    :name="cur.key"
                    :row="scope.row"
                    :index="scope.$index"
                  ></slot>
                </div>
                <p v-else>
                  <span v-if="cur.isMoney">{{
                    forMatterMoney(scope.row[cur.key])
                  }}</span>
                  <span v-else>{{
                    scope.row[cur.key] || scope.row[cur.key] == "0"
                      ? scope.row[cur.key]
                      : "--"
                  }}</span>
                </p>
              </div>
              <div v-else @click.stop>
                <slot
                  name="handle"
                  :row="scope.row"
                  :index="scope.$index"
                ></slot>
              </div>
            </template>
          </el-table-column>
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
      default: () => [],
    },
    tableColumnConfig: {
      type: Array,
      default: () => [],
    },
    tableConfig: {
      type: Object,
      default: () => ({}),
    },
    paginationData: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tableAttributes: {
      type: Object,
      default: () => ({}),
    },
    tableEvents: {
      type: Object,
      default: () => ({}),
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
    // 插槽点击
    slotClick(e) {
      if (e.target.tagName.toUpperCase() === "A") {
        e.stopPropagation();
      }
    },
    // 行点击
    rowClick(row, column) {
      const tableRef = this.$refs.tableComponentRef;
      tableRef && tableRef.toggleRowSelection(row);
    },
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
        align: 'center',
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
    getPaginationData(data) {
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
    .el-table--enable-row-transition .el-table__body td.el-table__cell{
      transition: none;
    }
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
      box-sizing: border-box;
      th {
        background-color: #f3f3f3;
        color: #909399;
        font-weight: 600;
      }
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
