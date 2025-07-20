<template>
  <router-link :to="url">
    <svg :viewBox="`0 0 ${2 * size} ${2 * size}`">
      <circle class="circle" :cx="size" :cy="size" :r="0.9 * size" />
      <g class="logo-group">
        <circle class="ring" :cx="size" :cy="size" :r="0.9 * size" />
        <path class="logo" :d="glyphPath" />
      </g>
    </svg>
  </router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  size: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const glyphPath = ref(
  'M515.5,192.3l-96.8,96.8l-96.3-96.3H211.6v459.5L514,356v131.8h111.5V192.3H515.5z M322,384.3v-31.5l15.8,15.7 L322,384.3z'
);
</script>

<style scoped>
svg {
  margin-top: 8px;
  width: 3em;
  height: 3em;
  --glyph: white;
  --glyph-hover: var(--color-accent);
  --ring: white;
  --ring-hover: var(--color-grey);
  --circle: var(--color-grey);
}

.circle {
  fill: var(--circle);
}

.logo {
  fill: var(--glyph);
  transition: fill 0.5s ease-in-out;
}

.ring {
  fill: transparent;
  stroke-width: 20px;
  stroke: var(--ring);
  transition: all 0.5s cubic-bezier(0.4, 0.32, 0.28, 1.35);
}

.logo-group:hover {
  .logo {
    fill: var(--glyph-hover);
  }

  .ring {
    stroke: var(--ring-hover);
    transform: scale(1.07) translate(-3.5%, -3.5%);
  }
}
</style>
