<template>
  <div class="copyright">
    <p>Copyright &copy;{{ new Date().getFullYear() }} Max R&ouml;hrl</p>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import '../colors';

.copyright {
  padding: 1em;
  background-color: $grey;
  border-top: 1px solid black;

  > p {
    text-align: center;
    color: #757575;
  }
}
</style>
