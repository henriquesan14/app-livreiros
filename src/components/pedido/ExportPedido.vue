<template>
  <div class="export-pedido">
    <PageTitle icon="fa fa-cloud-download" main="Administração de pedidos" sub="Exportar pedidos" />

    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Exportação de Pedido</h5>
          <router-link to="/dashboard/pedidos" tag="button" class="btn-dark btn-sm mb-1">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>

      <div>
        <b-row>
          <b-col>
            <b-form>
              <b-form-group>
                <b-form-file
                  v-model="image"
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  browse-text="Procurar"
                  placeholder="Escolha o arquivo..."
                ></b-form-file>
                <b-button class="mt-2" variant="success" size="sm">
                  <i class="fa fa-cloud-download mr-1"></i>Exportar
                </b-button>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <div class="mb-2">
          <b-badge>
            <span class="title-badge">Últimas Importações</span>
          </b-badge>
          <b-button @click="getExportacoes" size="sm" variant="dark" class="ml-2">
            <i class="fa fa-refresh mr-1"></i>Atualizar Exportações
          </b-button>
        </div>

        <Loading :loader="loader" />
        <div v-if="!loader">
          <b-table class="table-sm" :fields="fields" :items="pageExportacoes.rows" striped hover>
            <template slot="statusImportacaoPEdido" slot-scope="data">
              <b-badge
                :variant="data.item.statusImportacaoPEdido == 'finalizado' ? 'success' : 'danger'"
              >{{data.item.statusImportacaoPEdido.toUpperCase()}}</b-badge>
            </template>
            <template slot="actions" slot-scope="data">
              <b-button @click="navigate(data.item.idImportacao)" variant="primary" size="sm">
                <i class="fa fa-search-plus"></i>
              </b-button>
            </template>
          </b-table>
          <b-pagination
            size="sm"
            v-model="page"
            :total-rows="pageExportacoes.count"
            :per-page="pageExportacoes.limite"
          ></b-pagination>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Loading from "../shared/Loading";
import Importacoes from "../../services/importacoes";
import { showError } from "@/global";
import moment from 'moment';
export default {
  name: "ExportPedido",
  components: { PageTitle, Loading },
  watch: {
    page() {
      this.getExportacoes();
    }
  },
  mounted() {
    this.getExportacoes();
  },
  data() {
    return {
      image: null,
      page: 1,
      loader: false,
      pageExportacoes: {
        rows: []
      },
      fields: [
        { key: "idImportacaoPedido", label: "Cód.", sortable: true },
        {
          key: "createdAt",
          label: "Data/Hora",
          sortable: true,
          formatter: value => {
            return moment(String(value)).format("DD/MM/YYYY HH:mm");
          }
        },
        { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
        { key: "statusImportacaoPEdido", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    navigate(id) {
      this.$router.push({ name: "edicao-grupo", params: { id } });
    },
    async getExportacoes() {
      this.loader = true;
      try {
        const res = await Importacoes.getImportacoes(this.page - 1);
        this.pageExportacoes = res.data;
      } catch (err) {
        showError(err);
      }finally{
        this.loader = false;
      }
    }
  }
};
</script>

<style>
</style>