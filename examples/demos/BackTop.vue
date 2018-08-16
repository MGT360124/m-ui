<template>
    <!--右下角返回顶部相关 start-->
    <a id="goTop" @click="backTop">Top</a>
</template>
<script>
export default {
    name: 'BackTop',
    data() {
        return {
            
        }
    },
    mounted() {
        window.onscroll = function () {
            if (window.pageYOffset > 80) {
                document.getElementById('goTop').style.display = 'block';
            } else {
                document.getElementById('goTop').style.display = 'none';
            }
            document.getElementById('goTop').style.top = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop) - 110 + 'px'
        }
    },
    methods: {
        backTop() {
            scrollTo(0, 0);
        }
    }
}
</script>
<style scoped>
/*右下角返回顶部样式*/

#goTop {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #4ea9ec;
    color: #fff;
    position: absolute;
    bottom: 30px;
    right: 30px;
    text-align: center;
    line-height: 50px;
    transition: all .3s;
    display: none;
    cursor: pointer;
}
</style>
