## 使用说明

### 使用背景

`vue2_ts_component` 基于vue2.x  完成搭建。

使用建议为：项目为**vue2版本** ，支持**国际化** 

组件主要为系统管理产品提供较快封装组件。

### 开始

#### 安装

```tex
npm i vue2_ts_components
```

#### 配置使用

```js
import 'vue2_ts_components/dist/app.css';
import vue2TSComponent from 'vue2_ts_components';

/**
   如果你需要使用ts约束分页、各类配置
   你可以引入以下ts
**/
import 'vue2_ts_components/src/ts/comm.ts';


Vue.use(vue2TSComponent);



const data = new Vue({
  render: h => h(App),
}).$mount('#app')
```

#### 国际化问题

项目封装的组件已经完成了国际化中文 and 英文展示，通过`localStroge.getItem('lang')`来区分当前环境中英文

其中`CN` 代表`中文`， `EN` 代表 `英文`

有时候我们环境`localStroge.getItem('lang')` 已经用于其它变量，为些，你可以在`Vue.use(Vue2_ts_components,{lang: 'currentLang'})`  通过use方法，传递属性为lang的自定义取localStroge的字段。

如

```js
Vue.use(Vue2_ts_components,{lang: '__current__lang'})
```

此时，内部组件将通过 stroge中的`__current__lang` 来判定当前使用环境



### 可用模块

为方便你对组件配置项类型、可选参数方便观看，提供了组件内部的公共TS文件，你可以引入node_modules里面的ts声明文件，来帮助你快速的使用组件

```js
import {
	IPagination,
	ISearch,
	ITableConfig,
	ITableColumnConfig,
	IOptions,
	IFormSearch,
	IHandle,
	IResponse
} from 'vue2_ts_components/src/ts/comm';
```

| TS类型             | 说明                                     | 备注 |
| ------------------ | ---------------------------------------- | ---- |
| IPagination        | 分页类型                                 |      |
| ISearch            | 搜索组件点击查询、重置时，返回的数据类型 |      |
| ITableConfig       | 表格总体配置                             |      |
| ITableColumnConfig | 单元格配置                               |      |
| IOptions           | Select框 options类型                     |      |
| IFormSearch        | 搜索 框类型                              |      |
| IHandle            | 新增、编辑时，操作类型                   |      |
| IResponse          | 接口响应数据                             |      |



### 可用组件列表

#### 标题

##### 使用

```html
<TableTitle title="查询条件" themeColor="orange"></TableTitle>
```

| 参数       | 说明       | 默认值  |
| ---------- | ---------- | ------- |
| title      | 展示的文字 | 查询    |
| themeColor | 主题颜色   | #2c75ec |

##### 预览

