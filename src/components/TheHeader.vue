<template>
  <header>
    <img src="../assets/logo.svg" alt="logo">
    <div class="header-wrapper">
      <div class="header-wrapper__user">
        <img src="../assets/ellipse.svg" alt="ellipse" class="header-wrapper__icon-ellipse">
        <img src="../assets/user-icon.svg" alt="user" class="header-wrapper__icon-user">
      </div>
      <span class="header-wrapper__user-name">user</span>
      <img src="../assets/arrow-down.svg" alt="arrow" class="header-wrapper__icon-arrow">
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $yellow;
  padding: 7px 65px;
}

.header-wrapper {
  display: flex;
  align-items: center;

  &__user {
    position: relative;
  }

  &__icon-user {
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__user-name {
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0 15px 0 10px;
  }

  &__icon-arrow {
    cursor: pointer;
  }
}
</style>