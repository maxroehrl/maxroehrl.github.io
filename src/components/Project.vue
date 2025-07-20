<template>
  <li :class="{ 'full-width': project.full }">
    <div class="top-content">
      <h2>{{ project.title }}</h2>
      <em>{{ project.year }}</em>
      <div v-html="project.description" />
    </div>
    <div v-if="project.screenshots.length === 1" class="bottom-links">
      <img
        data-fancybox
        :src="project.screenshots[0].url"
        :alt="project.screenshots[0].caption"
        :class="project.screenshots[0].class" />
    </div>
    <div v-else-if="project.screenshots.length > 1" class="bottom-links">
      <div
        v-for="screenshot in project.screenshots"
        :key="screenshot.url"
        class="bottom-group-ver">
        <div class="bottom-group-hor">
          <img
            v-if="screenshot.thumb"
            :src="screenshot.thumb"
            :alt="screenshot.caption"
            class="small-icon" />
          <h3 v-if="screenshot.caption">
            {{ screenshot.caption }}
          </h3>
        </div>
        <img
          :data-fancybox="project.id"
          :src="screenshot.url"
          :alt="screenshot.caption"
          :class="screenshot.class" />
      </div>
    </div>
    <div v-if="project.links.length" class="bottom-links">
      <div v-for="link in project.links" :key="link.url">
        <a
          v-if="!link.url.startsWith('/')"
          :href="link.url"
          class="bottom-link"
          target="_blank">
          <vue-inline-svg
            v-if="link.img"
            :src="`./assets/${link.img}.svg`"
            class="smaller-icon" />
          <p>{{ link.text }}</p>
        </a>
        <router-link v-else :to="link.url" class="bottom-link">
          {{ link.text }}
        </router-link>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import VueInlineSvg from 'vue-inline-svg';

defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.bottom-links {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 1em;
  margin-top: 1em;
  border-top: 1px solid var(--color-border);

  a {
    transition: color 0.2s ease-in-out;
  }
}

.bottom-group-ver {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 1em 0.3em;
  background-color: var(--color-surface-card-2);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  box-shadow: 0 0 0 var(--color-shadow);
  transition: all 0.6s ease;

  &:hover {
    box-shadow:
      0 0 2px var(--color-shadow),
      0 8px 24px 0 var(--color-shadow2);
    transform: translate(0, -10px);
  }
}

.bottom-group-hor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em;
}

.bottom-link {
  color: var(--color-font);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.7em;
  fill: currentColor;

  &:hover {
    color: var(--color-accent);
  }
}

.top-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;

  a {
    text-decoration: underline solid var(--color-underline);

    &:hover {
      text-decoration-color: var(--color-underline-hover);
    }
  }

  em {
    color: #8d8d8d;
  }
}

.small-icon {
  width: 3.5em;
  height: 3.5em;
  margin: 0 1em 0 0;
  transition: fill 0.2s ease-in-out;
}

.smaller-icon {
  width: 2em;
  height: 2em;
  margin: 0 0.5em;
  transition: fill 0.2s ease-in-out;
}

img {
  cursor: zoom-in;
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
</style>
