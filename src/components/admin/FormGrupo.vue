<template>
  <div class="form-grupo">
    <b-form @submit.prevent="submitGrupo()">
      <b-row>
        <b-col md="6">
          <b-form-group label="Nome: "
          :invalid-feedback="invalidFeedBack($v.grupo.nomeGrupo)">
            <b-form-input :class="{'is-invalid': submitted && $v.grupo.nomeGrupo.$invalid, 'is-valid': submitted && !$v.grupo.nomeGrupo.$invalid}"
            maxlength="100" placeholder="Informe o nome do grupo"
             v-model="grupo.nomeGrupo" size="sm"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Categoria: ">
            <b-form-select
              size="sm"
              class="input-perm"
              id="categoriaPermissao"
              @change="getPermissoesCategoria()"
              v-model="categoriaSelecionada"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="success" size="sm" class="mb-2"><i class="fas fa-save mr-1"></i><span>Salvar</span></b-button>
    </b-form>

    <b-badge class="mb-2" variant="primary">
      <span v-if="categoriaSelecionada" id="title-perm">PERMISSÕES CATEGORIA: {{categoriaSelecionada.toUpperCase()}}</span>
    </b-badge>
    <b-table class="table-sm" :fields="fields" :items="permissoes" :responsive="true" hover striped>
      <template slot="check" slot-scope="data">
        <b-form-checkbox-group v-model="grupo.permissoes">
          <b-form-checkbox
            :value="data.item.idPermissao" :key="data.item.idPermissao"
          ></b-form-checkbox>
        </b-form-checkbox-group>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {required} from "vuelidate/lib/validators";
import { validationMsg } from "../../config/validation-msgs";
export default {
  name: "FormGrupo",
  data() {
    return {
      submitted: false,
      options: [
        {value: null, text: "Selecione uma categoria...", disabled: true},
        { value: "usuario", text: "USUÁRIOS" },
        { value: "livro", text: "LIVROS" },
        { value: "assunto", text: "ASSUNTOS" },
        { value: "autor", text: "AUTORES" },
        { value: "editora", text: "EDITORAS" },
        { value: "grupo", text: "GRUPOS" },
        { value: "descricao", text: "DESCRIÇÃO" }
      ],
      categoriaSelecionada: null,
      fields: [
        { key: "check", label: "Ativa" },
        { key: "nomePermissao", label: "Nome", sortable: true }
      ]
    };
  },
  computed: mapGetters(["permissoes", "grupo"]),
  validations(){
    return {
      grupo: {
        nomeGrupo: {required},
        permissoes: {required}
      }
    }
  },
  created() {
    this.getPermissoes();
    if (this.grupo.idGrupo) {
      this.convertGrupo();
    }
  },
  methods: {
    async getPermissoes() {
      await this.$store.dispatch("GET_PERMISSOES");
    },
    async getPermissoesCategoria(){
      await this.$store.dispatch("GET_PERMISSOES_CATEGORIA", this.categoriaSelecionada);
    },
    submitGrupo() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.$emit("submit-grupo", this.grupo);
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    },
    convertGrupo() {
      this.grupo.permissoes = this.grupo.permissoes.map(x => x.idPermissao);
      this.$store.dispatch("SET_GRUPO", { grupo: this.grupo });
    }
  }
};
</script>
    
<style>
#title-perm {
  font-size: 1rem;
}
</style>
