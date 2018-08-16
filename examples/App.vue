<template>
  <div id="app">
    <header class="header">
      m-ui
    </header>
     <div class="container page-container page-component">
      <div class="nav m-col m-col-24 m-col-xs-24 m-col-sm-6">
        <li class="nav-item" v-for="item in items" :key="item.id">
          <router-link :to="{path: item.path}">
            <span @click="goTop">{{item.name}}</span>
          </router-link>
        </li>
      </div>
      <div class="m-col m-col-24 m-col-xs-24 m-col-sm-18 page-content">
        <router-view></router-view>
      </div>
    </div>
     <BackTop></BackTop>
  </div>
</template>

<script>
import BackTop from './demos/BackTop'
export default {
  name: 'App',
  data(){
    return {
      items: [
        {path:"/test",name:"MAlert"},
      ]
    }
  },
  components:{
    BackTop,
  },
  methods:{
    goTop(){
      scrollTo(0, 0);
    }
  },
  updated() {
    // 切换不同组价页面的时候给section添加class="content"，用来显示表格
    if (document.getElementsByTagName('section').length != 0) {
      document.getElementsByTagName('section')[0].setAttribute('class', 'content');
    }
  }
}
</script>

<style>
/*start 作为调节展示页面的布局*/

.item-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 400;
  border-top: 1px solid #eee;
  padding-top: 10px;
}







/*end*/

* {
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
}

.header {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  /*background-color: #00a4af;*/
  background-color: #14ad993d;
  color: #fff;
}

.container {
  /*display: flex;*/
  padding: 55px 95px 30px 30px;
  min-height: 100%;
}

.container:before,
.container:after {
  display: table;
  content: '';
  clear: both;
}

.nav-item {
  font-size: 16px;
  color: #5e6d82;
  line-height: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: block;
  position: relative;
  transition: all .3s;
}

.page-content h3 {
  margin: 35px 0 15px;
}

.page-content h2 {}

.page-content p {
  margin: 14px auto;
}



/*用于清楚文档页面最后显示的代码*/

.demo-block+pre {
  display: none;
}
</style>
