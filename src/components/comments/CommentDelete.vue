<template>
  <div class="delete" @click.self="closeDeleteMode">
    <div class="delete__content">
      <p>Do you want to delete comment?</p>
  
      <div>
        <button class="btn delete__btn" @click="closeDeleteMode">Cancel</button>
        <button class="btn delete__btn" @click="onDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CommentDelete',

  methods: {
    ...mapActions(['deleteComment', 'set']),

    onDelete () {
      this.$emit('onDelete')
    },

    closeDeleteMode () {
      this.set({ state: 'deleteCommentId', data: null })
    }
  }
}
</script>

<style lang="scss" scoped>
.delete {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  // position: relative;

  &__content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 100px;
    background: rgb(85, 85, 85);

    font-weight: 100;
    padding: 20px 0;
    text-align: center;
  }

  &__btn {
    width: 50%;
    margin-top: 20px;
    color: #fff;
    text-transform: uppercase;

    &:first-child {
      border-right: 1px solid rgb(168, 168, 168);
    }
  }

  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
}
</style>