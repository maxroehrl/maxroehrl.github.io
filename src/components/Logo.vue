<template>
  <a :href="url">
    <svg :viewBox="`0 0 ${2*size} ${2*size}`">
      <circle class="circle"
              :cx="size"
              :cy="size"
              :r=".9*size" />
      <g class="logo-group">
        <circle class="ring"
                :cx="size"
                :cy="size"
                :r=".9*size" />
        <path class="logo"
              :d="glyphPath" />
      </g>
    </svg>
  </a>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      glyphPath: 'M515.5,192.3l-96.8,96.8l-96.3-96.3H211.6v459.5L514,356v131.8h111.5V192.3H515.5z M322,384.3v-31.5l15.8,15.7 L322,384.3z',
    };
  },
};
</script>

<style scoped lang="scss">
  @import "../colors";

  $glyph: white;
  $glyph-hover: $accent;
  $ring: white;
  $ring-hover: $grey;
  $circle: $grey;

  svg {
    margin-top: 8px;
    width: 3em;
    height: 3em;
  }

  .circle {
    fill: $circle;
  }

  .logo {
    fill: $glyph;
    transition: fill .5s ease-in-out;
  }

  .ring {
    fill: transparent;
    stroke-width: 20px;
    stroke: $ring;
    transition: all .5s cubic-bezier(.4, .32, .28, 1.35);
  }

  .logo-group:hover {
    .logo {
      fill: $glyph-hover;
    }

    .ring {
      stroke: $ring-hover;
      transform: scale(1.07) translate(-3.5%, -3.5%);
    }
  }
</style>
