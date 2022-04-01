import {createApp} from 'vue';
import App from './App.vue';
import VueScrollTo from 'vue-scrollto';
import {createRouter, createWebHistory} from 'vue-router';
import ProjectList from './components/ProjectList';
import ParticleCanvas from './components/ParticleCanvas';
import Contact from './components/Contact';

const router = createRouter({
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
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
app.directive('scroll-to', VueScrollTo);
app.mount('#app');
