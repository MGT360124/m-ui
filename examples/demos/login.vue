<template>
  <div class="wrapper">
       <div class="desc">基于vue的组件库</div>
      <div class="box">
          <div class="github">
              <m-button round @click="goToGithub">github</m-button>
          </div>
          <div class="mui">
              <m-button type="primary" round  @click="goToMui">mui</m-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
      data(){
          return{

          }
      },
      methods:{
          goToGithub(){
              window.open("https://github.com/MGT360124/m-ui")
          },
          goToMui(){
              this.$router.push({path:"/index"})
          }
      }
}
</script>
<style scoped>
.wrapper{
    width:100%;
    height: 100%;
    background-image: url("../assets/images/bg2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.desc{
    width:50%;
    height:40%;
    margin: auto;
    text-align: center;
    padding-top:10%;
}
.box{
    width:100%;
    height:60%;
    padding-top:3%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.github{
    margin-right:200px;
}
</style>