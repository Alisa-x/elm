<template>
    <div class="Header">
        <i @click="back"></i>
        <slot>这里有个插槽</slot>
    </div>
</template>

<script>
    export default {
        name: "Header",
        created(){
        },
        methods:{
            back(){
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped lang="less">
.Header{
    width: 100%;
    height: 1.2rem;
    background: linear-gradient(90deg,#0af,#0085ff);
    text-align: center;
    color: #fff;
    font-size: 0.5rem;
    line-height: 1.2rem;
    position: relative;
    i{
        position: absolute;
        top: 50%;
        left: .4rem;
        margin-top: -.15rem;
        float: left;
        width: .3rem;
        height: .3rem;
        border-top: 0.05rem solid #fff;
        border-left: 0.05rem solid #fff;
        transform:rotate(-45deg);

    }
}
</style>