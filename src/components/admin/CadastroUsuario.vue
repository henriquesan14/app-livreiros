<template>
  <div class="cadastro-user">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro usuário" />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Novo usuário</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <FormUsuario @submit-user="saveUser" />
    </b-card>
  </div>
</template>

<script>
import Usuario from "../../services/usuarios";
import { showError } from "@/global";
import PageTitle from "../template/PageTitle";
import FormUsuario from "./FormUsuario";
export default {
  name: "CadastroUsuario",
  components: { PageTitle, FormUsuario },
  methods: {
    async saveUser(user) {
      try {
        await Usuario.saveUsuario(user);
        this.$toasted.global.defaultSuccess();
        this.$router.push("/dashboard/usuarios");
      } catch (err) {
        showError(err);
      }
    }
  },
  created() {
    this.$store.dispatch("RESET_USER");
  }
};
</script>

<style>
</style>
