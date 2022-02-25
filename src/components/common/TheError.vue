<template>
  <div class="error">
    <p>Something went wrong</p>
    <button class="btn btn__square error__btn" @click="refresh">
      <slot v-if="slotPassed" />
      <span v-else>Try again</span>
    </button>
  </div>
</template>

<script>
export default {

  computed: {
    slotPassed() {
      return !!this.$slots.default
    }
  },

  methods: {
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__btn {
    margin-top: 15px;
  }
}

</style>