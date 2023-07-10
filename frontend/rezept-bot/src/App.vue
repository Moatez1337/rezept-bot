<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <footer><the-footer></the-footer></footer>
  </footer>
</template>

<script>
import TheNavigation from './components/layout/TheNavigation.vue'
import TheFooter from "@/components/layout/TheFooter.vue";



export default {
  name: 'App',
  components: {
    TheFooter,
    TheNavigation,
  }
}
</script>

<style>

</style>
