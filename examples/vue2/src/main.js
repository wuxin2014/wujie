import "core-js/modules/es.array.find";

import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import VueRouter from "vue-router";
import { Scrollbar, Tag, Button, Select, Option, Popover, Dialog, Cascader, DatePicker, Form, FormItem, Row, Col, Input, Table, TableColumn, Autocomplete } from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import AButton from "ant-design-vue/es/button";
import ASelect from "ant-design-vue/es/select";
import AModal from "ant-design-vue/es/modal";
import APopover from "ant-design-vue/es/popover";
import "./pageLifeTest";
import "ant-design-vue/es/style/index.css";
import "ant-design-vue/es/button/style/index.css";
import "ant-design-vue/es/select/style/index.css";
import "ant-design-vue/es/modal/style/index.css";
import "ant-design-vue/es/popover/style/index.css";
import "./index.css";
import LoadingPlugin from './components/loading';
Vue.use(LoadingPlugin);

const base = process.env.NODE_ENV === "production" ? "/demo-vue2/" : "";
[Scrollbar, Tag, Button, Select, Option, Popover, Dialog, Cascader, DatePicker, Form, FormItem, Row, Col, Input, Table, TableColumn, Autocomplete].forEach((element) => Vue.use(element));

[AButton, ASelect, AModal, APopover].forEach((element) => Vue.use(element));

Vue.use(VueRouter);

Vue.config.productionTip = false;
debugger
if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    document.documentElement.classList.add('iframeOnlineWeb')
    const router = new VueRouter({ base, routes });
    instance = new Vue({ router, render: (h) => h(App) }).$mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.$destroy();
  };
} else {
  new Vue({ router: new VueRouter({ base, routes }), render: (h) => h(App) }).$mount("#app");
}
