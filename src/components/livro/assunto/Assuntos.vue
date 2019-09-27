<template>
  <div class="assuntos">
    <PageTitle icon="fa fa-comments" main="Administração de assuntos" sub="Gerenciar assuntos" />

    <b-card header="Assuntos">
      <template slot="header">
        <h5 class="card-title">Assuntos</h5>
      </template>
      <b-button
        v-hasRole="'ESCREVER_ASSUNTO'"
        variant="dark"
        @click="zeraAssunto();$bvModal.show('modal-assunto')"
        class="mb-2"
        size="sm"
      >
        <i class="fa fa-plus-circle mr-1"></i>Novo Assunto
      </b-button>
      <b-row>
        <b-col md="12" sm="12" class="mb-3">
          <b-input-group>
            <b-form-input
              size="sm"
              @keyup.enter="getAssuntos()"
              type="text"
              v-model="nome"
              placeholder="Pesquise o nome do assunto..."
            />
            <b-input-group-append>
              <b-button size="sm" @click="getAssuntos()" variant="primary">
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
        v-if="!loader && pageAssuntos.rows.length > 0"
        hover
        striped
        :items="pageAssuntos.rows"
      >
        <template slot="actions" slot-scope="data">
          <b-button
            v-b-tooltip.hover
            title="Editar"
            size="sm"
            v-hasRole="'ESCREVER_ASSUNTO'"
            @click="loadAssunto(data.item);$bvModal.show('modal-assunto')"
            variant="warning"
            class="mr-2"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
        </template>
      </b-table>
      <div v-if="!loader && pageAssuntos.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination
        size="sm"
        v-model="page"
        :total-rows="pageAssuntos.count"
        :per-page="pageAssuntos.limite"
      ></b-pagination>
    </b-card>
    <FormAssunto @zera-assunto="getAssuntos()" :assunto="assunto" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "../../shared/Loading";
import PageTitle from "../../template/PageTitle";
import FormAssunto from "./FormAssunto";
export default {
  name: "Assuntos",
  components: { Loading, PageTitle, FormAssunto },
  data() {
    return {
      assunto: {},
      loader: false,
      page: 1,
      nome: "",
      fields: [
        { key: "idAssunto", label: "Cód.", sortable: true },
        { key: "nomeAssunto", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  mounted() {
    this.getAssuntos();
  },
  watch: {
    page() {
      this.getAssuntos();
    }
  },
  computed: mapGetters(["pageAssuntos"]),
  methods: {
    async getAssuntos() {
      this.loader = true;
      try {
        await this.$store.dispatch("GET_ASSUNTOS", {
          nome: this.nome,
          page: this.page - 1
        });
      } catch (err) {
        () => {};
      } finally {
        this.loader = false;
      }
    },
    loadAssunto(assunto) {
      this.assunto = { ...assunto };
    },
    zeraAssunto() {
      this.assunto = {};
    }
  }
};
</script>

<style>
</style>
