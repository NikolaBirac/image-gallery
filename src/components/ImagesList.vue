<template>
  <div class="list">
    <h1 class="list__title">Image Gallery</h1>

    <div class="list__search">
      <input
        v-model="search"
        type="text"
        placeholder="Search showcase..."
        class="list__search-input">
      <img src="../assets/loop.svg" alt="photo" class="list__search-icon">
    </div>

    <!-- Image list -->
    <div v-if="filteredImages.length">
      <div v-for="(img, index) of filteredImages" :key="index" class="list__item" >
        <div class="list__content">
          <img class="list__img" src="../assets/moon.jpeg" alt="photo">
          <div class="list__item-name">
            {{ img.name }}
          </div>
        </div>
        <button class="btn btn__square btn__square--icon">
          <span>Review</span>
          <img src="../assets/arrow-right.svg" alt="arrow">
        </button>
      </div>
    </div>
    <div v-else>
      No data
    </div>

    <!-- <the-loading /> -->
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { mapActions, mapGetters } from 'vuex'
// import TheLoading from './common/TheLoading.vue'

export default {
  name: 'ImagesList',

  computed: {
    ...mapGetters(['images'])
  },

  methods: {
    ...mapActions(['getImages'])
  },

  mounted () {
    this.getImages()
  },

  // components: { TheLoading },

  setup () {
    const search = ref('')
    const images = ref([
      { name: 'Nice circle', img: 'aaa', description: 'the best' },
      { name: 'circe', img: 'aaa', description: 'the best' },
      { name: 'circe', img: 'aaa', description: 'the best' },
      { name: 'circe', img: 'aaa', description: 'the best' },
      { name: 'circe', img: 'aaa', description: 'the best' },
      { name: 'circe', img: 'aaa', description: 'the best' },
      { name: 'circe', img: 'aaa', description: 'the best' },
    ])

    // onMounted (() => {})
    
    const filteredImages = computed(() => {
      return images.value.filter(({ name }) => {
        return (
          name
            .toLowerCase()
            .includes(search.value.toLowerCase())
        )
      })
    })

    return { search, filteredImages }
  }
}
</script>

<style lang="scss" scoped>
.list {
  overflow: scroll;
  max-height: 1000px;
  height: 100%;
  width: 465px;
  padding: 0 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Make scrollbar invisible */
  }

  &__title {
    margin: 40px 0;
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
      border: 1px solid #ABAFAE;

      &::placeholder {
        color: #A0AEC0;
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
