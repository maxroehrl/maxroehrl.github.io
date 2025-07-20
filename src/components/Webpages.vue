<template>
  <section>
    <h3 class="text-center text-4xl!">Websites</h3>

    <ul>
      <li
        class="flex flex-col gap-6 bg-surface-card rounded border border-border p-6">
        <div class="flex flex-wrap items-center justify-around gap-8">
          <a
            href="https://k-und-r-fotobox.de"
            target="_blank"
            class="transition-transform duration-300 hover:-translate-y-2">
            <img :src="Fotobox" alt="Fotobox" />
          </a>
          <a
            href="https://luefter-reparatur.de"
            target="_blank"
            class="transition-transform duration-300 hover:-translate-y-2">
            <img :src="Luefter" alt="Luefter" />
          </a>
          <a
            href="https://panelretter.de"
            target="_blank"
            class="transition-transform duration-300 hover:-translate-y-2">
            <img :src="Panelretter" alt="Panelretter" />
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import Fotobox from '../assets/fotobox.png';
import Luefter from '../assets/luefter.svg';
import Panelretter from '../assets/panelretter.png';
</script>

<style scoped>
img {
  height: 100px;
}
</style>
