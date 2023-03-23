<template>
  <section :class="['form-item-group', language === 'EN' ? 'EN' : 'CN']">
    <el-row>
      <el-col
        :span="item.span || 8"
        v-for="(item, index) in formList"
        :key="index"
      >
        <!-- input-->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'input'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-input
              :id="'input' + index"
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              :placeholder="
                item.placeholder ||
                (item.type === 'input'
                  ? ($t('placeInputInfo')+ item.label)
                  : ($t('placeSelect') +item.label))
              "
              :clearable="item.clearable || true"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
              @focus="
                (e) =>
                  itemEvent(item, 'onFocus', { formData, formList, index, e })
              "
            />
          </div>
        </div>

        <!--  select -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'select'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-select
              :id="'input' + index"
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              :placeholder="
                item.placeholder || item.type === 'input'
                  ? ($t('placeInputInfo')+ item.label)
                  : ($t('placeSelect')+item.label)
              "
              filterable
              :multiple="item.multiple"
              :collapse-tags="item.collapseTags "
              :collapse-tags-tooltip="item.collapseTagsTooltip "
              :clearable="item.clearable || true"
              :remote-method="
                (text) =>
                  item.remoteMethod
                    ? item.remoteMethod(formList, index, text)
                    : {}
              "
              remote
              reserve-keyword
              :loading="item.loading"
              :loading-text="$t('loading')"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
              @focus="
                (e) =>
                  itemEvent(item, 'onFocus', { formData, formList, index, e })
              "
            >
              <el-option
                v-for="(opt, index) in item.options"
                :key="index"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </div>
        </div>

        <!--  selectAsync -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'selectAsync'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-select
              :id="'input' + index"
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              :placeholder="
                item.placeholder || item.type === 'input'
                  ? ($t('placeInputInfo')+ item.label)
                  : ($t('placeSelect')+item.label)
              "
              filterable
              :clearable="item.clearable || true"
              :multiple="item.multiple"
              :collapse-tags="item.collapseTags "
              :collapse-tags-tooltip="item.collapseTags "
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
              @focus="
                (e) =>
                  itemEvent(item, 'onFocus', { formData, formList, index, e })
              "
            >
              <el-option
                v-for="(opt, index) in item.options"
                :key="index"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </div>
        </div>

        <!--  selectRemoteMethod -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'selectRemoteMethod'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-select
              :id="'input' + index"
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              :placeholder="item.placeholder || ($t('placeInputInfo')+ item.label)"
              filterable
              remote
              :clearable="item.clearable || true"
              :multiple="item.multiple"
              :collapse-tags="item.collapseTags "
              
              :remote-method="(query) => item.remoteMethod(query, item)"
              :loading="item.loading"
              @change="
                (e) =>{recordSelectedOptions(item),itemEvent(item, 'onChange', { formData, formList, index, e })}
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
              @focus="
                (e) =>
                  itemEvent(item, 'onFocus', { formData, formList, index, e })
              "
            >
              <el-option
                v-for="(opt) in item.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </div>
        </div>

        <!--  radio -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'radio'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-radio-group
              :id="'input' + index"
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
            >
              <el-radio
                :label="opt.value"
                v-for="opt in item.options"
                :key="opt.value"
                >{{ opt.label }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>

        <!--  checkbox -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'checkbox'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-checkbox-group
              :id="'input' + index"
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
            >
              <el-checkbox
                :label="cur.value"
                :disabled="cur.disabled"
                v-for="cur in item.options"
                :key="cur.value"
              >
                {{ cur.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--  date -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'date'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-date-picker
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              type="date"
              :placeholder="item.placeholder || $t('placeSelectDate')"
              :format="item.format || 'yyyy-MM-dd'"
              :picker-options="{ disabledDate: item.disabledDate || true }"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
            />
          </div>
        </div>

        <!--  month -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'month'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-date-picker
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              type="month"
              :placeholder="item.placeholder || $t('placeSelectDate')"
              :format="item.format || 'yyyy-MM'"
              :value-format="item.valueFormat || 'yyyy-MM'"
              :picker-options="{ disabledDate: item.disabledDate || true }"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
            />
          </div>
        </div>

        <!--  date范围 -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'dateRange'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-date-picker
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              type="daterange"
              :start-placeholder="item.startPlaceholder || $t('startDate')"
              :end-placeholder="item.endPlaceholder || $t('endDate')"
              :format="item.format || 'yyyy-MM-dd'"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              :picker-options="item.shortcuts || shortcutsDate"
              :range-separator="item.rangSeparator || '-'"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
            />
          </div>
        </div>

        <!--  dateTime -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'dateTime'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-date-picker
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              type="datetime"
              :placeholder="item.placeholder || $t('placeSelectTime')"
              :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
            />
          </div>
        </div>

        <!--  datetimerange -->
        <div
          :class="[
            'input-group',
            'custorm-class-' + index,
            item.textAlign ? `text-${item.textAlign}` : 'text-right',
            item.emptyValueAnimate ? 'emptyValueAnimate' : '',
          ]"
          v-if="item.type === 'dateTimeRange'"
        >
          <label
            :title="item.label"
            :class="item.require ? 'require' : ''"
            :for="'input' + index"
            :style="{
              flex: item.labelWidth,
            }"
            >{{ item.label }}：</label
          >
          <div
            class="input-bar"
            :style="{
              flex: item.formItemWidth ? `0 0 ${item.formItemWidth}px` : 1,
            }"
          >
            <el-date-picker
              :size="item.size || 'small'"
              v-model="formData[item.key]"
              type="datetimerange"
              :start-placeholder="item.startPlaceholder || $t('startDate')"
              :end-placeholder="item.endPlaceholder || $t('endDate')"
              :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
              :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :picker-options="item.shortcuts || shortcutsTime"
              :range-separator="item.rangSeparator || '-'"
              @change="
                (e) =>
                  itemEvent(item, 'onChange', { formData, formList, index, e })
              "
              @blur="
                (e) =>
                  itemEvent(item, 'onBlur', { formData, formList, index, e })
              "
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <slot :search="search" :reset="reset"></slot>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";
import {
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Option,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "element-ui";
import { IFormSearch } from '@/ts/comm'
interface IShortCutsTypeChild {
  text: string;
  onClick: (picker: any) => void;
}
interface IShortCutsType {
  shortcuts: IShortCutsTypeChild[];
}
@Component({
  name: 'FormItemGroup',
  components: {
    "el-row": Row,
    "el-col": Col,
    "el-input": Input,
    "el-select": Select,
    "el-date-picker": DatePicker,
    "el-option": Option,
    "el-radio": Radio,
    "el-radio-group": RadioGroup,
    "el-checkbox": Checkbox,
    "el-checkbox-group": CheckboxGroup,
  },
})
/** 搜索类 */
export default class FormGroup extends Vue {
  @Prop({ default: [] }) formConfig!: any;
  @Prop({ default: () => {} }) syncResetFormData?: any;
  // 表格配置项
  formList: any = [];
  // 表单数据
  formData: any = {};
  // 语言
  language: string = "CN";
  // 日期设置
  shortcutsDate: IShortCutsType = {
    shortcuts: [
      {
        text: (this as any).$t("threeDay") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date(Date.now() - 3 * 86400000);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("oneWeek") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date(Date.now() - 7 * 86400000);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("fixteenDay") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date(Date.now() - 15 * 86400000);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("oneMonth") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 1);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("threeMonth") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 3);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("sixMonth") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 6);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("oneYear") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 1);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("twoYear") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 2);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("threeYear") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 2);
          picker.$emit("pick", [start, end]);
        },
      },
    ],
  };
  // 时间设置
  shortcutsTime: IShortCutsType = {
    shortcuts: [
      {
        text: (this as any).$t("currentDay") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date(Date.now() - 1 * 86400000);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("threeDay") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date(Date.now() - 3 * 86400000);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("oneWeek") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date(Date.now() - 7 * 86400000);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("oneMonth") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 1);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("threeMonth") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 3);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("sixMonth") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 6);
          picker.$emit("pick", [start, end]);
        },
      },
      {
        text: (this as any).$t("oneYear") as string,
        onClick: (picker) => {
          const end = new Date();
          const start = new Date();
          start.setFullYear(start.getFullYear() - 1);
          picker.$emit("pick", [start, end]);
        },
      },
    ],
  };
  // 必填项
  requireKey: any = {};
  // 记录多选时已经选中的列表
  recordSelectedList:any =  {}

  /** created */
  public created() {
    console.log(this);
    const language: string = 'zh';
    this.language = language;
    this.formList = this.formConfig.map((item: any) => {
      item.span =
        language === "EN" && item.span && item.span < 8 ? 8 : item.span;
      item.labelWidth =
        item.labelWidth || item.labelWidth === 0
          ? `0 0 ${item.labelWidth}px`
          : language === "EN"
          ? "0 0 170px"
          : "0 0 120px";
      item.onChange = item.onChange || this.defaultFunction;
      item.onBlur = item.onBlur || this.defaultFunction;
      item.onFocus = item.onFocus || this.defaultFunction;
      if (item.type === "selectRemoteMethod") {
        item.remoteMethod =
          item.remoteMethod ||
          (async (query: string, itemConfig: any) => {
            if(!query){
              return;
            }
            const arr = [...this.formList];
            for (let i in arr) {
              const currentEachConfig = arr[i];
              if (currentEachConfig.key === itemConfig.key) {
                currentEachConfig.loading = true;
                const result: any = await item.loadApi({
                  msg: query,
                }) || [];
                const recordSelectedList = this.recordSelectedList[itemConfig.key] || [];
                const recordSelectedListValues = Array.from(recordSelectedList,(cur: any)=>cur.value);
                const deleteFullArray = result.filter((cur: any)=>!recordSelectedListValues.includes(cur.value))
                const allArray = [...deleteFullArray,...recordSelectedList];
                // const allArray = [...recordSelectedList,...deleteFullArray];
                currentEachConfig.options = allArray;
                currentEachConfig.loading = false;
              }
            }
            this.formList = arr;
          });
      }
      if (item.require) {
        this.requireKey[item.key] = true;
      }

      return item;
    });
    this.formList.forEach((cur: any) => {
      if (["checkbox"].includes(cur.type)) {
        this.$set(this.formData, cur.key, cur.value || []);
      } else {
        this.$set(this.formData, cur.key, cur.value || "");
      }
    });
  }
  /** mounted */
  public async mounted() {
    const arr = [...this.formList];
    for (let i in arr) {
      const cur = arr[i];
      if (cur.loadApi && cur.loadApi instanceof Function) {
        if (cur.type === "selectAsync") {
          cur.options = await cur.loadApi();
        }
      }
    }
    this.formList = arr;
  }
  /** 默认函数  */
  public defaultFunction() {
    return "no event";
  }
  /** 
   * 记录选中的options
   */
  public recordSelectedOptions(item: any){
    const arr = item.options.filter((cur: any)=>this.formData[item.key].includes(cur.value));
    const originItemKeyArray = this.recordSelectedList[item.key] ? this.recordSelectedList[item.key]: [];
    const deleteFullArrayString = [...new Set(Array.from([...originItemKeyArray,...arr],cur=>JSON.stringify(cur)))];
    const deleteFullArray = Array.from(deleteFullArrayString,cur=>JSON.parse(cur));
    this.recordSelectedList = {
      [item.key]: deleteFullArray
    }
   
  }
  /** 调配置项item event */
  public itemEvent(
    item: any,
    eventType: "onChange" | "onBlur" | "onFocus",
    config: any
  ) {
    item[eventType](config, this);
  }
  /** 获取查询时的参数 */
  public getBtnClickArguments(type: "search" | "reset") {
    return { type, data: this.getFormData() };
  }
  /** 搜索  */
  public search() {
    const data: any = this.getBtnClickArguments("search");
    const requireDataIsok: boolean = Object.keys(this.requireKey).every(
      (item: string) => {
        return data.data[item] || data.data[item] === 0;
      }
    );
    // 初始化
    this.formList = this.formList.map((item: any) => {
      if (item.require) {
        item.emptyValueAnimate = false;
      }
      return item;
    });
    if (!requireDataIsok) {
      // 增加红色必填提示
      setTimeout(() => {
        this.formList = [...this.formList].map((item: any) => {
          const value: string | number = data.data[item.key];
          if (item.require && !value && value !== 0) {
            item.emptyValueAnimate = true;
          } else if (item.require) {
            item.emptyValueAnimate = false;
          }
          return item;
        });
      }, 0);
      return;
    }

    this.$emit("getFormData", data);
    (this as any).$bus.$emit("clearTableTr");
    return data;
  }
  /** 重置 */
  public reset() {
    this.formList = this.formList.map((item: any) => {
      item.value = "";
      if (item.require) {
        item.emptyValueAnimate = false;
      }
      return item;
    });

    for (let key in this.formData) {
      this.formData[key] = "";
    }
    const data: any = this.getBtnClickArguments("reset");
    const requireDataIsok: boolean = Object.keys(this.requireKey).every(
      (item: string) => {
        return data.data[item] || data.data[item] === 0;
      }
    );
    if (!requireDataIsok) {
      return;
    }
    this.$emit("getFormData", data);
    (this as any).$bus.$emit("clearTableTr");
    return data;
  }

  // 获取参数数据
  public getFormData() {
    let data: any = { ...this.formData };
    const obj: any = {};
    for(let i in data){
        const cur = data[i];
        if(Array.isArray(cur)){
            obj[i] = cur.join(',')
        }else{
          obj[i] = cur;
        }
    }
    // 处理数据
    return obj;
  }
  /** 实时监听上传父组件当前搜索条件 */
  @Watch("formData", { deep: true, immediate: true }) getCurrentFormData(
    newVal: any
  ) {
    this.$emit("watchFormData", newVal);
  }
  /** 监听父组件传入的绑定值，用于重置搜索框内容 */
  @Watch("syncResetFormData", { deep: true }) resetFormDataChange(newVal: any) {
    if (newVal.constructor !== Object) {
      throw "重置formItemGroup.vue子组件搜索框内容时，只能传入一个对象";
    }
    const opt: any = {};
    for (let i in newVal) {
      if (this.formData.hasOwnProperty(i)) {
        opt[i] = newVal[i];
      }
    }
    this.formData = { ...this.formData, ...opt };
  }
}
</script>

<style lang="less">
@import "@less/formItemGroup.less";
</style>
