<template>
    <div class="menu">
        <div class="left">
            <div ref="left">
                <div class="left_main" ref="leftMain">
                    <ul>
                        <li v-for="(commodity,index) in data.commodity" :class="{flag:flag===index}" @click="clickLi(index)">{{commodity.title}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right" ref="right">
            <div class="right_main" ref="rightMain">
                <dl v-for="(commodity,index) in data.commodity" ref="oDl" >
                    <dt>{{commodity.title}}</dt>
                    <dd v-for="(commoditys,item) in commodity.commoditys">
                        <img :src="commoditys.img" alt="">
                        <div>
                            <h4>{{commoditys.name}}</h4>
                            <p>{{commoditys.describe}}</p>
                            <p>
                                <span>月售{{commoditys.Sales}}份</span>
                                好评率{{commoditys.estimate}}%
                            </p>
                            <div>
                                <span>￥{{commoditys.price}}</span>
                                <em>
                                    <i class="iconfont icon-jian-copy" v-show="cart.commodity[index].commoditys[item].flag"></i>
                                    {{cart.commodity[index].commoditys[item].num===0?"":cart.commodity[index].commoditys[item].num}}
                                    <i class="iconfont icon-wuuiconxiangjifangda" @click="add(index,item)"></i>
                                </em>
                            </div>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="footer">
            <div class="icon">
                <div>
                    <i class="iconfont icon-ziyuan"></i>
                </div>
            </div>
            <div class="carriage">
                <p>
                    未选购商品
                </p>
                <p>
                    另需配送费8元
                </p>
            </div>
            <div class="footer_right">
                ￥30起送
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "order",
        data(){
            return {
                data:null,
                distance:0,
                flag:0,
                timer:null,
                cart:null,
            }
        },
        created(){
            this.cart = JSON.parse(window.localStorage.getItem("cart"));
            this.cart && (this.cart = this.cart.filter((item)=>{
                return item.id===this.$route.params.flag;
            })[0]);
            console.log(this.cart);

            axios.defaults.baseURL = 'http://localhost:9090';
            axios.get('/detail?id='+this.$route.params.flag)
                .then((response)=>{
                    this.data=response.data[0];


                    //初始化本地数据
                    if(!this.cart){
                        let temp1 = {
                            id:this.data.id,
                            name:this.data.name,
                            flag:false,
                            commodity:[],
                        }
                        this.data.commodity.forEach((items,indexs)=>{
                            let temp2 = {
                                flag:false,
                                commoditys:[],
                            };
                            items.commoditys.forEach((item,index)=>{
                                let temp3 = {
                                    flag:false,
                                    price:item.price,
                                    num:0,
                                    name:item.name,
                                };
                                temp2.commoditys.push(temp3)
                            });
                            temp1.commodity.push(temp2)
                        });
                        this.cart=temp1;
                    }
                });
        },
        updated(){
            this.$refs.right.onscroll=()=>{
                let scrollbar = this.$refs.right.scrollTop;

                let leftLength = this.$refs.leftMain.clientHeight-this.$refs.left.clientHeight;
                let rightLength = this.$refs.rightMain.clientHeight-this.$refs.right.clientHeight;
                let rightPct = scrollbar/(this.$refs.rightMain.clientHeight-this.$refs.right.clientHeight);
                this.$refs.left.scrollTop = leftLength*rightPct;
                //左右滚动条绑定
                if(scrollbar > this.distance){
                    document.body.scrollTop= document.body.scrollTop+(scrollbar-this.distance);
                    document.documentElement.scrollTop = document.documentElement.scrollTop +(scrollbar-this.distance);
                }
                this.distance = scrollbar;
                //主滚动条和右副滚动条绑定
                [...this.$refs.oDl].some((item,index,ary)=>{
                    let top = item.offsetTop-1;
                    let bot = item.offsetTop + item.clientHeight-1;
                    if(top<=scrollbar&&scrollbar<bot){
                        rightLength < scrollbar+10 ? this.flag=ary.length-1 : this.flag = index;
                        return true
                    }

                });
                //右滚动条左边类名绑定
            }
        },
        methods:{
            clickLi(index){
                this.animated(index,500)
            },
            animated(index,time1){
                let time2 = 0;
                let scrollTop1 = this.$refs.oDl[index].offsetTop-this.$refs.right.scrollTop;
                let scrollTop2 = this.$refs.right.scrollTop;
                clearInterval(this.timer);
                 this.timer = setInterval(()=>{
                    time2+=17;
                    if(time2>time1){
                        clearInterval(this.timer);
                        this.$refs.right.scrollTop = this.$refs.oDl[index].offsetTop;
                    }else{
                        this.$refs.right.scrollTop = scrollTop2+scrollTop1*(time2/time1);
                    }

                },17)
            },
            add(index,item){
                console.log(this.cart.commodity[index].commoditys[item]);
            },
        },
        computed:{

        },
        watch:{
            cart:{
                handler(){
                    let temp = JSON.parse(window.localStorage.getItem("cart"));
                    temp || (temp = []);
                    temp && (temp=temp.filter((item)=>item.id!==this.$route.params.flag));
                    temp.push(this.cart);
                    window.localStorage.setItem("cart",JSON.stringify(temp));
                },
                deep: true
            }
        },

    }
