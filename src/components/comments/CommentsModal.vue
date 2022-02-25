<template>
  <div class="comments">
    <div v-if="isOpen" class="comments__popup">
      <div class="comments__header">
        <img
          src="../../assets/arrow-left.svg"
          @click="closeModal"
          style="cursor: pointer"
        />
        <span class="comments__title">{{ selectedImage.title }}</span>
      </div>

      <loading v-if="isLoading" />

      <div v-else class="comments__container" ref="commentsArea">
        <div class="comments__img">
          <img :src="selectedImage.coverUrl" />
        </div>

        <div class="comments__content">
          <!-- Error message -->
          <error v-if="isError" @refresh="loadComments"> Load comments </error>

          <!-- Comments -->
          <comment-item
            v-else
            v-for="(comment, index) of comments"
            :key="index"
            :comment="comment"
            @onEdit="onEdit"
          />
        </div>
      </div>

      <!-- Leave comment -->
      <div class="comments__create">
        <textarea
          @keydown.enter.prevent="sendComment"
          @input="resize"
          ref="textareaRef"
          v-model.trim="text"
          placeholder="LEAVE COMMENT"
          class="comments__textarea"
        />
        <div class="comments__textarea--hidden" ref="hiddenElement"></div>
        <button class="btn comments__textarea-icon" @click="sendComment">
          <img src="../../assets/send.svg" />
        </button>
      </div>
      <!-- Delete comment -->
      <comment-delete
        v-if="deleteCommentId"
        @onDelete="onDelete"
      />
    </div>

    <button class="btn btn__circle comments__floating" @click="closeModal">
      <img src="../../assets/ellipse-yellow.svg" />
      <img
        v-if="isOpen"
        src="../../assets/close.svg"
        class="comments__floating-icon"
      />
      <img v-else src="../../assets/comment.svg" class="comments__floating-icon" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommentItem from "./CommentItem";
import CommentDelete from "./CommentDelete";
import Error from "../shared/TheError";
import Loading from "../shared/TheLoading";
import { projectAuth, timestamp } from "../../firebase/config";

export default {
  name: "CommentsModal",

  components: { CommentItem, CommentDelete, Error, Loading },

  data() {
    return {
      isOpen: false,
      // isDeleteMode: false,
      isError: false,
      isLoading: false,
      isEditMode: false,
      editComment: null,
      text: ''
    }
  },

  computed: {
    ...mapGetters(["comments", "selectedId", "selectedImage", 'deleteCommentId']),
  },

  methods: {
    ...mapActions([
      "sendComment",
      "getComments",
      "addComment",
      "set",
      "updateComment",
      "deleteComment"
    ]),

    resize () {
      const hidden = this.$refs.hiddenElement
      hidden.innerHTML = this.text

      this.$refs.textareaRef.style.height = `${hidden.clientHeight}px`
    },

    async sendComment() {
      if (this.text) {
        if (this.isEditMode) {
          const comment = { ...this.editComment, text: this.text }

          // Update comment
          try {
            await this.updateComment(comment)
          } catch (error) {
            this.isError = true
          }
        } else {
          const user = projectAuth.currentUser
          const comment = {
            text: this.text,
            userId: user.uid,
            userEmail: user.email,
            createdAt: timestamp(),
            imageId: this.selectedId,
          }

          // Add comment
          try {
            await this.addComment({ state: "comments", data: comment })
          } catch (error) {
            this.isError = true
          }
        }
        this.scrollBottom()

        // Reset text
        this.text = ''
      }
    },

    scrollBottom() {
      const el = this.$refs.commentsArea
      el.scrollTop = el.scrollHeight
    },

    onDelete () {
      this.deleteComment()
      this.text = ''
      this.isEditMode = false
      this.editComment = null
    },

    onEdit(comment) {
      this.text = comment.text
      this.isEditMode = true
      this.editComment = comment

      this.$refs.textareaRef.focus()
    },

    async loadComments() {
      this.isError = false
      this.isLoading = true

      try {
        await this.getComments()
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },

    closeModal() {
      this.isOpen = !this.isOpen
    },
  },

  watch: {
    isOpen(n) {
      if (n) {
        this.loadComments()
      } else {
        this.set({ state: "comments", data: [] })
        this.set({ state: "deleteCommentId", data: null })
        this.isEditMode = false
        this.editComment = null
        this.text = ''
      }
    },

    selectedId(n) {
      if (n) {
        this.isOpen = false
      }
    },
  },
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
  }

  &__popup {
    background-color: #fff;
    width: 375px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;

    @media screen and (max-width: 575px) {
      width: initial;
      position: fixed;
      top: 84px;
      left: 0;
      right: 0;
      bottom: 120px;
    }
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

  &__container {
    padding: 18px 20px;
    max-height: 500px;
    min-height: 250px;
    overflow: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0; /* Remove scrollbar space */
      background: transparent; /* Make scrollbar invisible */
    }

    @media screen and (max-width: 575px) {
      max-height: calc(100% - 120px);
    }
  }

  &__content {
    margin-top: 10px;
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
    border-top: 1px solid #abafae;
    position: relative;

    @media screen and (max-width: 575px) {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  &__textarea {
    min-height: 60px;
    height: 60px;
    width: 100%;
    padding: 17px 70px 12px 30px;
    border: none;
    font-size: 18px;
    line-height: 1.5;
    max-height: 135px;
    resize: none;
    overflow-y: scroll;
    word-wrap: break-word;

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

    &--hidden {
      position: fixed;
      visibility: hidden;
      pointer-events: none;
      width: 375px;
      padding: 17px 70px 12px 30px;
      word-wrap: break-word;
    }

    @media screen and (max-width: 575px) {
    display: block
    }
  }
}
</style>