<template>
        <div id="app">
            <router-view></router-view>
        </div>
</template>

<script>
    import amfeFlexible from "../node_modules/amfe-flexible/index";
    export default {
      created(){
      },
    }
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html,body,#app{
    height: 100%;
}
</style>

