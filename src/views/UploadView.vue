<template>
  <div class="upload">
    <form @submit.prevent="upload" class="upload__form">
      <h1>Upload Image</h1>

      <input
        v-model.trim="title"
        type="text"
        placeholder="Title"
        class="upload__input">
      <!-- <input v-model.trim="description" type="text" placeholder="Description" class="upload__input"> -->
      <input
        type="file"
        accept="image/*"
        class="upload__choose-file"
        @change="setFile">

      <p v-if="true" class="error">Something went wrong!</p>

      <button
        class="btn btn__square"
        :class="{ 'btn__disabled' : isDisabled || isLoading }"
        :disabled="isDisabled"
      >
        {{ isLoading ? 'Uploading...' : 'Upload'}}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timestamp } from '../firebase/config'

export default {
  name: 'UploadView',

  data () {
    return {
      title: '',
      description: '',
      file: null,
      isError: false,
      isLoading: false
    }
  },

  computed: {
    isDisabled () {
      return !this.title || !this.file
    }
  },

  methods: {
    ...mapActions(['uploadImage', 'addDoc']),

    async upload () {
      this.isLoading = true
      this.isError = false

      try {
        const url = await this.uploadImage(this.file)
  
        await this.addDoc({
          state: 'images',
          data: {
            title: this.title,
            description: this.description,
            userId: 1,
            userName: 'Nikola',
            coverUrl: url,
            createdAt: timestamp()
          }
        })
        // Redirect to Home page
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },

    setFile (e) {
      this.isError = false
      const selected = e.target.files[0]

      // Allowed file types
      const allowTypes = ['image/png', 'image/jpeg']

      if (selected && allowTypes.includes(selected.type)) {
        this.file = selected
      } else {
        this.file = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__form {
    width: 500px;
    padding: 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  &__input {
    height: 48px;
    width: 100%;
    margin: 10px 0;
    font-size: 18px;
    padding: 0 10px;
    border: 1px solid #A0AEC0;
  }

  &__choose-file {
    margin-top: 10px;
  }
}

</style>