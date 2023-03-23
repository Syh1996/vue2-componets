import 'normalize.css'; // css样式初始化
import 'element-ui/lib/theme-chalk/index.css';
import FormItemGroup from '@Components/formItemGroup.vue';
import InputMoney from '@Components/InputMoney.vue';
import RemoteMethodSelect from '@Components/remoteMethodSelect.vue';
import ItemTitle from '@Components/table-title.vue';
import Table from '@Components/table.vue';
import Upload from '@Components/upload.vue';
import { Loading, MessageBox, Message, Notification } from 'element-ui';



const componenList = [FormItemGroup, InputMoney, RemoteMethodSelect, ItemTitle, Table, Upload];
const install = (Vue) => {
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
    Vue.prototype.$bus = new Vue();

    
    componenList.forEach(item => {
        Vue.component(item.name, item);
    })
}
export default install;


