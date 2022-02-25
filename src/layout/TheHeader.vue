<template>
  <header>
    <button id="menu-trigger" @click="addActiveClass" v-if="isHomePage">
      <img src="../assets/menu-trigger.svg" />
    </button>

    <router-link :to="'/home'">
      <img src="../assets/logo.svg" alt="logo" />
    </router-link>

    <div class="header-wrapper">
      <div class="header-wrapper__user">
        <img src="../assets/ellipse.svg" class="header-wrapper__icon-ellipse" />
        <img src="../assets/user-icon.svg" class="header-wrapper__icon-user" />
      </div>
      <span class="header-wrapper__user-name" v-if="user">{{ name }}</span>
      <img
        src="../assets/arrow-down.svg"
        class="header-wrapper__icon-arrow arrow"
        @click="onLogout"
      />
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import { projectAuth } from "../firebase/config";

export default {
  name: "TheHeader",

  data() {
    return {
      user: null,
    };
  },

  computed: {
    name () {
      return this.user.email.replace(/@.*$/, "");
    },

    isHomePage () {
      return this.$route.name === 'home'
    }
  },

  async mounted() {
    this.user = await projectAuth.currentUser;
  },

  methods: {
    ...mapActions(["logout"]),

    addActiveClass () {
      const gallery = document.getElementsByClassName('list')[0]
      gallery.classList.add('active-menu')
    },

    async onLogout() {
      await this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  #menu-trigger {
    height: 64px;
    width: 64px;
    border: 3px solid #000;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    display: none;
    @media screen and (max-width: 991px) {
      display: block;
    }
  }
  min-height: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $yellow;
  padding: 7px 65px;
  @media screen and (max-width: 991px) {
   padding: 7px 30px 7px 12px;
  }
}

.header-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  img.arrow {
    transition: 0.3s all ease;
  }
  &:hover {
    img.arrow {
      transform: rotate(180deg);
    }
  }
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
  @media screen and (max-width: 991px) {
    display: none;
  }
}
</style>