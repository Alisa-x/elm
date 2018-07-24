import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
Vue.config.productionTip = false;

new Vue({
    router,
    created(){
        let obj = {account:"qqq",password:"www"};
        // axios.defaults.withCredentials = true;
        axios.defaults.baseURL = 'http://localhost:9090';
        axios.post('/login', JSON.stringify(obj))
        .then((response)=> {
            console.log(response.headers);
         })
    },
    render: h => h(App)
}).$mount("#app");
