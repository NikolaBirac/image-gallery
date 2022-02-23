<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

body {
  overflow: hidden;
  position: relative;
}

input:focus,
textarea:focus {
  outline: none;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

h1, p {
  line-height: 150%;
}

h1 {
  font-size: 36px;
  font-weight: 700;
}

.btn {
  border: none;
  cursor: pointer;
  background: none;

  &:active {
    -webkit-tap-highlight-color: transparent;
  }

  &__square {
    background: #277a7f;
    color: #fff;
    padding: 8px 30px 8px 16px;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 150%;
    text-transform: uppercase;

    img {
      margin-left: 15px;
    }

    &--icon {
      padding-right: 10px;
    }
  }

  &__circle {
    position: relative;

    img:last-child {
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

}

</style>
