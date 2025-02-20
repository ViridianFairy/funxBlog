import Vue from "vue";
import App from "./App";
import router from "./router/router";
import axios from "axios";
import Cookies from "js-cookie";
import store from "./store/store";
const baseURL = `${require('./config').baseURL}:3001/api` //3001
// import "highlight.js/styles/solarized-dark.css";
// import hljs from "highlight.js";
Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({ baseURL});
Vue.prototype.Cookies = Cookies;
//通过_id存储并拿到当前的用户信息
Vue.prototype.$getUserInfo = function() {
   this.$http
      .post("/user-info", { _id: this.Cookies.get("_id") })
      .then(res => {
         //console.log(res.data);
         if (res.data.success == 1) {
            this.$store.state.login.user = res.data.user;
            this.$store.state.login.quote = res.data.quote;
            this.$store.state.login.avatar = res.data.avatar+"?a="+Math.random()
            this.$store.state.login.lookNum = res.data.lookNum;
            this.$store.state.login.sayNum = res.data.sayNum;
         } else {
            this.$store.state.login.user = "";
            this.$store.state.login.quote = "";
            this.$store.state.login.avatar = "";
            this.$store.state.login.lookNum = "";
            this.$store.state.login.sayNum = "";
         }
      })
      .catch();
};
//组件构造器 并且挂载
import Alert from "./components/alert";
const alertBox = Vue.extend(Alert);
//Vue.prototype.$alertNum = 0;
Vue.prototype.$alert = function(msg, type, Obj) {
   if (document.getElementsByClassName('alert').length >= 2 && !type.match('overload')) return;
   if (type == "") type = "true";
   var a = new alertBox({
      data: {
         msg: msg,
         type: type,
         visible: false,
         mouse:Obj?Obj:{x:0,y:0},
      }
   }).$mount();
   document.body.appendChild(a.$el);
   setTimeout(()=>{
      document.body.removeChild(a.$el);
   },1700)
};
router.afterEach((to,from,next)=>{
   　window,scrollTo(0,0)
})
Vue.prototype.$throttle = function(fn,wait){
   var timer = null;
   return function(){
       var context = this;
       var args = arguments;
       if(!timer){
           timer = setTimeout(function(){
               fn.apply(context,args);
               timer = null;
           },wait)
       }
   }
}
new Vue({
   el: "#app",
   render:h=>h(App),
   router,
   store,
   mounted() {
      //this.$router.replace("/home");
   }
});
// (function() {
//    if (!/mdebug=true/.test(window.location.href)) return;
//    var script = document.createElement("script");
//    script.src = "https://cdn.bootcss.com/eruda/1.2.6/eruda.min.js";
//    script.async = true;
//    document.getElementsByTagName("head")[0].appendChild(script);
//    script.onload = function() {
//       eruda.init();
//    };
// })();
/*
封装一些全局函数
*/
export default baseURL
