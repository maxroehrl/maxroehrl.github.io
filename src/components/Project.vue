<template>
  <li :class="{'full-width': project.full}">
    <div class="top-content">
      <h2>{{ project.title }}</h2>
      <div v-html="project.description" />
    </div>
    <div v-if="project.screenshots.length === 1"
         class="bottom-links">
      <expendable-image :src="project.screenshots[0].url"
                        :alt="project.screenshots[0].caption"
                        :classes="project.screenshots[0].class" />
    </div>
    <div v-else-if="project.screenshots.length > 1"
         class="bottom-links">
      <div v-for="screenshot in project.screenshots"
           :key="screenshot.url"
           class="bottom-group-ver">
        <div class="bottom-group-hor">
          <img v-if="screenshot.thumb"
               :src="screenshot.thumb"
               :alt="screenshot.caption"
               class="small-icon">
          <h3 v-if="screenshot.caption">
            {{ screenshot.caption }}
          </h3>
        </div>
        <expendable-image :src="screenshot.url"
                          :alt="screenshot.caption"
                          :classes="screenshot.class" />
      </div>
    </div>
    <div v-if="project.links.length"
         class="bottom-links">
      <div v-for="link in project.links"
           :key="link.url">
        <a v-if="!link.url.startsWith('/')"
           :href="link.url"
           class="bottom-link"
           target="_blank">
          <component :is="link.img"
                     v-if="link.img"
                     class="smaller-icon" />
          <p>{{ link.text }}</p>
        </a>
        <router-link v-else
                     :to="link.url"
                     class="bottom-link">
          {{ link.text }}
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
import ExpendableImage from './ExpendableImage';
import Github from '../assets/github.svg';
import Download from '../assets/download.svg';

export default {
  name: 'Project',
  components: {
    Github,
    Download,
    ExpendableImage,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
  @import "../colors";

  .bottom-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 1em;
    margin-top: 1em;
    border-top: 1px solid $light-card-border;

    a {
      @include transition(color);
    }
  }

  .bottom-group-ver {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    margin: 1em .3em;
    background-color: $light-card-bg2;
    border-radius: 6px;
    border: 1px solid $light-card-border;
    box-shadow: 0 0 0 $light-shadow;
    transition: all .6s ease;

    &:hover {
      box-shadow: 0 0 2px $light-shadow,
                  0 8px 24px 0 $light-shadow2;
      transform: translate(0, -10px);
    }
  }

  .bottom-group-hor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .5em;
  }

  .bottom-link {
    color: $light-font;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 .7em;
    fill: currentColor;

    &:hover {
      color: $accent;
    }
  }

  .top-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;

    a {
      text-decoration: underline solid $light-underline;

      &:hover {
        text-decoration-color: $light-underline-hover;
      }
    }
  }

  .small-icon {
    width: 3.5em;
    height: 3.5em;
    margin: 0 1em 0 0;
    @include transition(fill);
  }

  .smaller-icon {
    width: 2em;
    height: 2em;
    margin: 0 .5em;
    @include transition(fill);
  }

  @media only screen and (max-width: 600px) {
    #projects > ul > li {
      flex: 0 1 100%;
    }

    .bottom-group-ver {
      width: 100%;
    }

    .bottom-link {
      margin: 0;
    }
  }

  @media (prefers-color-scheme: dark) {
    .bottom-links {
      border-top-color: $dark-card-border;
    }

    .top-content a {
      text-decoration-color: $dark-underline;

      &:hover {
        text-decoration-color: $dark-underline-hover;
      }
    }

    .bottom-group-ver {
      background-color: $dark-card-bg2;
      border-color: $dark-card-border;
      box-shadow: 0 0 0 $dark-shadow;

      &:hover {
        box-shadow: 0 0 2px $dark-shadow,
                    0 8px 24px 0 $dark-shadow2;
      }
    }

    .bottom-link {
      color: $dark-font;
    }
  }
</style>
