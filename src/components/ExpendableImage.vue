<template>
  <div class="expandable-image"
       :class="{expanded}"
       @click="expanded = true">
    <i v-if="!expanded" class="expand-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" />
      </svg>
    </i>
    <img :src="src"
         :alt="alt"
         :class="classes">
  </div>
</template>

<script>
export default {
  name: 'ExpendableImage',
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: () => '',
    },
    classes: {
      type: Array,
      required: false,
      default: () => ['screenshot'],
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  watch: {
    expanded(expanded) {
      this.$nextTick(() => {
        if (expanded) {
          this.cloned = this.$el.cloneNode(true);
          this.cloned.addEventListener('click', this.closeImage);
          this.cloned.addEventListener('touchmove', this.freezeVp, false);
          document.body.appendChild(this.cloned);

          setTimeout(() => {
            this.cloned.style.opacity = '1';
          }, 0);
        } else {
          this.cloned.style.opacity = '0';
          this.cloned.removeEventListener('touchmove', this.freezeVp, false);

          setTimeout(() => {
            document.body.removeChild(this.cloned);
            this.cloned = null;
          }, 250);
        }
      });
    },
  },
  methods: {
    closeImage(event) {
      this.expanded = false;
      event.stopPropagation();
    },
    freezeVp(event) {
      event.preventDefault();
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../colors";

  .expandable-image {
    position: relative;
    transition: 0.25s opacity;
    cursor: zoom-in;
    margin: 0 !important;

    &:hover .expand-button {
      opacity: 1;
    }
  }

  body > .expandable-image.expanded {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    opacity: 0;
    cursor: zoom-out;

    img {
      width: auto;
      height: auto;
      max-width: 100vw;
      max-height: 100vh;
      object-fit: contain;
      margin: 0 auto;
    }
  }

  .expand-button {
    position: absolute;
    z-index: 999;
    right: 10px;
    top: 10px;
    padding: 0;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.2s opacity;

    svg {
      width: 20px;
      height: 20px;
      fill: white;
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    }
  }

  .screenshot {
    width: 300px;
  }

  .big-screenshot {
    width: 100%;
  }

  .theme-screenshot {
    margin: 0 .5em -.3em .5em;
    width: 250px;
  }

  .lante-screenshot {
    margin: 0 .5em .5em .5em;
    width: 420px;
    height: 280px;
  }

  @media only screen and (max-width: 600px) {
    .screenshot, .big-screenshot, .theme-screenshot, .lante-screenshot {
      width: 80vw;
      height: auto;
    }
  }
</style>
