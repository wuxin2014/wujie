import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/dialog",
    name: "dialog",
    component: () => import(/* webpackChunkName: "Page1" */ "../views/Dialog.vue"),
  },
  {
    path: "/communication",
    name: "communication",
    component: () => import(/* webpackChunkName: "Page2" */ "../views/Communication.vue"),
  },
  {
    path: "/location",
    name: "location",
    component: () => import(/* webpackChunkName: "Page3" */ "../views/Location.vue"),
  },
  {
    path: "/pageTest",
    name: "pageTest",
    component: () => import(/* webpackChunkName: "pageTest" */ "../views/PageTest.vue"),
  },
];

export default routes;
