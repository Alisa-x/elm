<template>
    <div class="home">
        <Header></Header>
        首页
        <Tab></Tab>
    </div>
</template>

<script>
    import Tab from "../base/Tab";
    import Header from "../base/Header";
    export default {
        name: "home", //首页
        components:{
            Tab,Header
        }

    }
</script>

<style scoped lange="less">
    .home{
        height: 100%;
    }
</style>