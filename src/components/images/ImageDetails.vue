<template>
  <div class="image-details">
    <!-- Error message -->
    <error v-if="isError" @refresh="loadImage" />

    <div v-if="isImageLoaded" class="image-details-inner">
      <img
        :src="selectedImage.coverUrl"
        :alt="selectedImage.title"
        @click="changeText"
      />
      <p class="image-main-comment">{{ text }}</p>
    </div>

    <div v-if="!selectedId" class="image-details__empty">
      <i>No image selected</i>
    </div>
    <teleport to="body">
      <comments-modal v-if="isImageLoaded" />
    </teleport>

    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommentsModal from "../comments/CommentsModal";
import Loading from "../shared/TheLoading";
import Error from "../shared/TheError";

export default {
  name: "ImageDetails",

  components: { CommentsModal, Loading, Error },

  data() {
    return {
      isLoading: false,
      isError: false,
      text: "",
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

    changeText() {
      this.text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aliquid non sint praesentium neque assumenda, beatae saepe quasi cum eos nam ex quis provident pariatur facere vero iusto? Ut, dignissimos?  hskdafkljsad kf huskadhfu hsadufh uisa dfhasduk fhkasdh fklhsadlfh  fsda fsda fsad fsda fas sad fsadf sadfsladuflhsadlfh aslkf hask";
    },

    async loadImage() {
      this.isError = false;
      this.isLoading = true;

      // Reset selected image
      this.set({ state: "selectedImage", data: {} });

      try {
        await this.getImage();
        this.text = this.selectedImage.description;
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },

  updated() {
    const container = document.getElementsByClassName("image-details")[0];

    if (container) {
      let para = container.getElementsByClassName("image-main-comment")[0];
      if (para) {
        let contHeight = container.clientHeight;
        let paraHeight = para.clientHeight;
        let viewImg = container.getElementsByTagName("img")[0];
        let pt = window
          .getComputedStyle(container, null)
          .getPropertyValue("padding-top");
        let padding = +pt.replace("px", "") * 2;
        viewImg.style.maxHeight = contHeight - padding - paraHeight + "px";
      }
    }
  },

  watch: {
    async selectedId(n, o) {
      if (n !== o) {
        await this.loadImage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-details {
  margin: 0 auto;
  padding: 90px 0;
  flex: 0 100%;

  &-inner {
    img {
      width: auto;
      vertical-align: middle;
      height: auto;
      max-width: 80%;
      max-height: 50vh;
      margin: 0 auto;
      display: block;
      transition: 0.3s all ease;
    }

    p {
      margin: 0 auto;
      max-width: 80%;
      padding-top: 50px;
      font-size: 36px;
      font-weight: 900;
      text-align: center;
      @media screen and (max-width: 991px) {
        padding-top: 30px;
        font-size: 24px;
      }
      @media screen and (max-width: 575px) {
        padding-top: 30px;
        font-size: 20px;
      }
    }
  }
  &__empty {
    text-align: center;
    font-size: 20px;
    color: grey;
  }

  @media screen and (max-width: 991px) {
    min-height: calc(100vh - 84px);
  }
}
</style>