![](http://server.yuhongshao.cn/static/yuhongshao/20220909144501.png)



#### 分页封装

##### 使用

```html
 <PaginationComponent :config="config" @getPaginationData="getPaginationData">
 </PaginationComponent>
```

| 参数               | 说明                         | 默认值                                                     |
| ------------------ | ---------------------------- | ---------------------------------------------------------- |
| config.currentPage | 当前页                       | Number型，默认值：1                                        |
| config.pageSize    | 分页展示的数量               | Number型，默认值：10                                       |
| config.pageSizes   | 每页显示个数选择器的选项设置 | Number[]型，默认值：[10, 20, 30, 50, 100]                  |
| config.total       | 数据总数                     | Number型，默认值：0                                        |
| config.small       | 是否使用小型分页样式         | Boolean型，默认值：false                                   |
| config.background  | 是否为分页按钮添加背景色     | Boolean型，默认值：true                                    |
| config.disabled    | 是否禁用分页                 | Boolean型，默认值：false                                   |
| config.layout      | 组件布局，子组件名用逗号分隔 | String型，默认值："total, prev, pager, next,sizes, jumper" |
| config.align       | 分页组件对齐方式             | String型，默认值“right"，支持"left/center/right"           |
| @getPaginationData | 分页数量、当前页变化时触发   | ({currentPage,pageSize})=>{}                               |



##### 预览

![](http://server.yuhongshao.cn/static/yuhongshao/20220909154254.png)





#### 上传文件

##### 使用

```html
<UploadGroup
          :fn="uploadFile"
          :title="上传导入"
          :callBack="uploadExcelResponse"
        ></UploadGroup>

<script>
 // 封装的ajax
 const custormAxios = (file,onUploadProgress){
             return  axios.create({
   			 baseURL: '/', // 如果url不是绝对路径，那么会将baseURL和url拼接作为请求的接口地址,用来区分不同环境，
    		 timeout: 60000, // 请求超时时间
   			 responseType: 'json', // 表示服务器响应的数据类型
    		 onUploadProgress: function (progressEvent) {
      			// 对原生进度事件的处理
      		    onUploadProgress ? onUploadProgress(progressEvent): ()=>{}
    		},
        }
    

new Vue({
    methods:{
        uploadFile(files,onUploadProgress){
           // 调用自己的ajax，onUploadProgress请在ajax中的上传进度事件中调用
            custormAxios(file,onUploadProgress)
        },
        uploadExcelResponse(responseData){
            // 接口响应回来的数据
        }
    }
})
</script>
```

| 参数          | 说明                                        | 默认值                        |
| ------------- | ------------------------------------------- | ----------------------------- |
| title         | 上传按钮展示的文字                          | string                        |
| disabled      | 上传按钮是否禁用                            | boolean型                     |
| fn            | 导入调用的接口请求                          | Function型                    |
| uploadFileExt | 导入文件允许的后缀                          | string[]，默认["xlsx", "xls"] |
| config.total  | 数据总数                                    | Number型，默认值：0           |
| callBack      | 回调函数，文件上传完成 后返回接口返回的数据 | Function型                    |

##### 预览

![http://server.yuhongshao.cn/static/yuhongshao/20230324141835.png](http://server.yuhongshao.cn/static/yuhongshao/20230324141835.png)





#### 金额输入框

##### 使用

与普通输入框相同，在此增加千分位展示

``````html
<MoneyInput v-model="money"></MoneyInput>
``````





#### 表格(已集成分页)

##### 使用

**支持element-ui Table上所有属性和方法**

当组件配置与element-ui table上的属性共同存在时，组件配置项优先于table上的属性

```html
<TableComponent
      :tableConfig="tableConfig"
      :tableData="tableData"
      :tableColumnConfig="tableColumnConfig"
      @getSelectRow="getSelectRow"
      :tableAttributes="{}"
      :tableEvents="{}"
    >
        <!-- 表格头部操作栏  slotName不可变 -->
        <template #batchHandle="{data}">
            <el-button type="danger" @click="deleteItem(data)">批量删除</el-button>
            <el-button type="danger" @click="deleteItem(data)">新增</el-button>
            <el-button type="danger" @click="deleteItem(data)">编辑</el-button>
            <el-button type="danger" @click="deleteItem(data)">其它</el-button>
        </template>
        
        <!-- 自定义时间  -->
         <template #date="{data}">
           <p @click="showData(data)">{{data.date.replaceAll('-','/')}}</p>
        </template>
        
        <!-- 操作栏按钮slot  -->
        <template #handle="data">
            <el-button type="danger" @click="deleteItem(data)">删除</el-button>
            <el-button type="danger" @click="edit(data)">编辑</el-button>
        </template>
        
  </TableComponent>
```



**tableConfig 配置项**

| 参数                        | 说明                                        | 默认值              | 可选值 |
| --------------------------- | ------------------------------------------- | ------------------- | ------ |
| tableConfig.border          | 是否有border边线               | boolean型      | 默认true |
| tableConfig .stripe         | 是否有隔行纹理              | boolean型           | 默认true |
| tableConfig.maxHeight       | 表格最大高度,超过时将出现滚动条 | number型 | 默认800 |
| tableConfig.selection       | 是否带有选择框，                      | boolean型，默认值：true | 默认true |
| tableConfig.tableLayout | 表格分布方式 |  |  |
| tableConfig .selectionFixed | 选择框固定位置 | string型     | left/right/true/false |
| config.rowClassName |                                         | string型 ||
| config.indexMethod | 序号自定义下标，返回一个number     | Number型  ||
| config.indexWidth | 序号显示宽度 | Number |80|
| config.cellClassName |                                         | string型 ||
| config.showPagination | 是否带有分页组件                | oolean型                  |默认true|
| config.showIndex | 是否带有下标序号列             | boolean型 |默认true|
| config.custormClass | 自定义表格class                         | string型 ||
| config.selectable | 选择框可选条件                | Fuction型,返回一个boolean ||
| @getSelectRow | 选中的记录 |                                          ||



**tableColumnConfig配置项**

| 参数                       | 说明                                 | 默认值             | 可选值 |
| -------------------------- | ------------------------------------ | ------------------ | ------ |
| tableColumnConfig.title    | 单元格标题                           | string型           |        |
| tableColumnConfig .key     | 绑定的属性，需要展示的值 字段        | string型           |        |
| tableColumnConfig.sortable | 是否带有排序功能                     | boolean型          |        |
| tableColumnConfig.width    | 单元格宽度                           | string \| number型 |        |
| tableColumnConfig.fixed    | 固定当前列                           | string \| boolean  |        |
| tableColumnConfig .isMoney | 是否是金额，true会将数字转千分位展示 | boolean型          |        |



**tableAttributes**  可配置element-ui table自带属性，优秀级低级当前组件属性和方法

**tableEvents**  可配置element-ui table自带方法，优秀级低级当前组件属性和方法

**loading**  表格加载动画 





##### 预览

![](http://server.yuhongshao.cn/static/yuhongshao/20220909160349.png)



#### 搜索栏

##### 使用

```html
<FormGroup
      :formConfig="formConfig"
      ref="formItemGroup"
      @getFormData="getFormData"
    >
      <template #default="scope">
        <div class="handle-btn">
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            type="default"
            @click="scope.reset"
            >{{ $t("重置") }}</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="scope.search"
            >{{ $t("查询") }}</el-button
          >
        </div>
      </template>
    </FormGroup>
```



**formConfig[] 配置**

| 参数                             | 说明                                                   | 备注                                                         |
| -------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| formConfig.label                 | 展示label                                              |                                                              |
| formConfig.textAlign             | 展示label对齐方式                                      | 可选['left','center','right']                                |
| formConfig.labelWidth            | 展示label文字的宽度                                    | Number类型，默认100                                          |
| formConfig.formItemWidth         | input/select...宽度                                    | Number                                                       |
| formConfig.key                   | 绑定的值字段 即v-model=""                              | 必填                                                         |
| formConfig.type                  | 组件类型                                               | input<br>select<br/>selectAsync<br/>radio<br/>checkbox<br/>date<br/>dateRange<br/>dateTime<br/>dateTimeRange<br/>month<br/>selectRemoteMethod<br/> |
| formConfig.value                 | 初始绑定的值                                           |                                                              |
| require                          | 必填                                                   | 默认false,true时，必填不满足时，不向上提交 事件              |
| formConfig.size                  | 操作框大小                                             | 默认small                                                    |
| formConfig.options               | type='select'时，列表配置                              | options: [<br/> { label: "男", value: "1" },<br/> { label: "女", value: "2" }, <br/>] |
| formConfig.remoteMethod          | type="select/selectAsync"时，远程调接口动态搜索        | 函数需要返回值 <br/>(formList, index, text) =>{ formList:是当前配置列表 index当前 配置项的下标 text当前输入的值 } |
| formConfig.span                  | 布局与el-row>el-col :span相同                          | 可选[1-24]，如8时，表示一行展示3列                           |
| formConfig.placeholder           | placeholder提示信息                                    |                                                              |
| formConfig.clearable             | 是否展示清除按钮                                       | Boolean类型，默认true                                        |
| formConfig.multiple              | type="select/selectAsync"时，是否可以多选列表          | Boolean类型，默认false                                       |
| formConfig.collapseTags          | type="select/selectAsync"且多选时，多选项是否折叠      | 参考：[https://element-plus.gitee.io/zh-CN/component/select.html#select-%E5%B1%9E%E6%80%A7](https://element-plus.gitee.io/zh-CN/component/select.html#select-属性) |
| formConfig.loadApi               | select异步时，可调用接口获取列表                       | 当数据列表来源于后台接口时，<br/>配置loadApi，底层将自动调用，<br/>并为options赋值 |
| formConfig.rangSeparator         | type="dateRange/dateTimeRange"时,分割符                | 默认'-'                                                      |
| formConfig.startPlaceholder      | 时间、日期范围选择时，开始时间的placeholder            |                                                              |
| formConfig.endPlaceholder        | 时间、日期范围选择时，结束时间的placeholder            |                                                              |
| formConfig.valueFormat           | 日期框返回的格式                                       | 默认yyyy-MM-dd                                               |
| formConfig.disabledDate          | 日期禁用项配置                                         |                                                              |
| formConfig.onChange              | ({formData, formList, index, e}: any, *that*: any)=>{} | formData（当前表单整体数据），<br/>formList（配置项列表），<br/>index(下标),<br/>e（输入的内容）<br/>that为当前组件实例 |
| formConfig.onBlur                | ({formData, formList, index, e}: any, *that*: any)=>{} | formData（当前表单整体数据），<br/>formList（配置项列表），<br/>index(下标),<br/>e（输入的内容）<br/>that为当前组件实例 |
| formConfig.onFocus               | ({formData, formList, index, e}: any, *that*: any)=>{} | formData（当前表单整体数据），<br/>formList（配置项列表），<br/>index(下标),<br/>e（输入的内容）<br/>that为当前组件实例 |
| formConfig.**elementAttributes** | element操作框原生属性                                  |                                                              |
| formConfig.syncResetFormData     | 异步设置表单中的值                                     | 假如搜索框内容默认值全部来源于接口<br>此时通过异步syncResetFormData = {name: 'xxx',age:xx}这将很用用 |

##### 预览

![](http://server.yuhongshao.cn/static/yuhongshao/20220909165442.png)

##### 详细事例

```js
  formConfig: IFormSearch[] = [
    {
      label: '公司',
      key: "company",
      type: "selectRemoteMethod",
      span: 6,
      multiple: true,
      collapseTags: true,
      loadApi: async (params) => {
        const data = await axios.post(url) || []
        return data;
      },
    },
    {
      label: '学校',
      key: "school",
      type: "radio",
      span: 6,
      multiple: true,
      collapseTags: true,
      value: 1,
      loadApi: [
          {label: '重庆大学', value: 1},
          {label: '北京大学', value: 2}
      ],
       onChange: ({formData, formList, index, e}: any, that: any)=>{
    	   that.formData['curShool'] = e;	
      }
    },
    {
        label: '当前学校',
        key: 'curSchool',
        type: 'input',
        span: 6,
        // 自定义element原生控制
        elementAttributes:{
            "show-password": true
        }
    }
        
   ];
```



### 其它问题

##### Q：两个及以上的搜索框依赖于同一个数据？ 

现有如下配置，公司1、公司2共同使用后台同一个接口，如果直接配置，会出现页面调用两次`http://xxx.com/list`

``````js
  formConfig: IFormSearch[] = [
    {
      label: 公司1,
      key: "company",
      type: "selectRemoteMethod",
      span: 6,
      multiple: true,
      collapseTags: true,
      loadApi: async (params) => {
        const data = await axios.post('http://xxx.com/list') || []
        return data;
      },
    },
    {
      label: 公司2,
      key: "company",
      type: "selectRemoteMethod",
      span: 6,
      multiple: true,
      collapseTags: true,
      loadApi: async (params) => {
        const data = await axios.post('http://xxx.com/list') || []
        return data;
      },
    }
   ]
``````



为避免这种情况，你可以调用代码如下

``````js
  formConfig: IFormSearch[] = [
    {
      label: 公司1,
      key: "company",
      type: "selectRemoteMethod",
      span: 6,
      multiple: true,
      collapseTags: true,
      loadApi: async (params) => {
        const data = await this.getList();
        return data;
      },
    },
    {
      label: 公司2,
      key: "company",
      type: "selectRemoteMethod",
      span: 6,
      multiple: true,
      collapseTags: true,
      loadApi: async (params) => {
        const data = await this.getList();
        return data;
      },
    }
   ]
  // data中定义存放变量
  companyList: any = [];

  public async getList(){
      // 已经存在,直接返回数据
      if(this.companyList){
          return this.companyList
      }
      // 不存在，请求接口
      const data  = await axios.post('http://xx.com/list');
      this.companyList = data;
      return data;
  }
``````



### 其它异常

由于工作原因测试不足，可能存在异常情况，如某些功能异常

如果你已经使用了这套组件遇到了问题，可通过QQ: 1045749725与我联系，我将尽量解决你的问题和补充所需功能

