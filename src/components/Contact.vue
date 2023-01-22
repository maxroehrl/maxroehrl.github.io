<template>
  <section id="contact">
    <h1>Contact</h1>
    <ul>
      <li>
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          class="bottom-link">
          <img :alt="link.text" :src="link.img" class="small-icon" />
          <b>{{ link.text }}</b>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import Mail from '../assets/mail.svg';
import Github from '../assets/github.svg';
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
]);
</script>

<style scoped lang="scss">
@import '../colors';

.bottom-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.7em;
  fill: currentColor;
}

.small-icon {
  width: 2em;
  height: 2em;
  margin: 0 0.5em;
  @include transition(fill);
}

#contact a {
  // align-self: flex-start;
  color: $grey;
  margin: 0.5em;

  &:hover {
    transform: translate(10px, 0);
    color: $accent;
  }
}

@media (prefers-color-scheme: dark) {
  #contact a {
    color: $dark-font;
  }
}
</style>
