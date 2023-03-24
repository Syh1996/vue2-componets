## 使用说明

### 使用背景

`vue2_ts_component` 基于vue2.x + vue-property-decorator + vue-i18n 完成搭建。

使用建议为：项目为**vue2版本** ， 需要支持**国际化** ，项目为**TS**

如果不是上述条件，不建议使用。然而安装所需组件后，依然可以正常使用，只是使用这套组件会造成项目略显臃肿。如你安装了多余的 `ts`  `vue-i18n`

组件主要为系统管理产品提供较快封装组件。

### 开始

#### 安装

```tex
npm i vue2_ts_components
npm i vue-i18n@8.28.2  
```

#### 配置使用

```js
import 'vue2_ts_components/dist/app.css';
import {en} from 'vue2_ts_components/src/lang/en'; // 组件内部国际化
import {zh} from 'vue2_ts_components/src/lang/zh'; // 组件内部国际化
import vue2TSComponent from 'vue2_ts_components';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(vue2TSComponent);


const messages = {
  en: {
    ...en,
    // 扩展你自己的国际化英文
  },
  zh: {
    ...zh，
   // 扩展你自己的国际化英文
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', // 设置地区
  messages, // 设置地区信息
})


const data = new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
```



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
<table-title title="查询条件" themeColor="orange"></table-title>
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
 <pagination :config="config" @getPaginationData="getPaginationData">
 </pagination>
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

| 参数         | 说明                                        | 默认值              |
| ------------ | ------------------------------------------- | ------------------- |
| title        | 上传按钮展示的文字                          | string              |
| disabled     | 上传按钮是否禁用                            | boolean型           |
| fn           | 导入调用的接口请求                          | Function型          |
| config.total | 数据总数                                    | Number型，默认值：0 |
| callBack     | 回调函数，文件上传完成 后返回接口返回的数据 | Function型          |

##### 预览

![http://server.yuhongshao.cn/static/yuhongshao/20230324141835.png](http://server.yuhongshao.cn/static/yuhongshao/20230324141835.png)





#### 金额输入框

与普通输入框相同，在此增加千分位展示

``````html
<MoneyInput v-model="money"></MoneyInput>
``````



### 其它问题
