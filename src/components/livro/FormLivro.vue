<template>
  <div class="form-livro">
    <b-form @submit.prevent="submitLivro()">
      <img
        id="img-livro"
        v-if="livro.imagemLivro || url"
        :src="url ? url  : 'https://imagens-capas-1.s3.amazonaws.com/'+ livro.imagemLivro"
      />

      <button
        v-b-tooltip.hover 
        title="Remover"
        type="button"
        v-if="url"
        @click.prevent="url = null; image=null"
        class="btn-danger btn-center"
      >
        <i class="fa fa-times"></i>
      </button>
      <b-row>
        <b-col md="12">
          <b-form-group label="Imagem:">
            <b-form-file
              @change="onFileChange"
              v-model="image"
              accept="image/jpeg, image/png"
              browse-text="Procurar"
              placeholder="Escolha uma imagem..."
            ></b-form-file>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group label="ISBN: ">
            <b-form-input
              size="sm"
              @blur="searchIsbn()"
              maxlength="13"
              v-model.trim="livro.isbn"
              type="text"
              placeholder="Informe o ISBN..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group :invalid-feedback="invalidFeedBack($v.livro.tituloLivro)" label="Título: *">
            <b-form-input
              size="sm"
              maxlength="100"
              :class="{'is-invalid': submitted && $v.livro.tituloLivro.$invalid, 'is-valid': submitted && !$v.livro.tituloLivro.$invalid}"
              v-model="livro.tituloLivro"
              type="text"
              placeholder="Titulo..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group label="Autor: *">
            <div class="box-form">
              <b-form-input
                @keyup="searchAutores()"
                autocomplete="off"
                size="sm"
                maxlength="100"
                v-model="autor.nomeAutor"
                placeholder="Autor..."
              ></b-form-input>
              <b-button
                size="sm"
                class="btn-form ml-1"
                variant="primary"
                @click.prevent="$bvModal.show('modal-autor')"
              >
                <i class="fa fa-plus mr-1"></i>Novo
              </b-button>
            </div>

            <ul v-if="pageAutores.rows.length > 0" class="list">
              <li
                @click.prevent="selecionaAutor(autor)"
                v-for="autor in pageAutores.rows"
                :key="autor.idAutor"
              >
                <a href="#">{{'#' + autor.idAutor + ' - ' + autor.nomeAutor}}</a>
              </li>
            </ul>

            <b-badge
              class="mt-2 selecionado"
              v-if="livro.idAutor"
              variant="primary"
            >{{'#' + livro.idAutor + ' - ' + livro.nomeAutor}}</b-badge>
            <div>
              <span
                class="text-danger mt-2 font-menor"
                v-if="submitted && $v.livro.idAutor.$invalid"
              >Selecione um autor</span>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group label="Assunto: *">
            <div class="box-form">
              <b-form-input
                @keyup="searchAssuntos()"
                autocomplete="off"
                size="sm"
                maxlength="100"
                v-model="assunto.nomeAssunto"
                placeholder="Assunto..."
              />
              <b-button
                size="sm"
                variant="primary"
                class="btn-form"
                @click.prevent="$bvModal.show('modal-assunto')"
              >
                <i class="fa fa-plus mr-1"></i>Novo
              </b-button>
            </div>

            <ul class="list" v-if="pageAssuntos.rows.length > 0">
              <li
                @click.prevent="selecionaAssunto(assunto)"
                v-for="assunto in pageAssuntos.rows"
                :key="assunto.idAssunto"
              >
                <a href="#">{{'#' + assunto.idAssunto + ' - ' + assunto.nomeAssunto}}</a>
              </li>
            </ul>

            <b-badge
              class="mt-2 selecionado"
              variant="primary"
              v-if="livro.idAssunto"
            >{{'#' + livro.idAssunto + ' - ' + livro.nomeAssunto}}</b-badge>
            <div>
              <span
                class="text-danger font-menor"
                v-if="submitted && $v.livro.idAssunto.$invalid"
              >Selecione um assunto</span>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group label="Editora: *">
            <div class="box-form">
              <b-form-input
                @keyup="searchEditoras()"
                autocomplete="off"
                size="sm"
                maxlength="100"
                v-model="editora.nomeEditora"
                placeholder="Editora..."
              />
              <b-button
                size="sm"
                class="btn-form"
                variant="primary"
                @click.prevent="$bvModal.show('modal-editora')"
              >
                <i class="fa fa-plus mr-1"></i>Nova
              </b-button>
            </div>

            <ul class="list" v-if="pageEditoras.rows.length > 0">
              <li
                @click.prevent="selecionaEditora(editora)"
                v-for="editora in pageEditoras.rows"
                :key="editora.idEditora"
              >
                <a href="#">{{'#' + editora.idEditora + ' - ' + editora.nomeEditora}}</a>
              </li>
            </ul>

            <b-badge
              class="mt-2 selecionado"
              variant="primary"
              v-if="livro.idEditora"
            >{{'#' + livro.idEditora + ' - ' + livro.nomeEditora}}</b-badge>
            <div>
              <span
                class="text-danger font-menor"
                v-if="submitted && $v.livro.idEditora.$invalid"
              >Selecione uma editora</span>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Idioma: " class="mb-3">
            <b-form-input
              size="sm"
              maxlength="35"
              v-model="livro.idiomaLivro"
              type="text"
              placeholder="Idioma..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            :invalid-feedback="invalidFeedBack($v.livro.anoLivro)"
            label="Ano de publicação: *"
            class="mb-3"
          >
            <the-mask
              :class="{'is-invalid': submitted && $v.livro.anoLivro.$invalid, 'is-valid': submitted && !$v.livro.anoLivro.$invalid}"
              class="form-control form-control-sm"
              :mask="'####'"
              v-model="livro.anoLivro"
              type="text"
              placeholder="Ano..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Edição: " class="mb-3">
            <b-form-input
              size="sm"
              maxlength="5"
              v-model="livro.edicaoLivro"
              type="text"
              placeholder="Edição..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            :invalid-feedback="invalidFeedBack($v.livro.precoLivro)"
            label="Preço R$: *"
          >
            <b-form-input
              size="sm"
              :class="{'is-invalid': submitted && $v.livro.precoLivro.$invalid, 'is-valid': submitted && !$v.livro.precoLivro.$invalid}"
              maxlength="10"
              v-money="money"
              v-model="livro.precoLivro"
              type="text"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="Condição: *"
            :invalid-feedback="invalidFeedBack($v.livro.condicaoLivro)"
          >
            <b-form-select
              size="sm"
              :class="{'is-invalid': submitted && $v.livro.condicaoLivro.$invalid, 'is-valid': submitted && !$v.livro.condicaoLivro.$invalid}"
              v-model="livro.condicaoLivro"
            >
              <option :value="null" disabled>Selecione a condição</option>
              <option value="Usado">Usado</option>
              <option value="Novo">Novo</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Qtd. de páginas: ">
            <the-mask
              :mask="'#####'"
              class="form-control form-control-sm"
              v-model="livro.paginasLivro"
              type="text"
              placeholder="Qtd. páginas..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Peso (g): ">
            <the-mask
              :mask="'#####'"
              class="form-control form-control-sm"
              v-model="livro.pesoLivro"
              type="text"
              placeholder="Peso..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Coleção: ">
            <b-form-input
              size="sm"
              maxlength="100"
              v-model="livro.colecaoLivro"
              type="text"
              placeholder="Coleção..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Tradução: ">
            <b-form-input
              size="sm"
              maxlength="100"
              v-model="livro.traducaoLivro"
              type="text"
              placeholder="Tradução..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Ilustração: ">
            <b-form-input
              size="sm"
              maxlength="100"
              v-model="livro.ilustracaoLivro"
              type="text"
              placeholder="Ilustração..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Dimensões: ">
            <b-form-input
              size="sm"
              maxlength="50"
              v-model="livro.dimensaoLivro"
              type="text"
              placeholder="Dimensões..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Acabamento: *"
            :invalid-feedback="invalidFeedBack($v.livro.acabamentoLivro)"
          >
            <b-form-select
              size="sm"
              :class="{'is-invalid': submitted && $v.livro.acabamentoLivro.$invalid, 'is-valid': submitted && !$v.livro.acabamentoLivro.$invalid}"
              v-model="livro.acabamentoLivro"
            >
              <option :value="null" disabled>Selecione o acabamento</option>
              <option value="Capa comum">Capa comum</option>
              <option value="Capa dura">Capa dura</option>
              <option value="Aspiral">Aspiral</option>
              <option value="Livro de Bolso">Livro de bolso</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <b-form-group label="Sinopse: ">
            <b-form-textarea v-model="livro.sinopseLivro" placeholder="Sinopse..." rows="8"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button size="sm" type="submit" class="mr-2" variant="success">
        <i class="fa fa-save mr-1"></i>Salvar
      </b-button>
      <router-link tag="b-button" to="/dashboard/livros" class="btn-dark btn-sm">
        <i class="fa fa-arrow-left mr-1"></i>Voltar
      </router-link>
    </b-form>

    <FormAutor @zera-autor="getAutores(autor.nomeAutor)" :autor="autor" />
    <FormEditora @zera-editora="getEditoras(editora.nomeEditora)" :editora="editora" />
    <FormAssunto @zera-assunto="getAssuntos(assunto.nomeAssunto)" :assunto="assunto" />
  </div>
