<template>
  <div id="app">
    <header>
      <navbar :links="navbarLinks"></navbar>
    </header>
    <main>
      <overlay></overlay>
      <project-list></project-list>
      <contact></contact>
    </main>
    <footer>
      <navbar :links="navbarLinks"></navbar>
    </footer>
    <copyright></copyright>
  </div>
</template>

<script>
  import Overlay from "./components/Overlay"
  import ProjectList from "./components/ProjectList"
  import Navbar from "./components/Navbar"
  import Contact from "./components/Contact"
  import Copyright from "./components/Copyright"

  export default {
    name: 'app',
    data() {
      return {
        navbarLinks: [
          {
            url: "#projects",
            text: "Projects"
          }, {
            url: "#contact",
            text: "Contact"
          }
        ]
      }
    },
    components: {
      Overlay,
      ProjectList,
      Navbar,
      Contact,
      Copyright
    }
  }
</script>

<style lang="scss">
  $accent: #ff5722;
  $accentDark: #a94627;

  body {
    margin: 0;
    padding: 0;
    border: 0;
    display: flex;
    min-height: 100%;
    min-width: 268px;
    flex-direction: column;
    color: #666;
    background-color: #f1f1f1;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    display: inline-block;
    color: $accent;
    text-decoration: none;
    transition: color .2s ease-in-out;
  }

  a:hover {
    color: $accentDark;
  }

  img {
    max-width: 100%;
    border: 0;
    min-height: 1px;
  }

  h1 {
    font-weight: bold;
    color: #444;
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
    background-color: #e9e9e9;
  }

  ::selection {
    color: white;
    background-color: $accent;
  }

  header {
    border-bottom: 1px solid $accentDark;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .16);
  }

  footer {
    border-top: 1px solid $accentDark;
  }

  section {
    margin-bottom: 8em;
  }

  section > ul {
    max-width: 1000px;
    width: 90%;
    margin: 2em auto;
    list-style-type: none;
    padding: 0;
  }

  section > ul > li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border: 1px solid #c2c2c2;
    border-radius: 6px;
    box-shadow: 0 0 0 rgba(38, 50, 56, .2);
    padding: 1em;
    margin: 1em;
    transition: all .6s ease;
  }

  section > ul > li:hover {
    box-shadow: 0 0 2px rgba(38, 50, 56, .2),
    0 8px 24px 0 rgba(0, 0, 0, .2);
  }

  @media only screen and (max-width: 600px) {
    section > ul {
      width: 100%;
    }

    section > ul > li {
      border-radius: 0;
      margin: 1em 0;
    }
  }
</style>
