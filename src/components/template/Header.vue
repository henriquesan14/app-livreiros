<template>
  <header class="header">
    <div class="box-logo">
      <i @click="toggleMenu()" class="fas fa-bars"></i>
      <router-link to="/dashboard">
        <img src="@/assets/logo.png" width="200" alt="logo" id="logo-header"/>
      </router-link>
    </div>
    <UserDropdown />
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  components: { UserDropdown },
  computed: {
    ...mapGetters(["isMenuVisible"])
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("toggleMenu");
    }
  }
};
</script>

<style lang="scss">

img#logo-header{
  height:30px;
  width:100px;
}
.header {
  grid-area: header;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom:1px solid #c2c2c2;
  justify-content: space-between;
}

.box-logo{
  display: flex;
  align-items: center;
}

.box-logo i{
  cursor: pointer;
  color: #767575;
  font-size: 25px;
  margin: 0 30px 0 20px;
  &:hover{
    color: #2f353a;
  }
}
</style>
