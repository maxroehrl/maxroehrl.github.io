import Vue from 'vue';
import App from './App.vue';
import vueScrollto from 'vue-scrollto';
import VueRouter from 'vue-router';
import ProjectList from './components/ProjectList';
import ParticleCanvas from './components/ParticleCanvas';
import Contact from './components/Contact';

Vue.use(vueScrollto);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: 'projects',
  }, {
    path: '/projects',
    component: ProjectList,
  }, {
    path: '/particles',
    component: ParticleCanvas,
  }, {
    path: '/contact',
    component: Contact,
  }],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
