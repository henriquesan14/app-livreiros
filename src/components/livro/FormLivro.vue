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
              <Autocomplete
                :valorInicial="livro.nomeAutor"
                :idAutocomplete="1"
                :shouldReset="false"
                title="Selecione um autor..."
                :items="pageAutores.rows"
                filterby="nomeAutor"
                @selected="autorSelected"
                @change="onChangeAutor"
              />
              <b-button
                size="sm"
                class="btn-form ml-1"
                variant="primary"
                @click.prevent="$bvModal.show('modal-autor')"
              >
                <i class="fa fa-plus mr-1"></i>Novo
              </b-button>
            </div>

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
              <Autocomplete
                :valorInicial="livro.nomeAssunto"
                :idAutocomplete="2"
                :shouldReset="false"
                title="Selecione um assunto..."
                :items="pageAssuntos.rows"
                filterby="nomeAssunto"
                @selected="assuntoSelected"
                @change="onChangeAssunto"
              />
              <b-button
                size="sm"
                variant="primary"
                class="btn-form ml-1"
                @click.prevent="$bvModal.show('modal-assunto')"
              >
                <i class="fa fa-plus mr-1"></i>Novo
              </b-button>
            </div>
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
              <Autocomplete
                :valorInicial="livro.nomeEditora"
                :idAutocomplete="3"
                :shouldReset="false"
                title="Selecione uma editora..."
                :items="pageEditoras.rows"
                filterby="nomeEditora"
                @selected="editoraSelected"
                @change="onChangeEditora"
              />
              <b-button
                size="sm"
                class="btn-form ml-1"
                variant="primary"
                @click.prevent="$bvModal.show('modal-editora')"
              >
                <i class="fa fa-plus mr-1"></i>Nova
              </b-button>
            </div>
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
import { validationMsg } from "../../utils/validation-msgs";
import Livro from "../../services/livros";
import Autocomplete from "../shared/Autocomplete";
export default {
  name: "FormLivro",
  directives: { money: VMoney },
  components: { FormAutor, FormAssunto, FormEditora, Autocomplete },
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
      if (this.livro.isbn && this.livro.isbn.length >= 10) {
        let loader = this.$loading.show();
        try {
          const res = await Livro.searchIsbn(this.livro.isbn);
          if(res.data != ""){
            this.importToInput(res);
            return;
          }
          showError('ISBN inválido/não encontrado');
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
      res.data.busca.tituloLivro
        ? (livro.tituloLivro = res.data.busca.tituloLivro)
        : null;
      res.data.busca.anoLivro
        ? (livro.anoLivro = res.data.busca.anoLivro)
        : null;
      res.data.busca.idiomaLivro
        ? (livro.idiomaLivro = res.data.busca.idiomaLivro)
        : null;
      res.data.busca.paginasLivro
        ? (livro.paginasLivro = res.data.busca.paginasLivro)
        : null;
      res.data.busca.sinopseLivro
        ? (livro.sinopseLivro = res.data.busca.sinopseLivro)
        : null;
      res.data.busca.taducaoLivro
        ? (livro.traducaoLivro = res.data.busca.taducaoLivro)
        : null;
      res.data.busca.pesoLivro
        ? (livro.pesoLivro = res.data.busca.pesoLivro)
        : null;
      res.data.busca.edicaoLivro
        ? (livro.edicaoLivro = res.data.busca.edicaoLivro)
        : null;
      if (res.data.busca.autorLivro) {
        livro.nomeAutor = res.data.busca.autorLivro;
        this.getAutores(livro.nomeAutor);
      }
      if (res.data.busca.editoraLivro) {
        livro.nomeEditora = res.data.busca.editoraLivro;
        this.getEditoras(livro.nomeEditora);
      }
      res.data.busca.imagemLivro
        ? (livro.imagemLivro = res.data.busca.imagemLivro.imagemLivro)
        : null;
      this.$store.dispatch("SET_LIVRO", { livro: livro });
    },
    convertLivro() {
      this.livro.nomeAutor = this.livro.autor.nomeAutor;
      this.livro.nomeEditora = this.livro.editora.nomeEditora;
      this.livro.nomeAssunto = this.livro.assunto.nomeAssunto;
    },
    async getAutores(nome) {
      try {
        await this.$store.dispatch("GET_AUTORES", { page: 0, nome });
      } catch (err) {
        showError(err);
      }
    },
    async getEditoras(nome) {
      try {
        await this.$store.dispatch("GET_EDITORAS", { page: 0, nome });
      } catch (err) {
        showError(err);
      }
    },
    async getAssuntos(nome) {
      try {
        await this.$store.dispatch("GET_ASSUNTOS", { page: 0, nome });
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
    },
    autorSelected(autor) {
      this.livro.nomeAutor = autor.nomeAutor;
      this.livro.idAutor = autor.idAutor;
      let livro = { ...this.livro };
      this.$store.dispatch("SET_LIVRO", { livro: livro });
    },
    onChangeAutor(nomeAutor) {
      this.autor.nomeAutor = nomeAutor;
      this.getAutores(nomeAutor);
    },
    editoraSelected(editora) {
      this.livro.nomeEditora = editora.nomeEditora;
      this.livro.idEditora = editora.idEditora;
      let livro = { ...this.livro };
      this.$store.dispatch("SET_LIVRO", { livro: livro });
    },
    onChangeEditora(nomeEditora) {
      this.editora.nomeEditora = nomeEditora;
      this.getEditoras(nomeEditora);
    },
    assuntoSelected(assunto) {
      this.livro.nomeAssunto = assunto.nomeAssunto;
      this.livro.idAssunto = assunto.idAssunto;
      let livro = { ...this.livro };
      this.$store.dispatch("SET_LIVRO", { livro: livro });
    },
    onChangeAssunto(nomeAssunto) {
      this.assunto.nomeAssunto = nomeAssunto;
      this.getAssuntos(nomeAssunto);
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
  border: 4px solid #0080ff;
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
</style>
