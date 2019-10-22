<template>
  <div class="autores">
    <PageTitle icon="fas fa-user-cog" main="Administração de autores" sub="Gerenciar autores" />

    <b-card header="Autores">
      <template slot="header">
        <h5 class="card-title">Autores</h5>
      </template>
      <b-button
        v-hasRole="'ESCREVER_AUTOR'"
        variant="dark"
        @click="zeraAutor();$bvModal.show('modal-autor')"
        class="mb-2"
        size="sm"
      >
        <i class="fa fa-plus-circle mr-1"></i>Novo Autor
      </b-button>
      <b-row>
        <b-col md="12" sm="12" class="mb-3">
          <b-input-group>
            <b-form-input
              size="sm"
              @keyup.enter="getAutores()"
              type="text"
              v-model="nome"
              placeholder="Pesquise o nome do autor..."
            />
            <b-input-group-append>
              <b-button size="sm" @click="getAutores()" variant="primary">
                <i class="fa fa-search"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

      <b-table
        class="table-sm"
        :responsive="true"
        :fields="fields"
        v-if="!loader && pageAutores.rows.length > 0"
        hover
        striped
        :items="pageAutores.rows"
      >
        <template v-slot:cell(actions)="data">
          <b-button
            v-b-tooltip.hover
            title="Editar"
            size="sm"
            v-hasRole="'ESCREVER_AUTOR'"
            @click="loadAutor(data.item);$bvModal.show('modal-autor')"
            variant="warning"
            class="mr-2"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
        </template>
      </b-table>
      <div v-if="!loader && pageAutores.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination
        size="sm"
        v-model="page"
        :total-rows="pageAutores.count"
        :per-page="pageAutores.limite"
      ></b-pagination>
    </b-card>
    <FormAutor @zera-autor="getAutores()" :autor="autor" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "../../shared/Loading";
import PageTitle from "../../template/PageTitle";
import FormAutor from "./FormAutor";
export default {
  name: "Autores",
  components: { Loading, PageTitle, FormAutor },
  data() {
    return {
      autor: {},
      loader: false,
      page: 1,
      nome: "",
      fields: [
        { key: "idAutor", label: "Cód.", sortable: true },
        { key: "nomeAutor", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  mounted() {
    this.getAutores();
  },
  watch: {
    page() {
      this.getAutores();
    }
  },
  computed: mapGetters(["pageAutores"]),
  methods: {
    async getAutores() {
      this.loader = true;
      try {
        await this.$store.dispatch("GET_AUTORES", {
          nome: this.nome,
          page: this.page - 1
        });
      } catch (err) {
        () => {};
      } finally {
        this.loader = false;
      }
    },
    loadAutor(autor) {
      this.autor = { ...autor };
    },
    zeraAutor() {
      this.autor = {};
    }
  }
};
</script>

<style>
</style>
