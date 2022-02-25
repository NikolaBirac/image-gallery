<template>
  <div class="list">
    <h1 class="list__title">Image Gallery</h1>

    <!-- Upload Button -->
    <div class="list__upload-btn">
      <button class="btn btn__link">
        <router-link :to="'/upload'">Upload Image</router-link>
      </button>
    </div>

    <!-- Search -->
    <div class="list__search">
      <input
        v-model="search"
        type="text"
        placeholder="Search showcase..."
        class="list__search-input"
      />
      <img src="../assets/loop.svg" class="list__search-icon" />
    </div>

    <!-- Error message -->
    <error v-if="isError" @refresh="loadImages" />
    <!-- No data -->
    <div v-else-if="!isLoading && !filteredImages.length">No data</div>
    <!-- Image list -->
    <div v-else>
      <div v-for="img of filteredImages" :key="img.id" class="list__item">
        <div class="list__content">
          <img class="list__img" :src="img.coverUrl" />
          <div class="list__item-name">
            {{ img.title }}
          </div>
        </div>
        <button
          class="btn btn__square btn__square--icon"
          @click="loadImage(img.id)"
        >
          <span>Review</span>
          <img src="../assets/arrow-right.svg" alt="arrow" />
        </button>
      </div>
    </div>

    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "./common/TheLoading";
import Error from "./common/TheError";

export default {
  name: "ImagesList",

  components: { Loading, Error },

  data() {
    return {
      isLoading: true,
      isError: false,
      search: "",
    };
  },

  computed: {
    ...mapGetters(["images", "selectedId"]),

    filteredImages() {
      return this.images.filter(({ title }) => {
        return title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    ...mapActions(["getImages", "set"]),

    loadImage(id) {
      if (this.selectedId !== id) {
        this.set({ state: "selectedId", data: id });
        this.set({ state: "comments", data: [] });
      }
    },

    async loadImages() {
      this.isError = false;
      this.isLoading = true;

      try {
        await this.getImages("images");
      } catch (err) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },

  created() {
    this.loadImages();
  },
};
</script>

<style lang="scss" scoped>
.list {
  overflow: scroll;
  // max-height: 1000px;
  // height: 100%;
  flex: 0 465px;
  max-width: 465px;
  flex-shrink: 0;
  padding: 0 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Make scrollbar invisible */
  }

  &__title {
    margin: 40px 0;
  }

  &__upload-btn {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }

  &__search {
    margin-bottom: 40px;
    height: 50px;
    width: 100%;
    position: relative;

    &-input {
      width: 100%;
      height: 100%;
      padding: 0 40px 0 8px;
      border: 1px solid #abafae;

      &::placeholder {
        color: #a0aec0;
        font-size: 14px;
      }
    }

    &-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__item {
    margin-bottom: 30px;

    &-name {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }
  }

  &__content {
    padding: 25px 18px;
    display: flex;
    align-items: center;
    margin-bottom: 17px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }

  &__img {
    width: 130px;
    height: 75px;
    object-fit: cover;
  }
}
</style>
