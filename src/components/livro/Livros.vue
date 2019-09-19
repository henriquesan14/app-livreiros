<template>
  <div class="users">
    <PageTitle icon="fa fa-book" main="Administração de livros" sub="Gerenciar livros" />

    <b-card>
      <template slot="header">
        <h5>Livros</h5>
      </template>
      <router-link
        v-hasRole="'ESCREVER_LIVRO'"
        to="/dashboard/livros/cadastro"
        tag="b-button"
        class="mb-2 btn-dark btn-sm"
      >
        <i class="fa fa-plus-circle mr-1"></i>Novo Livro
      </router-link>
      <b-row>
        <b-col md="12" sm="12" class="mb-3">
          <b-input-group>
            <b-form-input
              size="sm"
              @keyup.enter="getLivros()"
              v-model="nomeFiltro"
              type="text"
              placeholder="Pesquise o nome do livro..."
            />
            <b-input-group-append>
              <b-button size="sm" @click="getLivros()" variant="primary">
                <i class="fa fa-search"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

      <Loading :loader="loader" />
      <div v-if="!loader">
        <b-badge class="mb-1">
          <span v-if="pageLivros.tipoResultado === 'todos resultados'" class="title-badge">Foram encontrados {{pageLivros.count}} resultados para sua busca: </span>
          <span v-if="pageLivros.tipoResultado === 'outros resultados'" class="title-badge">Foram encontrados {{pageLivros.count}} resultados relacionados para sua busca: </span>
        </b-badge>
        <div class="scroll-table">
          <div v-for="livro in pageLivros.rows" :key="livro.idLivro">
            <BoxLivro :livro="livro" />
          </div>
        </div>
        <b-pagination
          size="sm"
          v-model="page"
          :total-rows="pageLivros.count"
          :per-page="pageLivros.limite"
        ></b-pagination>
      </div>
      <div v-if="!loader && pageLivros.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
    </b-card>

    <b-modal size="lg" id="new-livro-descrito" hide-footer>
      <template slot="modal-title">Cadastro Livro Descrito</template>
      <div class="d-block">
        <FormLivroDescrito @submit-livro-desc="saveLivroDesc" :livroDescrito="livroDescrito" />
      </div>
    </b-modal>

    <b-modal size="lg" id="edit-livro-descrito" hide-footer>
      <template slot="modal-title">Edição Livro Descrito</template>
      <div class="d-block">
        <FormLivroDescrito @submit-livro-desc="editLivroDesc" />
      </div>
    </b-modal>
    <SolicitacaoLivro />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { mapGetters } from "vuex";
import Loading from "../shared/Loading";
import FormLivroDescrito from "./FormLivroDescrito";
import { showError } from "@/global";
import BoxLivro from "./BoxLivro";
import LivroDescrito from "../../services/livro-descrito";
import SolicitacaoLivro from './SolicitacaoLivro';
export default {
  name: "Livros",
  components: { PageTitle, Loading, FormLivroDescrito, BoxLivro, SolicitacaoLivro },
  computed: mapGetters(["pageLivros", "livroSelecionado", "livroDescrito"]),
  mounted() {
    this.getLivros();
  },
  data() {
    return {
      loader: false,
      page: 1,
      options: [
        { name: "Título", value: "titulo" },
        { name: "Autor", value: "autor" },
        { name: "Editora", value: "editora" }
      ],
      filtroSelecionado: "titulo",
      nomeFiltro: ""
    };
  },
  watch: {
    page() {
      this.getLivros();
    }
  },
  methods: {
    async getLivros() {
      this.loader = true;
      try {
        await this.$store.dispatch("GET_LIVROS", {
          busca: this.nomeFiltro,
          pagina: this.page - 1
        });
      } catch (err) {
        () => {};
      } finally {
        this.loader = false;
      }
    },
    async saveLivroDesc(livroDesc) {
      try {
        await LivroDescrito.saveLivroDescrito(livroDesc);
        this.$toasted.global.defaultSuccess();
        this.$bvModal.hide("new-livro-descrito");
        this.getLivros();
        this.zeraLivroDesc();
      } catch (err) {
        showError(err);
      }
    },
    zeraLivroDesc() {
      this.$store.dispatch("RESET_LIVRO_DESCRITO");
    },
    async editLivroDesc(livroDesc) {
      try {
        await LivroDescrito.editLivroDescrito(
          this.livroDescrito.idLivroDescrito,
          livroDesc
        );
        this.$toasted.global.defaultSuccess();
        this.$bvModal.hide("edit-livro-descrito");
        this.getLivros();
        this.zeraLivroDesc();
      } catch (err) {
        showError(err);
      }
    },
    navigate(id) {
      this.$router.push({ name: "edit-livro", params: { id } });
    }
  }
};
</script>
<style lang="scss">
span {
  font-size: 0.875rem;
}

h5 {
  text-align: center;
  font-size: 1rem;
}

</style>
