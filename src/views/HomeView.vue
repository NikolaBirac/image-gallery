<template>
  <div class="main-layout">
    <images-list />
    <image-details />
  </div>
</template>

<script>
import ImagesList from '../components/ImagesList.vue'
import ImageDetails from '../components/ImageDetails.vue'

export default {
  name: 'HomeView',

  components: { ImagesList, ImageDetails }
}
</script>

<style scoped>
.main-layout {
  overflow: hidden;
  display: flex;
}
</style>
