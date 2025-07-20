<template>
  <section id="contact">
    <h3 class="text-center text-4xl! self-center">Contact</h3>

    <ul>
      <li class="items-start">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          class="bottom-link text-text!">
          <img
            :alt="link.text"
            :src="link.img"
            class="small-icon filter dark:invert dark:brightness-90" />
          <b>{{ link.text }}</b>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import Mail from '../assets/mail.svg';
import Github from '../assets/github.svg';
import LinkedIn from '../assets/linkedin.svg';
import { ref } from 'vue';

const links = ref([
  {
    url: 'mailto:max.roehrl11@gmail.com',
    text: 'max.roehrl11@gmail.com',
    img: Mail,
  },
  {
    url: 'https://github.com/maxroehrl',
    text: 'Github Profile',
    img: Github,
  },
  {
    url: 'https://www.linkedin.com/in/maximilian-röhrl-68446220a',
    text: 'LinkedIn Profile',
    img: LinkedIn,
  },
]);
</script>

<style scoped lang="scss">
.bottom-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.7em;
}

.small-icon {
  width: 2em;
  height: 2em;
  margin: 0 0.5em;
  transition: fill 0.2s ease-in-out;
}

#contact a {
  // align-self: flex-start;
  color: var(--color-grey);
  margin: 0.5em;

  &:hover {
    transform: translate(10px, 0);
    color: var(--color-accent);
  }
}
</style>
