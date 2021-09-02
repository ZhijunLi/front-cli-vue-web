import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import request from './api/request'
import api from './api'
import setting from "@/settings";
import 'vant/lib/index.css';
import '@/assets/css/reset.css'
import "@/assets/css/app.scss"
import "@/assets/css/vant.scss"

import 'lib-flexible'

// 按需加载Vant UI
import { Form, Field, Sidebar, SidebarItem, Button, Icon, Switch, Tabbar, TabbarItem, Image as VanImage, Overlay,
  Area, Tab, Tabs, TreeSelect, Swipe, SwipeItem, Loading, PullRefresh, List, Lazyload , NavBar, Toast, Notify } from 'vant';
import 'vant/lib/toast/style';
Vue.use(Form);
Vue.use(Field);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Switch);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Overlay);
Vue.use(Area);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(TreeSelect);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Lazyload);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Notify);




import * as filters from './filters' // global filters

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use({
  install(Vue) {
    Vue.prototype.$request = request;
    Vue.prototype.$api = api;
    // 配置项
    Vue.prototype.$setting = setting
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
