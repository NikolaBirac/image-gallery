<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  box-sizing: border-box;
}

body {
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

a {
  text-decoration: none;
  color: inherit;
}

img{
  vertical-align: middle;
}
</style>
