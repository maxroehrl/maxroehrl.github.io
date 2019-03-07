<template>
  <div class="copyright">
    <p>&copy; 2017 Max R&ouml;hrl</p>
  </div>
</template>

<script>
    export default {
        name: "Copyright"
    }
</script>

<style scoped lang="scss">
  .copyright {
    padding: 1em;
    background-color: #1e1e1e;
    border-top: 1px solid #000000;
  }

  .copyright > p {
    text-align: center;
    color: #757575;
  }
</style>
