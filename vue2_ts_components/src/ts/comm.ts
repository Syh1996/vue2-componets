import { LocaleMessages } from "vue-i18n";

/** 分页类型 */
export interface IPagination {
    currentPage: number;
    pageSize: number;
    total: number
}

/** 查询数据 */
export interface ISearch {
    type: string;
    data: any
}

/** 表格总体配置 */
export interface ITableConfig {
    /** 是否有border边线 */
    border?: boolean;
    /** 是否有隔行纹理 */
    stripe?: boolean;
    /** 表格最大高度,超过时将出现滚动条  默认"800px"*/
    maxHeight?: number;
    /** 是否带有选择框，默认true */
    selection?: boolean;
    tableLayout?: string;
    selectionFixed?: 'left' | 'right' | boolean ,
    /**
     * @param { row }   当前行数据
     */
    rowClassName?: (row: any) => string;
    /**
     * @param { index }  当前下标 ，0-N
     */
    indexMethod?: (index: number) => string | number;
    /**
     * @param { row }  当前行数据
     */
    cellClassName?: (row: any) => string;
    /** 是否带有分页组件  默认true */
    showPagination?: boolean;
    /** 是否带有下标序号列  默认true */
    showIndex?: boolean;
    /** 自定义表格class */
    custormClass?: string;
    /**
     * @param { row }  当前行数据
     * @param { index }  当前下标
     */
    selectable?:  (row?: any,index?: number)=>  boolean;

}

type IPosition = "left" | "right";
/** 单元格配置 */
export interface ITableColumnConfig {
    /** 标题 */
    title: string | LocaleMessages;
    /** 绑定的属性，需要展示的值 字段 */
    key: string;
    /** 是否带有排序功能 */
    sortable?: boolean;
    /** 单元格宽度 */
    width?: string | number;
    /** 是否固定当前列，取值 left | right */
    fixed?: IPosition;
    /** 是否是金额，true会将数字转千分位展示 */
    isMoney?: boolean

}

export interface IOptions {
    label: string;
    value: string | number;
}

type ITextAlign = "left" | "right" | "center";
type IFormItemType = "input" | "select" | "selectAsync" | "radio" | "checkbox" | "date" | "dateRange" | "dateTime" | "dateTimeRange" | "month" | "selectRemoteMethod";
type ISize = "small" | "medium" | "mini";
/** 搜索 框类型 */
export interface IFormSearch {
    /** label名 */
    label: string | LocaleMessages;
    /** 绑定的属性名 */
    key: string;
    /** 操作框类型 */
    type: IFormItemType;
    /** 提示文字 */
    placeholder?: string;
    /** 是否带有清除按钮功能 */
    clearable?: boolean;
    /** 占位栅格长度，取值1-24 */
    span?: number;
    /** 同步下拉选择框时 select>option值集 */
    options?: IOptions[];
    /** label对齐方式，左、中、右？  默认右*/
    textAlign?: ITextAlign;
    /** label占用长度 */
    labelWidth?: number;
    /** 操作框占用长度 */
    formItemWidth?: number;
    /** 下拉框多选时，是否折叠选中的列表项，true防止溢出文本框 */
    collapseTags?: boolean;
    /** 日期、时间范围选择框时，选择范围时的分隔符 */
    rangSeparator?: string;
    /** 是否支持多选   默认false*/
    multiple?: boolean,
    /**  */
    collapseTagsTooltip?: boolean,
    /** 异步请求接口获取select值集时，return子集 */
    loadApi?: (params?: any) => any;
    /** 时间、日期范围选择时，开始时间的placeholder */
    startPlaceholder?: string;
    /** 时间、日期范围选择时，结束时间的placeholder */
    endPlaceholder?: string;
    /** 时间、日期选中时值格式，默认yyyy-MM-dd  */
    valueFormat?: string;
    /** 初始绑定的值 */
    value?: string;
    /** 操作框大小，默认small */
    size?: ISize;
    /** 是否必填，必填时会label前带*号，且为空时不会向父组件传递自定义事件 */
    require?: boolean;
    /**
     * @param { config }       formData（当前表单整体数据），formList（配置项列表），index(下标),e（输入的内容）
     * @param { that }   查询组件的this实例
     */
    onChange?: ({formData, formList, index, e}: any, that: any ) => void;
    /**
     * @param { config }       formData（当前表单整体数据），formList（配置项列表），index(下标),e（输入的内容）
     * @param { that }   查询组件的this实例
     */
    onBlur?: ({formData, formList, index, e}: any, that: any) => void;
     /**
     * @param { config }       formData（当前表单整体数据），formList（配置项列表），index(下标),e（输入的内容）
     * @param { that }   查询组件的this实例
     */
    onFocus?: ({formData, formList, index, e}: any, that: any) => void;
    /** 日期禁用配置 */
    disabledDate?: (cur: Date)=> boolean;
}

export type IHandle = "edit" | "add" | "";

export interface IResponse {
    code: string;
    data: any;
    message: string
}