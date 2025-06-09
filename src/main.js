import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Experience from './components/Experience.vue';
import ProjectList from './components/ProjectList.vue';
import ParticleCanvas from './components/ParticleCanvas.vue';
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';
import Imprint from './components/Imprint.vue';

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
    {
      path: '/imprint',
      component: Imprint,
    },
  ],
  history: createWebHistory(),
});

Fancybox.bind('[data-fancybox]');

const app = createApp(App);
app.use(router);
app.mount('#app');
