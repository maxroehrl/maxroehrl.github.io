<template>
  <div class="navbar">
    <div>
      <logo :size="400" url="." />
    </div>
    <div v-for="link in links"
         :key="link.url">
      <a v-if="link.url.startsWith('#')"
         v-scroll-to="link.url"
         class="underline">
        {{ link.text }}
      </a>
      <router-link v-else
                   :to="link.url"
                   class="underline">
        {{ link.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from './Logo';

export default {
  name: 'Navbar',
  components: {
    Logo,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../colors";

  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $accent;
    overflow-x: auto;

    > div > a {
      font-size: 1.8em;
      color: white;
      margin: 0 .7em;
      cursor: pointer;
      white-space: nowrap;
    }
  }

  .underline {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: white;
      visibility: hidden;
      transform: scaleX(0);
      transition: all .2s ease-in-out 0s;
    }

    &:hover:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  @media only screen and (max-width: 600px) {
    .navbar > div > a {
      font-size: 1.3em;
      margin: 0 .5em;
    }
  }
</style>
