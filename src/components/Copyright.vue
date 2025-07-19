<template>
  <div
    class="copyright p-4 border-t border-black flex flex-wrap items-center justify-center gap-6">
    <p>&copy; Maximilian R&ouml;hrl. All Right Reserved.</p>
    <router-link to="/data_protection">Data Protection</router-link>
    <router-link to="/imprint">Imprint</router-link>
  </div>
</template>

<style scoped lang="scss">
@import '../colors';

.copyright {
  background-color: $grey;

  a,
  p {
    color: #757575;
  }
}
</style>
