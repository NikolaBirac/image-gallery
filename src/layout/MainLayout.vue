<template>
  <the-header ref="header" />

  <router-view></router-view>
</template>

<script>
import TheHeader from "../components/TheHeader";

export default {
  components: { TheHeader },

  mounted() {
    // console.log(this.$refs.header.height)
    window.addEventListener('DOMContentLoaded', () =>{
      let header = document.getElementsByTagName("header")[0];
      let list = document.getElementsByClassName("list")[0];
      // console.log(headerHeight);
      header.addEventListener("change", function () {
        let headerHeight = header.clientHeight;
        let newListHeight = `calc(100vh - ${headerHeight}px)`;
        list.style.height = newListHeight;
      });
      var chg = new Event("change");
      header.dispatchEvent(chg);
    });
  }
}
</script>

<style>
</style>