<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      
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
/*用于清楚文档页面最后显示的代码*/
.demo-block+pre {
  display: none;
}
</style>
