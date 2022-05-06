<template>
  <div>
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
}
}
</script>

<style>
@import url('./assets/style.css');
</style>
