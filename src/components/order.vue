<template>
    <div class="order">
        订单
        <Tab></Tab>
    </div>
</template>

<script>
    import Tab from "../base/Tab";
    export default {
        name: "order", //订单
        components:{
            Tab
        }
    }
</script>

<style scoped lang="less">
    .order{
        height: 100%;
    }
</style>