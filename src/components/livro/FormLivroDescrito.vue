<template>
  <div>
    <Loading :loader="loader" />
    <div v-if="!loader">
      <div v-if="!loader" class="table-responsive">
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
              <b-form-input size="sm" v-model="livro.idLivro" readonly/>
            </b-form-group>
          </b-col>
          <b-col>
          <b-form-group label="SubCódigo.">
            <b-form-input
              size="sm"
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
          <b-form-group :label="livroDescrito.idLivroDescrito? 'Qtd. Atual' : 'Qtd.'">
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
              <the-mask mask="####" class="form-control form-control-sm" v-model="livroDescrito.qtd" />
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

        <b-row>
        <b-col md="12" sm="12">
          <b-form-group label="Descrições: *">
            <b-form-checkbox-group class="is-invalid" v-model="livroDescrito.descricoes" name="descricoes">
              <b-form-checkbox
                v-for="desc in descricoes"
                :key="desc.idDescricao"
                :value="desc.idDescricao"
              >{{desc.nomeDescricao}}</b-form-checkbox>
            </b-form-checkbox-group>
            <span
              class="text-danger text-xs"
              v-if="submitted && $v.user.grupos.$invalid"
            >Selecione pelo menos um grupo</span>
          </b-form-group>
        </b-col>
      </b-row>

      </b-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Livro from "../../services/livros";
import LivroDescrito from '../../services/livro-descrito';
import Descricoes from '../../services/descricoes';
import { showError } from "@/global";
import Loading from "../shared/Loading";
import { required } from "vuelidate/lib/validators";
export default {
  name: "FormLivroDescrito",
  components: { Loading },
  mounted() {
    this.getDescricoes();
    this.getLivro(this.$route.params.idlivro);
    if(this.$route.params.idlivrodescrito){
      this.getLivroDescrito(this.$route.params.idlivrodescrito);
    }
  },
  data() {
    return {
      loader: false,
      livro: { autor: {}, editora: {} },
      livroDescrito: { descricoes: []},
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
  validations: {
    livroDescrito: {
      subIdLivro: { required },
      qtdLivro: { required }
    }
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
    async getLivroDescrito(id){
      this.loader = true;
      try{
        const res = await LivroDescrito.getLivroDescrito(id);
        this.livroDescrito = res.data;
        this.livroDescrito.descricoes = res.data.descricoes.map(d => d.idDescricao);
        this.livroDescrito.movimento = 'adicionar';
      }catch(err){
        console.log(err);
      }finally{
        this.loader = false;
      }
    },
    async getDescricoes(){
      try{
        const res = await Descricoes.getDescricoes();
        this.descricoes = res.data;
      }catch(err){
        console.log(err);
      }
    },
    submitLivroDesc() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.livroDescrito.idLivro = this.livro.idLivro;
      this.$emit("submit-livro-desc", this.livroDescrito);
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