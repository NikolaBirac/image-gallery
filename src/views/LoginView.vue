<template>
  <div class="login">
    <div class="login__label">
      <img src="../assets/banner.png">
    </div>

    <div class="login__form">
      <form @submit.prevent="onSubmit">
        <h1>Log in</h1>
        <div>
          <label for="email" class="login__input-label">Email address</label>
          <input
            type="email"
            id="email"
            class="login__input"
            v-model="email">
        </div>
        <div>
          <label for="password" class="login__input-label">Password</label>
          <input
            type="password"
            id="password"
            class="login__input"
            v-model="password">
        </div>

        <div
          v-if="errorMsg"
          class="error">
          {{ errorMsg }}
        </div>

        <button
          class="btn btn__square login__btn"
          :class="{ 'btn__disabled' : isLoading }"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Please wait...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      errorMsg: '',
      isLoading: false
    }
  },

  methods: {
    ...mapActions(['login']),

    async onSubmit () {
      console.log(1)
      this.isLoading = true
      this.errorMsg = ''

      try {
        await this.login({ email: this.email, password: this.password })
        this.$router.push({ name: 'home' })
      } catch ({ message }) {
        this.errorMsg = message
      } finally {
        this.isLoading = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding-top: 60px;

  &__label {
    background: $yellow;
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &__form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: calc(100vh - 170px);
    padding: 50px 20px;

    form {
      max-width: 345px;
    }
  }

  &__input {
    height: 48px;
    width: 100%;
    margin: 14px 0 6px;
    font-size: 18px;
    padding: 0 10px;
    border: 1px solid #A0AEC0;
  
    &-label {
      font-size: 18px;
    }
  }

  &__btn {
    margin-top: 20px;
  }
}
</style>