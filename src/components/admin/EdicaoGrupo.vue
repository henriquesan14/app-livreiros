<template>
  <div>
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Alteração grupo" />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Alteração grupo</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <Loading :loader="loader"/>
      <FormGrupo v-if="!loader" @submit-grupo="editGrupo" />
    </b-card>
  </div>
</template>

<script>
import FormGrupo from "./FormGrupo";
import PageTitle from "../template/PageTitle";
import Grupo from "../../services/grupos";
import Loading from '../shared/Loading';
import {showError} from '@/global';
export default {
  name: "EdicaoGrupo",
  components: { FormGrupo, PageTitle, Loading },
  data() {
    return {
      loader: false,
    };
  },
  mounted(){
    this.getGrupo(this.$route.params.id); 
  },
  methods: {
    async getGrupo(id) {
      this.loader = true;
      try {
        const res = await Grupo.getGrupo(id);
        this.$store.dispatch("SET_GRUPO", { grupo: res.data });
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    async editGrupo(grupo) {
      try {
        await Grupo.editGrupo(grupo.idGrupo, grupo);
        this.$toasted.global.defaultSuccess();
        this.$router.push("/dashboard/usuarios");
      } catch (err) {
        showError(err);
      }
    }
  }
};
</script>
    
<style>
</style>
