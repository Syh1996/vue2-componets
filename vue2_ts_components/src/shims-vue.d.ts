declare module '*.vue' {
  import Vue from 'vue';
  export default Vue
}

declare module 'element-ui/*'
declare module '@lang/zh'
declare module '@lang/en'
declare module 'vue2_ts_components'


declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    $t: any
  }
}