<template>
  <div class="cadastro-livro">
    <PageTitle icon="fa fa-book" main="Administração de livros" sub="Cadastro livro" />
    <b-card>
      <FormLivro @submit-livro="saveLivro" />
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Novo livro</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/livros">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import FormLivro from "./FormLivro";
import Livro from "../../services/livros";
import { showError } from "@/global";
export default {
  name: "CadastroLivro",
  components: { PageTitle, FormLivro },
  methods: {
    async saveLivro(livro) {
      try {
        await Livro.saveLivro(livro);
        this.$toasted.global.defaultSuccess();
        this.$router.push("/dashboard/livros");
      } catch (err) {
        showError(err);
      }
    }
  },
  created() {
    this.$store.dispatch("RESET_LIVRO");
  }
};
</script>

<style>
</style>
