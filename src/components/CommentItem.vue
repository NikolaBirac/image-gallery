<template>
  <div
    class="comment"
      :class="{ 'comment--right' : isUserComment }"
  >
    <div v-if="!isUserComment" class="comment__avatar"></div>
    <div
      class="comment__text"
      :class="{ 'comment__text--yellow': isUserComment }"
    >
      <p>{{ comment.text }}</p>

      <div v-if="isUserComment" class="comment__edit">
        <button class="btn btn__circle" @click="onEdit">
          <img src="../assets/ellipse-yellow-small.svg">
          <img src="../assets/edit.svg">
        </button>
        <button class="btn btn__circle" @click="onDelete">
          <img src="../assets/ellipse-yellow-small.svg">
          <img src="../assets/delete.svg">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentItem',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      userId: 1
    }
  },

  methods: {
    ...mapActions(['set']),

    isUserComment () {
      return this.comment.userId === this.userId
    },

    onDelete () {
      this.set({ state: 'deleteCommentId', data: this.comment.id })
      // this.$emit("onDelete", this.comment)
    },

    onEdit () {
      this.$emit("onEdit", this.comment)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin: 20px 0;
  display: flex;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &--right {
    justify-content: end;
  }

  &__avatar {
    width: 40px;
    height: 40px;
    background: #C4C4C4;
    border-radius: 50%;
    margin-right: 20px;
  }

  &__text {
    width: 250px;
    background: #C4C4C4;
    padding: 13px 16px 13px 21px;
    font-size: 14px;

    &--yellow {
      background: $yellow;
    }
  }

  &__edit {
    display: none;
  }

  &:hover .comment__edit {
    display: block;
    position: absolute;
    right: -2px;
    bottom: -17px;
    width: 70px;
    display: flex;
    justify-content: space-between;
  }
}
</style>