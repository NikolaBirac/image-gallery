<template>
  <div class="main-layout">
    <images-list />
    <image-details />
  </div>
</template>

<script>
import ImagesList from '../components/images/ImagesList.vue'
import ImageDetails from '../components/images/ImageDetails.vue'

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
