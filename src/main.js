import Vue from 'vue'
import urlApp from './urlApp.vue'

if(document.getElementById("blogUrl")) {
clearInterval(window.domScroll);
Vue.config.productionTip = false;

new Vue({
  render: h => h(urlApp),
}).$mount('#blogUrl')
}
