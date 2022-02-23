<template>
  <div class="image">
    <div>
      <img src="../assets/circle.jpg" alt="">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, omnis ratione! Quibusdam id quis numquam deserunt corrupti amet, quos illo iste voluptas volupt.</p>

    </div>
  <teleport to="body">
    <comments-popup />
  </teleport>
  </div>
</template>

<script>
import CommentsPopup from './CommentsPopup.vue'

export default {
  name: 'ImageView',

  components: { CommentsPopup }
}
</script>

<style lang="scss" scoped>
.image {
  width: 50%;
  margin: 0 auto;
  padding: 90px 0;

  img {
    width: 100%;
    margin-bottom: 50px;
  }

  p {
    font-size: 36px;
    font-weight: 900;
    text-align: center;
  }
}

</style>