</script>

<style scoped lang="less">
    .menu{
        height: 92%;
        overflow: hidden;
        &>div{
            height: 93%;
            float: left;
        }
        .left{
            width: 2.2rem;
            overflow: hidden;
            &>div{
                width: 2.4rem;
                height: 100%;
                overflow-y: scroll;
                background: rgba(200,200,200,.18);
                ul{
                    font-size: .3rem;
                    text-align: center;
                    padding-bottom: 1rem;
                    li{
                        width: 2.2rem;
                        line-height: 1.4rem;
                    }
                    li.flag{
                        background: #fff;
                    }
                }
            }
        }
        .right{
            width: 7.8rem;
            overflow-y: scroll;
            .right_main{
                padding-bottom: .5rem;
                position: relative;
                dl{
                    dt{
                        font-size: .4rem;
                        font-weight: bolder;
                        line-height: .8rem;
                        padding-bottom: .3rem;
                        padding-left: 6%;

                    }
                    dd{
                        height: 2.5rem;
                        padding-bottom: .4rem;
                        img{
                            float: left;
                            height: 100%;
                            width: 30%;
                            padding-left: 6%;
                        }
                        &>div{
                            position: relative;
                            float: left;
                            box-sizing: border-box;
                            width: 64%;
                            padding-left: .2rem;
                            font-size: .3rem;
                            color: #999;
                            line-height: .5rem;
                            height: 100%;
                            h4{
                                font-size: .4rem;
                                color: #000;
                            }
                            p{
                                width: 80%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                span{
                                    margin-right: .2rem;
                                }
                            }
                            div{
                                position: absolute;
                                bottom: 0;
                                width: 80%;
                                span{
                                    color: red;
                                    font-size: .4rem;
                                }
                                em{
                                    float: right;
                                    font-style: normal;
                                    color: #000;
                                    font-size: .45rem;
                                    i{
                                        color: #2396ff;
                                        font-size: .6rem;
                                    }
                                    i:nth-child(1){
                                        margin-right: .2rem;
                                    }
                                    i:nth-child(2){
                                        margin-left: .2rem;
                                    }
                                }

                            }
                        }
                    }

                }
            }
        }
        .footer{
            position: fixed;
            bottom: 0;
            height: 7%;
            width: 100%;
            background-color: rgba(90,90,90,1);
            &>div{
                float: left;
            }
            .icon{
                position: relative;
                width: 1.3rem;
                height: 1.3rem;
                background-color: rgba(75,75,75,1);
                margin: -.25rem .5rem  0;
                border-radius: 50%;
                div{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 1rem;
                    height: 1rem;
                    background-color: rgba(65,65,65,1);
                    border-radius: 50%;
                    margin: -.5rem 0 0 -.5rem;
                    text-align: center;
                    i{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        padding: .25rem .1rem 0 0;
                        font-size: .55rem;
                        color: #999;
                    }
                }
            }
            .carriage{
                padding-top: .15rem;
                color: #999;
                font-size: .3rem;
                line-height: .5rem;
            }
            .footer_right{
                float: right;
                font-size: .4rem;
                color: #fff;
                font-weight: bolder;
                text-align: center;
                background-color: rgba(100,100,100,1);
                height: 100%;
                width: 3rem;
                box-sizing: border-box;
                padding-top: 4%;
            }
        }
    }
</style>