<!--suppress ES6UnusedImports -->
<template>
  <section id="contact">
    <h1>Contact</h1>
    <ul>
      <li>
        <a v-for="link in links" :href="link.url" class="bottom-link">
          <component :is="link.img" class="small-icon" />
          <b>{{ link.text}}</b>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  import Mail from '../assets/mail.svg'
  import Github from '../assets/github.svg'

  export default {
    name: "Contact",
    data() {
      return {
        links: [
          {
            url: "mailto:max.roehrl11@gmail.com",
            text: "max.roehrl11@gmail.com",
            img: Mail
          }, {
            url: "https://github.com/maxroehrl",
            text: "Github Profile",
            img: Github
          }
        ]
      }
    },
    components: {
      Mail,
      Github,
    }
  }
</script>

<style scoped lang="scss">
  .bottom-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 .7em;
  }

  .small-icon:hover {
    fill: #ff5722;
  }

  .small-icon {
    width: 2em;
    height: 2em;
    margin: 0 .5em;
  }

  #contact a {
    //align-self: flex-start;
    color: #1e1e1e;
    margin: .5em;
  }

  #contact a:hover {
    color: #ff5722;
  }
</style>
