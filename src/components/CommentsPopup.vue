<template>
  <div class="comments">
    <div v-if="isOpen" class="comments__popup">
      <div class="comments__header">
        <img src="../assets/arrow-left.svg" alt="">
        <span class="comments__title">Image name</span>
      </div>
      <div class="comments__content">
        <div class="comments__img">
          <img src="../assets/circle.jpg" alt="">
        </div>

        <comment-item
          v-for="(comment, index) of comments"
          :key="index"
          :comment="comment"
          @openDialog="setDeleteMode"
          @onEdit="onEdit"/>
  
      </div>
      <div class="comments__create">
        <textarea
          ref="commentRef"
          v-model="comment"
          rows="1"
          placeholder="LEAVE COMMENT"
          class="comments__input" />
        <button class="btn comments__input-icon">
          <img src="../assets/send.svg" alt="send">
        </button>
      </div>

      <delete-comment-popup
        v-if="isDeleteMode"
        isDeleteMode="isDeleteMode"
        @closeDeleteMode="setDeleteMode"
      />
    </div>

    <button class="btn btn__circle comments__floating" @click="closeModal">
      <img src="../assets/ellipse-yellow.svg" alt="">
      <img v-if="isOpen" src="../assets/close.svg" alt="" class="comments__floating-icon">
      <img v-else src="../assets/comment.svg" alt="" class="comments__floating-icon">
      <!-- <img else src="../assets/comment-part.svg" alt="" class="comments__floating--close"> -->
    </button>
  </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import CommentItem from './CommentItem.vue'
import DeleteCommentPopup from './DeleteCommentPopup.vue'

export default {
  name: 'CommentsPopup',

  components: { CommentItem, DeleteCommentPopup },

  setup () {
    const isOpen = ref(true)
    const isDeleteMode = ref(false)
    const comment = ref('')
    const commentRef = ref(null)

    const comments = ref([
      { id: 10, userId: 1, text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos reprehenderit facilis soluta eveniet culp' },
      { id: 11, userId: 2, text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit' },
      { id: 12, userId: 3, text: 'Lorem ipsum, dolor sit amet consectetur' },
      { id: 13, userId: 3, text: 'Lorem ipsum, dolor sit amet consectetur' },
      { id: 14, userId: 3, text: 'Lorem ipsum, dolor sit amet consectetur' }
    ])

    const setDeleteMode = value => {
      isDeleteMode.value = value
    }

    const onEdit = id => {
      comment.value = comments.value.find( item  => item.id === id).text
      commentRef.value.focus()
    }

    const closeModal = () => {
      isOpen.value = !isOpen.value

      // Reset comment
      comment.value = ''
    }

    return { isOpen, comments, isDeleteMode, comment, commentRef, closeModal, setDeleteMode, onEdit }
  }
}
</script>

<style lang="scss" scoped>
.comments {
  position: absolute;
  bottom: 40px;
  right: 30px;
  z-index: 10;

  &__floating {
    float: right;
    margin-top: 15px;
    position: relative;
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.25));
    border-radius: 150px;

    // &-icon {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    // }
  }

  &__popup {
    background-color: #fff;
    // max-height: 70%;
    width: 375px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
  }

  &__header {
    padding: 18px 25px;
    background: $yellow;
  }

  &__title {
    margin-left: 20px;
    font-size: 18px;
    font-weight: 700;
  }

  &__content {
    padding: 18px 20px;
    max-height: 500px;
    overflow: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;  /* Remove scrollbar space */
      background: transparent;  /* Make scrollbar invisible */
    }
  }

  &__img {
    padding: 0 10px;

    img {
      width: 100%;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin-bottom: 10px;
    }
  }

  &__create {
    border-top: 1px solid #ABAFAE;
    position: relative;
  }
  
  &__input {
      width: 100%;
      padding: 17px 70px 12px 30px;
      border: none;
      font-size: 18px;
      resize: none;
      overflow: hidden;

      &::placeholder {
        color: #000;
        font-weight: 500;
      }
    
      &-icon {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

}
</style>