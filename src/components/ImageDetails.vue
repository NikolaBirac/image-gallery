<template>
  <div class="image-details">
    <!-- Error message -->
    <error v-if="isError" @refresh="loadImage" />

    <div v-if="isImageLoaded">
      <div class="image-details__img">
        <img :src="selectedImage.coverUrl" :alt="selectedImage.title" />
      </div>
      <p>{{ selectedImage.description }}</p>
    </div>
    <div v-if="!selectedId" class="image-details__empty">
      <i>No image selected</i>
    </div>

    <teleport to="body">
      <comments-popup v-if="isImageLoaded" />
    </teleport>

    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommentsPopup from "./CommentsPopup";
import Loading from "./common/TheLoading";
import Error from "./common/TheError";

export default {
  name: "ImageDetails",

  components: { CommentsPopup, Loading, Error },

  data() {
    return {
      isLoading: false,
      isError: false,
    };
  },

  computed: {
    ...mapGetters(["selectedId", "selectedImage"]),

    isImageLoaded() {
      return !!Object.keys(this.selectedImage).length;
    },
  },

  methods: {
    ...mapActions(["getImage", "set"]),

    async loadImage() {
      this.isError = false;
      this.isLoading = true;

      // Reset selected image
      this.set({ state: "selectedImage", data: {} });

      try {
        await this.getImage();
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },

  watch: {
    async selectedId(n, o) {
      if (n !== o) {
        this.loadImage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-details {
  // flex-grow: 1;
  margin: 0 auto;
  padding: 90px 0;

  &__img {
   display: flex;
   justify-content: center;
    img{
      max-height: 60vh;
      height: auto;
    }
  }

  &__empty {
    font-size: 20px;
    color: grey;
  }

  // img {
  //   width: 100%;
  //   height: auto;
  // }

  p {
    margin-top: 50px;
    font-size: 36px;
    font-weight: 900;
    text-align: center;
  }
}
</style>