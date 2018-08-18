import Vue from 'vue'
import Router from 'vue-router'
import index from "../demos/index";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/alert",
      component:index
    },
    {
      name: "alert",
      path: "/alert",
      component: r => require.ensure([], () => r(require('../docs/alert.md')))
    },
    {
      name: "button",
      path: "/button",
      component: r => require.ensure([], () => r(require('../docs/button.md')))
    },
    {
      name: "card",
      path: "/card",
      component: r => require.ensure([], () => r(require('../docs/card.md')))
    }
  ]
})
