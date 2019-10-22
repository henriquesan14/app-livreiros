<template>
  <div class="cadastro-livro-descrito">
    <PageTitle
      icon="fas fa-book"
      main="Administração de livros descritos"
      sub="Gerenciar livros descritos"
    />
    <b-card>
      <FormLivroDescrito @submit-livro-desc="saveLivroDescrito" />
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Novo livro descrito</h5>
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
import FormLivroDescrito from "./FormLivroDescrito";
import PageTitle from "../template/PageTitle";
import LivroDescrito from "../../services/livro-descrito";
import { showError } from "@/global";
export default {
  name: "CadastroLivroDescrito",
  components: { FormLivroDescrito, PageTitle },
  methods: {
    async saveLivroDescrito(livroDescrito) {
      try {
        await LivroDescrito.saveLivroDescrito(livroDescrito);
        let loader = this.$loading.show();
        setTimeout(() => {
          loader.hide();
          this.$toasted.global.defaultSuccess();
          this.$router.push("/dashboard/livros");
        }, 2000);
      } catch (err) {
        showError(err);
      }
    }
  }
};
</script>

<style>
</style>