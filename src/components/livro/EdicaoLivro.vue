<template>
  <div class="edit-livro">
    <PageTitle icon="fa fa-book" main="Administração de livros" sub="Edição livro" />
    <b-card header="Edição livro">
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Alteração livro</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/livros">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <Loading :loader="loader" />
      <FormLivro v-if="!loader" @submit-livro="editLivro" />
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import FormLivro from "./FormLivro";
import Loading from "../shared/Loading";
import Livro from "../../services/livros";
import { showError } from "@/global";
export default {
  name: "EdicaoLivro",
  components: { PageTitle, Loading, FormLivro },
  data() {
    return {
      loader: false
    };
  },
  mounted() {
    this.getLivro(this.$route.params.id);
  },
  methods: {
    async getLivro(id) {
      this.loader = true;
      try {
        const res = await Livro.getLivro(id);
        this.$store.dispatch("SET_LIVRO", { livro: res.data });
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    async editLivro(livro) {
      try {
        await Livro.editLivro(livro.idLivro, livro);
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
