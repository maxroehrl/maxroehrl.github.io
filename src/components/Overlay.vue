<template>
  <div id="overlay" />
</template>

<script>
export default {
  name: 'Overlay',
};
</script>

<style scoped lang="scss">
  #overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4) no-repeat center center;
    cursor: pointer;
  }
</style>
