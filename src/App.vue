<template>
  <div id="app">
    <header>
      <navbar :links="navbarLinks" />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <navbar :links="navbarLinks" />
      <copyright />
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Copyright from './components/Copyright';

export default {
  name: 'App',
  components: {
    Navbar,
    Copyright,
  },
  data() {
    return {
      navbarLinks: [
        {
          url: '/projects',
          text: 'Projects',
        }, {
          url: '/contact',
          text: 'Contact',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import "colors";
  @import "dots";

  *::-webkit-scrollbar {
    background: $light-card-bg2;
    width: 13px;
    height: 13px;
  }

  *::-webkit-scrollbar-track {
    background: $light-card-bg;
  }

  *::-webkit-scrollbar-thumb {
    background-color: $light-card-bg2;
    border-radius: 6px;
    border: 1px solid $light-card-border;
  }

  body {
    margin: 0;
    padding: 0;
    border: 0;
    display: flex;
    min-height: 100%;
    min-width: 268px;
    flex-direction: column;
    color: $light-font;
    background-color: $light-bg;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a {
    display: inline-block;
    color: $accent;
    text-decoration: none;
    @include transition(all);

    &:hover {
      color: $light-font-hover;
    }
  }

  img {
    max-width: 100%;
    border: 0;
    min-height: 1px;
  }

  h1 {
    font-weight: bold;
    margin: 1em 0 .5em 0;
    font-size: 3em;
    text-align: center;
  }

  h2 {
    font-weight: bold;
    color: $accent;
    margin: .3em 0;
  }

  h3 {
    font-weight: bold;
    font-size: 1.2em;
    margin: .8em 0;
  }

  p {
    margin: .5em 0;
  }

  ul {
    list-style-type: circle;
    margin: .5em 0;
    padding: 0 0 0 1.5em;
  }

  code {
    padding: .4em;
    background-color: $light-code-bg;
  }

  ::selection {
    color: white;
    background-color: $accent;
  }

  header {
    border-bottom: 1px solid $accentDark;
    box-shadow: 0 5px 5px $light-shadow2;
  }

  main {
    min-height: 75vh;
  }

  footer {
    border-top: 1px solid $accentDark;
  }

  section {
    margin-bottom: 8em;
    @include dots;

    > ul {
      max-width: 1000px;
      width: 90%;
      margin: 2em auto;
      list-style-type: none;
      padding: 0;

      > li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $light-card-bg;
        border: 1px solid $light-card-border;
        border-radius: 6px;
        box-shadow: 0 0 0 $light-shadow;
        padding: 1em;
        margin: 1em;
        transition: all .6s ease;
      }

      > li:hover {
        box-shadow: 0 0 2px $light-shadow,
                    0 8px 24px 0 $light-shadow2;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    section > ul {
      width: 100%;

      > li {
        border-radius: 0;
        margin: 1em 0;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    *::-webkit-scrollbar {
      background: $dark-card-bg2;
    }

    *::-webkit-scrollbar-track {
      background: $dark-card-bg;
    }

    *::-webkit-scrollbar-thumb {
      background-color: $dark-card-bg2;
      border-color: $dark-card-border;
    }

    body {
      background: $dark-bg;
      color: $dark-font;
    }

    a:hover {
      color: $dark-font-hover;
    }

    code {
      background: $dark-code-bg;
    }

    header {
      box-shadow: 0 5px 5px $dark-shadow2;
    }

    section > ul > li {
      background: $dark-card-bg;
      border-color: $dark-card-border;
      box-shadow: 0 0 0 $dark-shadow;

      &:hover {
        box-shadow: 0 0 2px $dark-shadow,
                    0 8px 24px 0 $dark-shadow2;
      }
    }
  }
</style>
