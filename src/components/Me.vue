<template>
  <section id="home" class="flex flex-col gap-6 items-center p-4 mb-2!">
    <ul>
      <li class="flex flex-wrap flex-row! items-center justify-around!">
        <img
          :src="Me"
          alt="Me"
          class="h-[200px] object-cover rounded-full transition-transform duration-300 hover:-translate-y-2" />
        <div class="flex flex-col text-2xl">
          <h2 class="m-0! text-5xl">Maximilian Röhrl</h2>
          <p class="">Software Developer</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import Me from '../assets/profil.jpg';
</script>

<style scoped></style>
