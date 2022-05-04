<template>
  <div>
    <BrowsingApp />
    <router-view></router-view>
  </div>
</template>

<script>
import BrowsingApp from './components/BrowsingApp.vue'

export default {
  name: 'App',
  components: {
    BrowsingApp
}
}
</script>

<style>
@import url('./assets/style.css');
</style>
