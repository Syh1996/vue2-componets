import FormItemGroup from '@Components/formItemGroup.vue';
import InputMoney from '@Components/InputMoney.vue';
import RemoteMethodSelect from '@Components/remoteMethodSelect.vue';
import ItemTitle from '@Components/table-title.vue';
import Table from '@Components/table.vue';
import Upload from '@Components/upload.vue';
import { zh } from '@lang/zh';
import { en } from '@lang/en';
import {  Message, Loading } from 'element-ui';
const langData = {
    CN: zh,
    EN: en
}
const componenList = [FormItemGroup, InputMoney, RemoteMethodSelect, ItemTitle, Table, Upload];
const install = (Vue,options) => {
    options.lang = options.lang || 'lang';
    let currentLang = localStorage.getItem(options.lang) || 'CN';
    if(!['CN','EN'].includes(currentLang)){
        currentLang = 'CN'
    }
    Vue.use(Loading.directive)
    Vue.prototype.$bus = new Vue();
    Vue.prototype.$lang =currentLang;
    Vue.prototype.$message = Message;
    Vue.prototype.$t = key=>{
        return langData[currentLang][key] || key;
    }
    componenList.forEach(item => {
        Vue.component(item.name, item);
    })
}
export default install;