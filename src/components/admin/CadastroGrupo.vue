<template>
  <div class="cadastro-grupo">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro grupo" />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Novo grupo</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <FormGrupo @submit-grupo="saveGrupo" />
    </b-card>
  </div>
</template>

<script>
import FormGrupo from "./FormGrupo";
import PageTitle from "../template/PageTitle";
import Grupo from "../../services/grupos";
export default {
  name: "CadastroGrupo",
  components: { FormGrupo, PageTitle },
  data() {
    return {};
  },
  methods: {
    async saveGrupo(grupo) {
      try {
        await Grupo.saveGrupo(grupo);
        this.$toasted.global.defaultSuccess();
        this.$router.push("/dashboard/usuarios");
      } catch (err) {
        showError(err);
      }
    }
  },
  created() {
    this.$store.dispatch("RESET_GRUPO");
  }
};
</script>
    
<style>
</style>
