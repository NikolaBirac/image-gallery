<template>
  <div class="login">
    <div class="login__label"></div>

    <div class="login__form">
      <form @submit.prevent="onSubmit">
        <h1>Log in</h1>
        <div>
          <label for="email" class="login__input-label">Email address</label>
          <input type="email" id="email" class="login__input">
        </div>
        <div>
          <label for="password" class="login__input-label">Password</label>
          <input type="password" id="password" class="login__input">
        </div>

        <div class="login__error">
          Wrong email/password
        </div>

        <button class="btn btn__square login__btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit () {
      console.log('login')
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  max-width: 700px;
  height: 100%;
  // background: red;
  padding-top: 60px;

  &__label {
    background: $yellow;
    width: 100%;
    height: 110px;
  }
  
  &__form {
    display: flex;
    justify-content: end;
    align-items: center;
    min-height: calc(100vh - 170px);
    padding: 50px 20px;
  }

  &__input {
    height: 48px;
    width: 100%;
    margin: 14px 0 6px;
    font-size: 18px;
    padding: 0 10px;
    border: 1px solid #A0AEC0;

    &:last-child {
      margin-bottom: 0;
    }
  
    &-label {
      font-size: 18px;
    }
  }

  &__btn {
    margin-top: 20px;
  }

  &__error {
    background: rgb(255, 234, 234);
    padding: 10px;
    margin-top: 10px;
    color: red;
    border: 1px solid red;
    word-wrap: break-word;
  }
}
</style>