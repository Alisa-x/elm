<template>
        <div>
            <div class="header">
                <div class="bj">
                    <img src="http://fuss10.elemecdn.com/8/4e/74d994b2021e4bd186a8c59172d05png.png?imageMogr/format/webp/" alt="">
                    <span>
                    <img src="" alt="">
                </span>
                </div>
                <div class="info">
                    <p><span></span></p>
                    <ul>
                        <li></li><li></li><li></li>
                    </ul>
                    <p></p>
                    <div></div>
                </div>
            </div>

            <ul>
                <router-link tag="li" to="/particulars/1/menu">点餐</router-link>
                <router-link tag="li" to="/particulars/1/estimate">评价</router-link>
                <router-link tag="li" to="/particulars/1/shop">商家</router-link>
            </ul>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return {
                data:{},
            }
        },
        created(){
            axios.defaults.baseURL = 'http://localhost:9090';
            axios.get('/shop?id=1')
                .then((response)=>{
                    this.data=response.data[0];
                });
        },
    }
</script>

<style scoped>

</style>