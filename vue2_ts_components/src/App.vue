<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <TableTitle></TableTitle>
    <UploadGroup msg="Welcome to Your Vue.js + TypeScript App" />
    <TableComponent2
      :tableConfig="tableConfig"
      :tableData="tableData"
      :tableColumnConfig="tableColumnConfig"
      @getSelectRow="getSelectRow"
      :tableAttributes="{
       
        'highlight-current-row': true,
      }"
      :tableEvents="{}"
    >
      <!-- 表格头部操作栏  slotName不可变 -->
      <template #batchHandle="{ data }">
        <button type="danger" @click="deleteItem(data)">批量删除</button>
        <button type="danger" @click="deleteItem(data)">新增</button>
        <button type="danger" @click="deleteItem(data)">编辑</button>
        <button type="danger" @click="deleteItem(data)">其它</button>
      </template>

      <template #date="data">
        <a href="#">{{ data.row.date }}</a>
      </template>
      <!-- 操作栏按钮slot  -->
      <template #handle="data">
        <button type="danger" @click="deleteItem(data)">删除</button>
        <button type="danger" @click="edit(data)">编辑</button>
      </template>
    </TableComponent2>
    <MoneyInput v-model="money" size="small" style="width: 240px"></MoneyInput>
    <h2>{{ money }}</h2>
    <FormGroup :formConfig="formConfig">
      <template #default="scope">
        <div class="handle-btn">
          <button
            size="small"
            icon="el-icon-refresh-left"
            type="default"
            @click="scope.reset"
          >
            {{ $t("重置") }}
          </button>
          <button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="scope.search"
          >
            {{ $t("查询") }}
          </button>
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputMoney from "./components/InputMoney.vue";
import TableComponent from "./components/table.vue";
import axios from "axios";
@Component({
  components: {
    TableComponent2: TableComponent,
  },
})
export default class App extends Vue {
  formConfig = [
    {
      label: "公司",
      key: "company",
      type: "selectRemoteMethod",
      span: 6,
      multiple: true,
      collapseTags: true,
      loadApi: async (params: any) => {
        console.log("params:", params);
        const data =
          (await axios.get("http://127.0.0.1:3002/list", {
            params: params,
          })) || [];
        return data.data;
      },
    },
    {
      label: "学校",
      key: "school",
      type: "radio",
      span: 6,
      multiple: true,
      collapseTags: true,
      value: 1,
      options: [
        { label: "重庆大学", value: 1 },
        { label: "北京大学", value: 2 },
      ],
      onChange: ({ formData, formList, index, e }: any, that: any) => {
        that.formData["curSchool"] = e;
      },
    },
    {
      label: "当前学校",
      key: "curSchool",
      type: "input",
      span: 6,
      value: 1,
      elementAttributes: {
        "show-password": true,
      },
    },
  ];
  money = "";
  tableConfig = {
    indexWidth: 120,
    stripe: true,
    align: 'center'
  };
  tableColumnConfig = [
    {
      title: "标题",
      key: "title",
      sortable: true,
    },
    {
      title: "日期",
      key: "date",

      children: [
        {
          title: "出生日期",
          key: "date",
          sortable: true,
        },
        {
          title: "小学读书日期",
          key: "date",
          sortable: true,
        },
      ],
    },
    {
      title: "操作",
      key: "handle",
    },
  ];
  tableData = [
    { title: "111111111", date: "3小时前" },
    { title: "22222222", date: "20小时前" },
    { title: "111111111", date: "23小时前" },
    { title: "22222222", date: "230小时前" },
  ];
  public deleteItem(data: any) {
    console.log(data);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width: 1200px;
  margin: 0 auto;
}
</style>
