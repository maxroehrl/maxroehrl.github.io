import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { Fancybox } from '@fancyapps/ui';
import './style.css';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => import('./components/Home.vue'),
    },
    {
      path: '/projects',
      component: () => import('./components/ProjectList.vue'),
    },
    {
      path: '/experience',
      component: () => import('./components/Experience.vue'),
    },
    {
      path: '/particles',
      component: () => import('./components/ParticleCanvas.vue'),
    },
    {
      path: '/contact',
      component: () => import('./components/Contact.vue'),
    },
    {
      path: '/imprint',
      component: () => import('./components/Imprint.vue'),
    },
    {
      path: '/data_protection',
      component: () => import('./components/DataProtection.vue'),
    },
  ],
  history: createWebHashHistory(),
});

Fancybox.bind('[data-fancybox]');

const app = createApp(App);
app.use(router);
app.mount('#app');
