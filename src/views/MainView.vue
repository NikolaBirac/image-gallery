<template>
  <the-header/>

  <div class="main-layout">
    <images-list />
    <image-view />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import ImagesList from '../components/ImagesList.vue'
import ImageView from '../components/ImageView.vue'

export default {
  name: 'MainView',

  components: { TheHeader, ImagesList, ImageView }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-grow: 1;
}
</style>
