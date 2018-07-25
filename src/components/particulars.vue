<template>
        <div class="particulars">
            <div class="header">
                <div class="bj">
                    <img src="http://fuss10.elemecdn.com/8/4e/74d994b2021e4bd186a8c59172d05png.png?imageMogr/format/webp/" alt="">
                    <div>
                        <span>
                        <img :src="data.img" alt="">
                    </span>
                    </div>
                </div>
                <div class="info">

                    <h3>{{data.name}}</h3>
                    <ul>
                        <li>评价{{data.evaluate}}</li>
                        <li>月售{{data.sale}}</li>
                        <li>商家配送约送{{data.time}}分钟</li>
                    </ul>
                    <p>1.餐厅外送时间30分钟送达
                        2.大份订餐（20份以上），可提前一天进行预订
                        3.吉野家外送产品收取餐盒费，主餐产品收取1元，火锅产品收取3元
                        4.本店使用电子票据，请您按照收银条指引自行开票，谢谢 。
                    </p>
                    <div>
                        <span>{{data.hot[0].type}}</span>
                        {{data.hot[0].title}}
                        <span>{{data.hot.length}}个优惠 ▼</span>
                    </div>
                </div>
            </div>
            <ul>
                <router-link  tag="li" to="/particulars/1/menu">
                    <span>点餐</span>
                </router-link>
                <router-link tag="li" to="/particulars/1/estimate">
                    <span>评价</span>
                </router-link >
                <router-link tag="li" to="/particulars/1/shop">
                    <span>商家</span>
                </router-link>
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
                index:"0",
            }
        },
        created(){
            axios.defaults.baseURL = 'http://localhost:9090';
            axios.get('/shop?id='+this.$route.params.flag)
                .then((response)=>{
                    this.data=response.data[0];
                });
        },
    }
</script>

<style scoped lang="less">
    .particulars{
        height: 100%;
        .header{
            .bj{
                position: relative;
                height: 2.5rem;
                &>img{
                    margin-top: -.4rem;
                    height: 100%;
                    width: 100%;
                }
                div{
                    position: absolute;
                    width: 100%;
                    height: 84%;
                    top: 0;
                    left: 0;
                    background: rgba(0,0,0,0.2);
                    span{
                        position: absolute;
                        width: 2rem;
                        height: 2rem;
                        top: 30%;
                        left: 50%;
                        margin-left: -1rem;
                        box-shadow: 0px 1px 1px #ccc;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

            }

        }
        .info{
            h3{
                padding-top: .4rem;
                font-size: .6rem;
                line-height: .6rem;
                text-align: center;
            }
            ul{
                overflow: hidden;
                width: 5.8rem;
                margin: 0 auto;
                li{
                    list-style: none;
                    float: left;
                    font-size: .3rem;
                    line-height: 0.8rem;
                    padding-left: .3rem;
                }
                li:nth-child(1){
                    margin-left: -.3rem;

                }
            }
            p{
                width: 6.5rem;
                margin: 0 auto;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size: .3rem;
                color: #999;
                padding-bottom: .3rem;
            }
            div{
                width: 8rem;
                margin: 0 auto;
                font-size: .3rem;
                line-height: .8rem;
                padding: 0 .2rem;
                box-shadow: 0 0 2px rgba(200,200,200,.4);
                span:nth-child(1){
                    line-height: .3rem;
                    height: .8rem;
                    padding: 0 .1rem;
                    background: rgb(112, 188, 70);
                    color: #fff;

                }
                span:nth-child(2){
                    float: right;
                }
                margin-bottom: .4rem;
            }
        }
        &>ul{
            overflow: hidden;
            box-shadow: 0 2px 1px rgba(200,200,200,.2);
            li{
                float: left;
                width: 33.333%;
                text-align: center;
                span{
                    display: inline-block;
                    line-height: 1.2rem;
                    font-size: .45rem;
                    color: #666;
                    border-bottom: 0.04rem solid transparent;
                }
            }
            .router-link-active>span{
                border-bottom: 0.04rem solid #2395ff;
                font-weight: bolder;

            }

        }
    }

</style>