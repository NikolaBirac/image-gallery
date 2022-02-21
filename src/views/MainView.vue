<template>
  <image-list />
  <image-view />
</template>

<script>
import ImageList from '../components/ImageList.vue'
import ImageView from '../components/ImageView.vue'

export default {
  name: 'MainView',

  components: { ImageList, ImageView }
}
</script>

<style>

</style>