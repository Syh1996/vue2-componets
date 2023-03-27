import Vue from 'vue'
import App from './App.vue'
import { Loading, MessageBox, Message, Notification } from 'element-ui';

import 'normalize.css'; // css样式初始化
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import {zh} from '@lang/zh';
import {en} from '@lang/en';
import Upload from '@Components/upload.vue';
Vue.component(Upload.name,Upload);
Vue.config.productionTip = false
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.use(Loading.directive)
Vue.prototype.$bus = new Vue();
const langData: any = {
  CN: zh,
  EN: en
};
let currentLang: string = localStorage.getItem('lang') || 'CN';
if(!['CN','EN'].includes(currentLang)){
    currentLang = 'CN'
}
Vue.prototype.$lang = currentLang;
Vue.prototype.$t = (key : string)=>{
  return langData[currentLang][key] || key;
}





new Vue({

  render: h => h(App),
}).$mount('#app')
