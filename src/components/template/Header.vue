<template>
  <header class="header">
    <a @click="toggleMenu()" class="toggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/dashboard">{{title}}</router-link>
    </h1>
    <UserDropdown />
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String
  },
  computed: {
    ...mapGetters(["isMenuVisible"]),
    icon() {
      return this.isMenuVisible ? "fa fa-angle-left" : "fa fa-angle-down";
    }
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("toggleMenu");
    }
  }
};
</script>

<style lang="scss">
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 1rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
