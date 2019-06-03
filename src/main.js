import Vue from 'vue';
import App from './App.vue';
import vueScrollto from 'vue-scrollto';

Vue.use(vueScrollto);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
