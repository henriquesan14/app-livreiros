<template>
  <div class="c-detalhes-livro">
    <PageTitle icon="fa fa-book" main="Administração de livros" sub="Detalhes livro" />
    <b-card>
      <div>
        <Loading :loader="loader" />
        <div v-if="!loader" class="d-block">
          <div class="detalhes-livro">
            <div class="box1">
              <div class="infos1">
                <h5 class="info-detalhes">
                  <strong>Cód.:</strong>
                  {{livro.idLivro}}
                </h5>
                <h5 class="info-detalhes">
                  <strong>Titulo:</strong>
                  {{livro.tituloLivro}}
                </h5>
                <h5 class="info-detalhes">
                  <strong>Autor:</strong>
                  {{livro.autor.nomeAutor}}
                </h5>
                <span>
                  <strong>ISBN:</strong>
                  {{livro.isbn ? livro.isbn : 'N/A'}}
                </span>
                <span>
                  <strong>Editora:</strong>
                  {{livro.editora.nomeEditora}}
                </span>
                <span>
                  <strong>Assunto:</strong>
                  {{livro.assunto.nomeAssunto ? livro.assunto.nomeAssunto : 'N/A'}}
                </span>
                <span>
                  <strong>Idioma:</strong>
                  {{livro.idiomaLivro ? livro.idiomaLivro : 'N/A'}}
                </span>
              </div>
              <div>
                <img
                  class="img-livro"
                  :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (livro.imagemLivro == null ? '1557681051638': livro.imagemLivro)"
                  alt
                />
              </div>
            </div>

            <div class="box2">
              <div class="infos2">
                <span>
                  <strong>Ano:</strong>
                  {{livro.anoLivro}}
                </span>
                <span>
                  <strong>Condição:</strong>
                  {{livro.condicaoLivro}}
                </span>
                <span>
                  <strong>Dimensões:</strong>
                  {{livro.dimensaoLivro ? livro.dimensaoLivro : 'N/A'}}
                </span>
                <span>
                  <strong>Coleção:</strong>
                  {{livro.colecaoLivro ? livro.colecaoLivro : 'N/A'}}
                </span>
                <span>
                  <strong>Ilustração:</strong>
                  {{livro.ilustracaoLivro ? livro.ilustracaoLivro : 'N/A'}}
                </span>
              </div>

              <div class="infos3">
                <span>
                  <strong>Edição:</strong>
                  {{livro.edicaoLivro ? livro.edicaoLivro : 'N/A'}}
                </span>
                <span>
                  <strong>Preço:</strong>
                  {{'R$' + livro.precoLivro}}
                </span>
                <span>
                  <strong>Peso:</strong>
                  {{livro.pesoLivro ? livro.pesoLivro : 'N/A'}}
                </span>
                <span>
                  <strong>Tradução:</strong>
                  {{livro.traducaoLivro ? livro.traducaoLivro : 'N/A'}}
                </span>
                <span>
                  <strong>Acabamento:</strong>
                  {{livro.acabamentoLivro}}
                </span>
              </div>

              <div class="infos4">
                <h5 class="qtd-estoque">
                  <strong>Qtd. estoque:</strong>
                  {{livro.qtdTotal}}
                </h5>
              </div>
            </div>
            <div class="box3">
              <b-form-group>
                <label>
                  <strong>Sinopse:</strong>
                </label>
                <b-form-textarea
                  class="text-sinopse"
                  readonly="readonly"
                  cols="100"
                  rows="6"
                  :value="livro.sinopseLivro ? livro.sinopseLivro : 'N/A'"
                ></b-form-textarea>
              </b-form-group>
            </div>
            <h4 class="text-center mt-3">Movimentações</h4>
            <b-table
              class="table-sm"
              :responsive="true"
              :items="livro.livroMovimentos"
              :fields="fields"
              striped
              hover
            ></b-table>
            <b-pagination size="sm" v-model="page" :total-rows="50" :per-page="10"></b-pagination>
            <div v-if="livro.livroMovimentos.length < 1">Nenhuma movimentação</div>
          </div>
        </div>
      </div>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Detalhes Livro</h5>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/livros">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import { showError } from "@/global";
import Loading from "../shared/Loading";
import moment from "moment";
import Livro from "../../services/livros";
import PageTitle from "../template/PageTitle";
export default {
  name: "LivroDetail",
  components: { Loading, PageTitle },
  data() {
    return {
      page: 1,
      livro: {
        autor: {},
        editora: {},
        assunto: {},
        livroMovimentos: [],
        livrosDescritos: []
      },
      date: "2019-05-22 16:10",
      loader: false,
      fields: [
        {
          key: "createdAt",
          label: "Data/Hora",
          sortable: true,
          formatter: value => {
            return moment(String(value)).format("DD/MM/YYYY HH:mm");
          }
        },
        { key: "subIdLivro", label: "SubCód.", sortable: true },
        { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
        { key: "tipoLivroMovimento", label: "Tipo", sortable: true },
        { key: "qtdMovimento", label: "Qtd.", sortable: true }
      ]
    };
  },
  watch: {
    page() {
      console.log('page');
    }
  },
  mounted() {
    this.getLivro(this.$route.params.id);
  },
  methods: {
    async getLivro(id) {
      this.loader = true;
      try {
        const res = await Livro.getLivro(id);
        this.livro = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    }
  }
};
</script>

<style >
textarea.text-sinopse {
  font-size: 0.875rem;
}
label {
  font-size: 0.875rem;
}

span {
  font-size: 0.875rem;
}

h5.qtd-estoque {
  font-size: 1.2rem;
}

h5.info-detalhes {
  font-size: 1.1rem;
  text-align: left;
}

.detalhes-livro {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
}

.box1 {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.infos1 {
  display: flex;
  flex-direction: column;
  font-size: 18px;
}

.box2 {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.infos2 {
  display: flex;
  flex-direction: column;
}

.infos3 {
  display: flex;
  flex-direction: column;
}

.box3 {
  display: flex;
}

img.img-livro {
  width: 190px;
  height: 220px;
}
</style>
