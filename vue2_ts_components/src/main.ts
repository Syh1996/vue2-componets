import Vue from 'vue'
import App from './App.vue'

import 'vue2_ts_components/dist/app.css';
import vue2TSComponent from 'vue2_ts_components';

Vue.use(vue2TSComponent);
new Vue({

  render: h => h(App),
}).$mount('#app')
