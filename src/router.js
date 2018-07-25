import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import home from "./components/home"
import find from "./components/find"
import order from "./components/order"
import my from "./components/my"
import particulars from "./components/particulars"
import menu from "./components/details/menu"
import estimate from "./components/details/estimate"
import shop from "./components/details/shop"
export default new Router({
  routes: [
      {path:"/home",component:home},
      {path:"/find",component:find},
      {path:"/order",component:order},
      {path:"/my",component:my},
      {path:"/particulars/:flag",component:particulars,
          children:[
          {path:"menu",component:menu},
          {path:"estimate",component:estimate},
          {path:"shop",component:shop}
      ]
      },
      {path:"*",redirect:"/home"},

  ]
});
