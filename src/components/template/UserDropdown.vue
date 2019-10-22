<template>
  <div class="flex">
    <router-link v-if="cart.livrosDescritos.length > 0" to="/dashboard/pedidos/atual" class="btn btn-success" tag="button">
      <i class="fas fa-cart-arrow-down mr-1"></i>
      Ir para o pedido atual
      <b-badge variant="danger">{{cart.livrosDescritos.length}}</b-badge>
    </router-link>
    <div class="user-dropdown">
      <div class="user-button">
        <span class="d-none d-sm-block">{{localUser.user.nomeUsuario}}</span>
        <div class="user-dropdown-img">
          <Gravatar :email="localUser.email" alt="user" />
        </div>
        <i class="fa fa-angle-down"></i>
      </div>
      <div class="user-dropdown-content">
        <router-link v-hasRole="'BUSCAR_USUARIO'" to="/dashboard/usuarios">
          <i class="fa fa-cogs"></i>Administração
        </router-link>
        <a href @click.prevent="logout">
          <i class="fa fa-sign-out"></i>Sair
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Gravatar from "vue-gravatar";
export default {
  name: "UserDropdown",
  components: { Gravatar },
  computed: mapGetters(["localUser", "cart"]),
  methods: {
    logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.user-dropdown {
  border-radius: 3px;
  position: relative;
  position: relative;
  height: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.user-button {
  display: flex;
  align-items: center;

  font-weight: 100;
  height: 100%;
  padding: 0 20px;

  span {
    font-size: 1rem;
  }
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 162px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;

  a {
    font-size: 0.9rem;
    text-decoration: none;
    color: #000;
    padding: 10px;
    &:hover {
      background-color: #ededed;
      text-decoration: none;
      color: #000;
    }
  }
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.flex{
  display: flex;
}
</style>
