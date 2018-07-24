<template>
    <div class="my">
        我的
        <Tab></Tab>
    </div>
</template>

<script>
    import Tab from "../base/Tab";

    export default {
        name: "my",  //我的
        components:{
            Tab
        }
    }
</script>

<style scoped lang="less">
    .my{
        height: 100%;
    }
</style>