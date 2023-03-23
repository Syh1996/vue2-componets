import Vue from 'vue'
import App from './App.vue'
import { Loading, MessageBox, Message, Notification } from 'element-ui';
import VueI18n from 'vue-i18n'
import 'normalize.css'; // css样式初始化
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import {zh} from '@lang/zh';
import {en} from '@lang/en';

Vue.config.productionTip = false
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$bus = new Vue();

Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
    ...en
  },
  zh: {
    ...zhLocale,
    ...zh
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', // 设置地区
  messages, // 设置地区信息
})


new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
