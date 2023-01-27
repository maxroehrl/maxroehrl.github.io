import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Experience from './components/Experience.vue';
import ProjectList from './components/ProjectList.vue';
import ParticleCanvas from './components/ParticleCanvas.vue';
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import '@fancyapps/ui/dist/fancybox.css';
// eslint-disable-next-line no-unused-vars
import { Fancybox } from '@fancyapps/ui';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/projects',
      component: ProjectList,
    },
    {
      path: '/experience',
      component: Experience,
    },
    {
      path: '/particles',
      component: ParticleCanvas,
    },
    {
      path: '/contact',
      component: Contact,
    },
  ],
  history: createWebHistory(),
});

const app = createApp(App);
app.use(router);
// app.directive('scroll-to', VueScrollTo);
app.mount('#app');
