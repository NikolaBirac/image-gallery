<template>
  <the-header ref="header" />

  <router-view></router-view>
</template>

<script>
import TheHeader from "./TheHeader";

export default {
  components: { TheHeader }
}
</script>

<style>
</style>