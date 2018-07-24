<template>
    <div class="Tab">
        <ul>
            <router-link tag="li" to="/home"><i class="iconfont icon-changyonglogo40"></i><span>首页</span></router-link>
            <router-link tag="li" to="/find"><i class="iconfont icon-faxian"></i><span>发现</span></router-link>
            <router-link tag="li" to="/order"><i class="iconfont icon-weibiaoti-"></i><span>订单</span></router-link>
            <router-link tag="li" to="/my"><i class="iconfont icon-wode"></i><span>我的</span></router-link>
        </ul>
    </div>
</template>

<script>
    import iconFont from "../iconfont.css";
    export default {
        name: "Tab"
    }
</script>

<style scoped lang="less">
    .Tab{
        width: 100%;
        height: 1.8rem;
        position: fixed;
        bottom: -0.1rem;
        box-shadow: 0 2px 10px #000;

        ul{
            height: 100%;
            overflow: hidden;
            list-style: none;
            padding: 0.35rem;
            li{
                float: left;
                width: 25%;
                text-align: center;
                font-size: 0;
                color: #8e8e93;
                i{
                    font-size: 0.5rem;
                    display: block;
                }

                span{
                    font-size: 0.35rem;
                }
            }
            li:nth-child(1){
                i{
                    margin-top: -0.25rem;
                    font-size: .9rem;
                }
                span{
                    display: block;
                    margin-top: -0.2rem;
                }
            }
            li.router-link-active{
                color: #0089dc;
            }
        }
    }
</style>