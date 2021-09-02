<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const size = document.documentElement.clientWidth / 7.5
    document.documentElement.fontSize = size + "px"
  }
}
</script>

<style lang="scss">

</style>
