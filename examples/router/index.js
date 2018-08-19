import Vue from 'vue'
import Router from 'vue-router'
import Login from "../demos/login.vue"
import Index from "../demos/index.vue";
Vue.use(Router)
console.log(Index)
export default new Router({
  routes: [
    {
      name:"page",
      path:"/",
      component:Login
    },
    { 
      name:'index',
      path: "/index",
      component: Index,
      children:[
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
    }
   ]
})