</template>

<script>
import FormAutor from "./autor/FormAutor";
import FormAssunto from "./assunto/FormAssunto";
import FormEditora from "./editora/FormEditora";
import { showError } from "@/global";
import { mapGetters } from "vuex";
import { required, minValue, minLength } from "vuelidate/lib/validators";
import { VMoney } from "v-money";
import { validationMsg } from "../../config/validation-msgs";
import Livro from "../../services/livros";
export default {
  name: "FormLivro",
  directives: { money: VMoney },
  components: { FormAutor, FormAssunto, FormEditora },
  computed: mapGetters([
    "livro",
    "pageAutores",
    "pageEditoras",
    "pageAssuntos"
  ]),
  validations() {
    return {
      livro: {
        tituloLivro: { required },
        idAutor: { required },
        idEditora: { required },
        idAssunto: { required },
        acabamentoLivro: { required },
        condicaoLivro: { required },
        anoLivro: { required, minLength: minLength(4) },
        precoLivro: { required, minValue: minValue(5) }
      }
    };
  },
  data() {
    return {
      assunto: {
        nomeAssunto: ""
      },
      editora: {
        nomeEditora: ""
      },
      autor: {
        nomeAutor: ""
      },
      image: null,
      submitted: false,
      money: {
        decimal: ".",
        thousands: "",
        precision: 2,
        masked: false
      },
      url: null
    };
  },
  mounted() {
    this.resetStore();
  },
  created() {
    if (this.livro.idLivro) {
      this.convertLivro();
    }
  },
  methods: {
    resetStore() {
      this.resetAutores();
      this.resetAssuntos();
      this.resetEditoras();
    },
    resetAutores() {
      this.$store.dispatch("RESET_AUTORES");
    },
    resetAssuntos() {
      this.$store.dispatch("RESET_ASSUNTOS");
    },
    resetEditoras() {
      this.$store.dispatch("RESET_EDITORAS");
    },
    async searchIsbn() {
      if (this.livro.isbn.length >= 10) {
        let loader = this.$loading.show();
        try {
          const res = await Livro.searchIsbn(this.livro.isbn);
          this.importToInput(res);
        } catch (err) {
          showError(err);
        } finally {
          loader.hide();
        }
      }
    },
    importToInput(res) {
      this.autor.nomeAutor = res.data.busca.autorLivro;
      this.editora.nomeEditora = res.data.busca.editoraLivro;
      let livro = { ...this.livro };
      livro.tituloLivro = res.data.busca.tituloLivro;
      livro.paginasLivro = res.data.busca.paginasLivro;
      livro.anoLivro ? (livro.anoLivro = res.data.busca.anoLivro) : null;
      livro.sinopseLivro = res.data.busca.sinopseLivro;
      this.$store.dispatch("SET_LIVRO", { livro: livro });
    },
    convertLivro() {
      this.livro.nomeAutor = this.livro.autor.nomeAutor;
      this.livro.nomeEditora = this.livro.editora.nomeEditora;
      this.livro.nomeAssunto = this.livro.assunto.nomeAssunto;
    },
    searchAutores() {
      if (this.autor.nomeAutor) {
        this.getAutores(this.autor.nomeAutor);
      } else {
        this.resetAutores();
      }
    },
    selecionaAutor(autor) {
      this.livro.nomeAutor = autor.nomeAutor;
      this.livro.idAutor = autor.idAutor;
      this.resetAutores();
    },
    searchEditoras() {
      if (this.editora.nomeEditora) {
        this.getEditoras(this.editora.nomeEditora);
      } else {
        this.resetEditoras();
      }
    },
    selecionaEditora(editora) {
      this.livro.nomeEditora = editora.nomeEditora;
      this.livro.idEditora = editora.idEditora;
      this.resetEditoras();
    },
    searchAssuntos() {
      if (this.assunto.nomeAssunto) {
        this.getAssuntos(this.assunto.nomeAssunto);
      } else {
        this.resetAssuntos();
      }
    },
    selecionaAssunto(assunto) {
      this.livro.nomeAssunto = assunto.nomeAssunto;
      this.livro.idAssunto = assunto.idAssunto;
      this.resetAssuntos();
    },
    async getAutores(nome) {
      try {
        await this.$store.dispatch("GET_AUTORES", { nome });
      } catch (err) {
        showError(err);
      }
    },
    async getEditoras(nome) {
      try {
        await this.$store.dispatch("GET_EDITORAS", { nome });
      } catch (err) {
        showError(err);
      }
    },
    async getAssuntos(nome) {
      try {
        await this.$store.dispatch("GET_ASSUNTOS", { nome });
      } catch (err) {
        showError(err);
      }
    },
    async upload() {
      if (this.image) {
        let loader = this.$loading.show();
        const fd = new FormData();
        fd.append("image", this.image);
        try {
          const res = await Livro.uploadImage(fd);
          this.livro.imagemLivro = res.data.imagemLivro;
          this.$emit("submit-livro", this.livro);
        } catch (err) {
          showError(err);
        } finally {
          loader.hide();
        }
      } else {
        this.$emit("submit-livro", this.livro);
      }
    },
    submitLivro() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.upload();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    }
  }
};
</script>

<style scoped lang="scss">
.font-menor {
  font-size: 0.785rem;
}

#img-livro {
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 200px;
  border: 8px solid #0080ff;
  border-radius: 5px;
}

.btn-center {
  display: block;
  margin: 0 auto;
  border: none;
  padding: 8px 15px;
  margin-top: 5px;
  border-radius: 5px;
}

.box-form {
  display: flex;
  align-items: flex-start;
}

.btn-form {
  display: flex;
  align-items: center;
}

ul.list {
  list-style: none;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  margin: 1px 0 0 0;
  padding: 0;
  max-height: 125px;
  overflow: auto;

  li {
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: #efefef;
    }

    a {
      text-decoration: none;
      color: #000;
      font-weight: bold;
    }
  }
}

.selecionado {
  font-weight: bold;
  font-size: 1.1em;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  background-color: #0080ff;
}
</style>
