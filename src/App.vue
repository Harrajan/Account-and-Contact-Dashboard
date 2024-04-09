<template>
  <div id="app">
    <AppNavbar />
    <router-view /> <!-- This is where the component for the current route will be rendered -->
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar
  }
}
</script>

<style>
  body { 
    margin-top: 0px;
  }
</style>