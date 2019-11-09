<template>
  <div class="c-detalhes-livro">
    <PageTitle icon="fa fa-book" main="Administração de livros" sub="Detalhes livro" />
    <b-card>
      <div>
        <Loading :loader="loader || loaderMovimentos" />
        <div v-if="!loader && !loaderMovimentos" class="d-block">
          <b-row>
            <b-col md="4">
              <img
                class="img-livro"
                :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (livro.imagemLivro == null ? '1557681051638': livro.imagemLivro)"
              />
            </b-col>
            <b-col class="header-livro" md="8">
              <div>
                <h6>{{livro.tituloLivro | toTitle}}</h6>
              </div>
              <div>
                <h6>Qtd. estoque:</h6>
                <span>{{livro.qtdTotal}}</span>
              </div>
              <div>
                <h6>Autor:</h6>
                <span>{{livro.autor.nomeAutor | toTitle}}</span>
              </div>
              <div>
                <h6>Editora:</h6>
                <span>{{livro.editora.nomeEditora | toTitle}}</span>
              </div>
              <div>
                <h6>Assunto:</h6>
                <span>{{livro.assunto.nomeAssunto | toTitle}}</span>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-card no-body header="Informações">
                <div class="card-info">
                  <div class="box-info">
                    <span class="title">Cód.</span>
                    <span>{{livro.idLivro}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">ISBN</span>
                    <span>{{livro.isbn}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Ano</span>
                    <span>{{livro.anoLivro}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Data de criação</span>
                    <span>{{formataData(livro.createdAt)}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Data última atualização</span>
                    <span>{{formataData(livro.updatedAt)}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Condição</span>
                    <span>{{livro.condicaoLivro}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Coleção</span>
                    <span>{{livro.colecaoLivro ? livro.colecao : 'N/A'}}</span>
                  </div>
                </div>
              </b-card>
            </b-col>

            <b-col>
              <b-card no-body header="Informações">
                <div class="card-info">
                  <div class="box-info">
                    <span class="title">Edição</span>
                    <span>{{livro.edicaoLivro ? livro.edicaoLivro : 'N/A'}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Preço</span>
                    <span>{{livro.precoLivro | currency}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Peso</span>
                    <span>{{livro.pesoLivro ? livro.pesoLivro : 'N/A'}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Tradução</span>
                    <span>{{livro.traducaoLivro ? livro.traducaoLivro : 'N/A'}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Acabamento</span>
                    <span>{{livro.acabamentoLivro ? livro.acabamentoLivro : 'N/A'}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Dimensões</span>
                    <span>{{livro.dimensaoLivro ? livro.dimensaoLivro : 'N/A'}}</span>
                  </div>
                  <div class="box-info">
                    <span class="title">Ilustração</span>
                    <span>{{livro.ilustracaoLivro ? livro.ilustracaoLivro : 'N/A'}}</span>
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <b-card header="Sinopse">
                <b-form-group>
                  <b-form-textarea
                    class="text-sinopse"
                    readonly="readonly"
                    cols="100"
                    rows="6"
                    :value="livro.sinopseLivro ? livro.sinopseLivro : 'N/A'"
                  ></b-form-textarea>
                </b-form-group>
              </b-card>
            </b-col>
          </b-row>

          <br />

          <div class="detalhes-livro">
            <b-card>
              <template slot="header">
                <h5 class="text-center">Movimentações</h5>
              </template>
              <Loading :loader="loaderMovimentos" />
              <div v-if="!loaderMovimentos">
                <b-table
                  class="table-sm"
                  :responsive="true"
                  :items="pageMovimentos.rows"
                  :fields="fields"
                  striped
                  hover
                ></b-table>
                <b-pagination
                  size="sm"
                  v-model="page"
                  :total-rows="pageMovimentos.count"
                  :per-page="pageMovimentos.limite"
                ></b-pagination>
                <div v-if="pageMovimentos.rows.length < 1">Nenhuma movimentação</div>
              </div>
            </b-card>
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
        assunto: {}
      },
      loader: false,
      pageMovimentos: { rows: [] },
      loaderMovimentos: false,
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
      this.getMovimentos(this.$route.params.id);
    }
  },
  created() {
    this.getLivro(this.$route.params.id);
    this.getMovimentos(this.$route.params.id);
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
    },
    async getMovimentos(idLivro) {
      this.loaderMovimentos = true;
      try {
        const res = await Livro.getMovimentos(idLivro, this.page - 1);
        this.pageMovimentos = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loaderMovimentos = false;
      }
    },
    formataData(data) {
      return moment(String(data)).format("DD/MM/YYYY HH:mm");
    }
  }
};
</script>

<style lang="scss">
.header-livro {
  div {
    margin-bottom: 10px;
  }

  span {
    font-size: 1rem;
  }

  h6 {
    margin: 0;
    font-weight: bold;
    font-size: 1.3rem;
  }
}

img.img-livro {
  width: 220px;
  height: 280px;
}

.card-info {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}

.box-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  span {
    padding: 0 40px 0 0;
  }

  span.title {
    font-weight: bold;
    font-size: 1rem;
  }
}
</style>
