import Vue from 'vue'
import App from './App.vue'

<<<<<<< HEAD
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
=======
if(document.getElementById("blogUrl")) {
clearInterval(window.domScroll);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#blogUrl')
}
>>>>>>> f12a010... releases v1.1
