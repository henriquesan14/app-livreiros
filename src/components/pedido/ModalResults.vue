<template>
  <b-modal size="lg" id="modal-export-results" hide-footer>
    <template slot="modal-title">Resultados</template>
    <div v-if="!loader" class="d-block">
      <b-table class="table-sm" :fields="fields" :items="results" striped hover>
        <template slot="status" slot-scope="data">
          <b-badge
            :variant="data.item.status == 'ok' ? 'success' : 'danger'"
          >{{data.item.status.toUpperCase()}}</b-badge>
        </template>
      </b-table>
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
    idExportacao: {
      type: Number
    }
  },
  watch: {
    idExportacao() {
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
        const res = await Importacoes.getResults(this.idExportacao);
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