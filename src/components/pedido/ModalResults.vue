<template>
  <b-modal size="lg" id="modal-import-results" hide-footer>
    <template slot="modal-title">Resultados</template>
    <div v-if="!loader" class="d-block">
      <b-table class="table-sm" :fields="fields" :items="results" striped hover>
        <template v-slot:cell(status)="data">
          <b-badge
            :variant="data.item.status == 'ok' ? 'success' : 'danger'"
          >{{data.item.status.toUpperCase()}}</b-badge>
        </template>
      </b-table>
      <b-badge v-if="!results || (results && results.length < 1)"><span class="title-badge">Nenhum resultado.</span></b-badge>
    </div>
    <Loading :loader="loader" />
  </b-modal>
</template>

<script>
import Importacoes from "../../services/importacoes";
import { showError } from "@/global";
import Loading from "../shared/Loading";
export default {
  name: "ModalResults",
  components: { Loading },
  props: {
    idImportacao: {
      type: Number
    }
  },
  watch: {
    idImportacao() {
      this.getResults();
    }
  },
  data() {
    return {
      results: [],
      loader: false,
      fields: [
        { key: "idExterno", label: "Cód. Externo", sortable: true },
        {
          key: "status",
          label: "Status",
          sortable: true
        },
        { key: "message", label: "Mensagem", sortable: true }
      ]
    };
  },
  methods: {
    async getResults() {
      this.loader = true;
      try {
        const res = await Importacoes.getResults(this.idImportacao);
        this.results = res.data.result;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    }
  }
};
</script>

<style>
</style>