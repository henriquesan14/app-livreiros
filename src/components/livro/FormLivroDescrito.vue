<template>
  <div>
    <Loading :loader="loaderLivro || loaderLivroDesc" />
    <div v-if="!loaderLivro && !loaderLivroDesc">
      <div class="table-responsive">
        <table class="table table-hover table-sm table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Ano</th>
              <th>Condicao</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{livro.tituloLivro}}</td>
              <td>{{livro.autor.nomeAutor ? livro.autor.nomeAutor : 'N/A'}}</td>
              <td>{{livro.editora.nomeEditora ? livro.editora.nomeEditora: 'N/A'}}</td>
              <td>{{livro.anoLivro}}</td>
              <td>{{livro.condicaoLivro}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <b-form @submit.prevent="submitLivroDesc()">
        <b-row>
          <b-col>
            <b-form-group label="Código.">
              <b-form-input size="sm" v-model="livro.idLivro" readonly />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="SubCódigo."
              :invalid-feedback="invalidFeedBack($v.livroDescrito.subIdLivro)"
            >
              <the-mask
                mask="SS"
                class="form-control form-control-sm"
                :readOnly="livroDescrito.idLivroDescrito"
                :class="{'is-invalid': submitted && $v.livroDescrito.subIdLivro.$invalid, 'is-valid': submitted && !$v.livroDescrito.subIdLivro.$invalid}"
                v-model="livroDescrito.subIdLivro"
                maxlength="2"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Valor">
              <b-form-input size="sm" :readonly="true" :value="livro.precoLivro" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group
              :label="livroDescrito.idLivroDescrito? 'Qtd. Atual' : 'Qtd.'"
              :invalid-feedback="invalidFeedBack($v.livroDescrito.qtdLivro)"
            >
              <the-mask
                :readOnly="livroDescrito.idLivroDescrito"
                :class="{'is-invalid': submitted && $v.livroDescrito.qtdLivro.$invalid, 'is-valid': submitted && !$v.livroDescrito.qtdLivro.$invalid}"
                mask="####"
                class="form-control form-control-sm"
                v-model="livroDescrito.qtdLivro"
              />
            </b-form-group>
          </b-col>
          <b-col v-if="livroDescrito.idLivroDescrito">
            <b-form-group label="Qtd.">
              <the-mask
                mask="####"
                class="form-control form-control-sm"
                v-model="livroDescrito.qtd"
              />
            </b-form-group>
          </b-col>
          <b-col v-if="livroDescrito.idLivroDescrito">
            <b-form-group label="Tipo Movimento">
              <b-form-select size="sm" v-model="livroDescrito.movimento">
                <option v-for="op in options" :key="op.name" :value="op.value">{{op.name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label="Obs.">
              <b-form-textarea v-model="livroDescrito.obsLivroDescrito" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row v-if="livroDescrito.textLivroDescrito">
          <b-col>
            <b-form-group label="Descrição Atual">
              <b-form-textarea :readonly="true" v-model="livroDescrito.textLivroDescrito" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col>
            <b-button type="submit" class="mr-2" variant="success" size="sm">
              <i class="mr-1 fa fa-save"></i>Salvar
            </b-button>
            <router-link tag="b-button" class="btn-dark btn-sm" to="/dashboard/livros">
              <i class="fa fa-arrow-left mr-1"></i>Voltar
            </router-link>
          </b-col>
        </b-row>

        <div v-for="categoria in categoriasAtivas" :key="categoria.idCategoriaDescricao">
          <h5 class="title-descricoes">
            <strong>{{categoria.nomeCategoriaDescricao}}</strong>
          </h5>
          <b-table class="table-sm" :items="categoria.descricoes" :fields="fields" striped hover>
            <template slot="actions" slot-scope="data">
              <b-form-checkbox-group>
                <b-form-checkbox checked @change="onChangeDesc(data.item.idDescricao)"></b-form-checkbox>
              </b-form-checkbox-group>
            </template>
          </b-table>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Livro from "../../services/livros";
import LivroDescrito from "../../services/livro-descrito";
import Descricoes from "../../services/descricoes";
import { showError } from "@/global";
import Loading from "../shared/Loading";
import { required, minValue } from "vuelidate/lib/validators";
import { validationMsg } from "../../config/validation-msgs";
export default {
  name: "FormLivroDescrito",
  components: { Loading },
  computed: mapGetters(["categoriasAtivas"]),
  mounted() {
    this.$store.dispatch("GET_CATEGORIAS_ATIVAS");
    this.getDescricoes();
    this.getLivro(this.$route.params.idlivro);
    if (this.$route.params.idlivrodescrito) {
      this.getLivroDescrito(this.$route.params.idlivrodescrito);
    }
  },
  data() {
    return {
      loaderLivro: false,
      loaderLivroDesc: false,
      livro: { autor: {}, editora: {} },
      livroDescrito: { descricoes: [] },
      descricoes: [],
      fields: [
        { key: "actions", label: "Ações" },
        { key: "nomeDescricao", label: "Desc.", sortable: true },
        { key: "reducaoPreco", label: "( - ) R$", sortable: true }
      ],
      submitted: false,
      options: [
        { name: "Adicionar", value: "adicionar" },
        { name: "Corrigir", value: "corrigir" },
        { name: "Falta", value: "falta" }
      ]
    };
  },
  validations() {
    return {
      livroDescrito: {
        subIdLivro: { required },
        qtdLivro: { required, minValue: minValue(1) }
      }
    };
  },
  methods: {
    async getLivro(id) {
      this.loaderLivro = true;
      try {
        const res = await Livro.getLivro(id);
        this.livro = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loaderLivro = false;
      }
    },
    async getLivroDescrito(id) {
      this.loaderLivroDesc = true;
      try {
        const res = await LivroDescrito.getLivroDescrito(id);
        this.livroDescrito = res.data;
        this.livroDescrito.descricoes = res.data.descricoes.map(
          d => d.idDescricao
        );
        this.livroDescrito.movimento = "adicionar";
      } catch (err) {
        showError(err);
      } finally {
        this.loaderLivroDesc = false;
      }
    },
    async getDescricoes() {
      try {
        const res = await Descricoes.getDescricoes();
        this.descricoes = res.data;
      } catch (err) {
        showError(err);
      }
    },
    submitLivroDesc() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.livroDescrito.idLivro = this.livro.idLivro;
      this.$emit("submit-livro-desc", this.livroDescrito);
    },
    onChangeDesc(id) {
      if (this.livroDescrito.descricoes.includes(id)) {
        let index = this.livroDescrito.descricoes.indexOf(id);
        this.livroDescrito.descricoes.splice(index, 1);
      } else {
        this.livroDescrito.descricoes.push(id);
      }
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    }
  }
};
</script>
<style>
form {
  font-size: 0.875rem;
}

h5.title-descricoes {
  font-size: 1rem;
  text-align: left;
}
</style>