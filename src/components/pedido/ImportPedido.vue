<template>
  <div class="import-pedido">
    <PageTitle icon="fa fa-cloud-download" main="Administração de pedidos" sub="Importar pedidos" />

    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Importação de Pedidos</h5>
          <router-link to="/dashboard/pedidos" tag="button" class="btn-dark btn-sm mb-1">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>

      <div>
        <b-row>
          <b-col>
            <b-form @submit.prevent="importPedido">
              <b-form-group>
                <b-form-file
                  v-model="file"
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  browse-text="Procurar"
                  placeholder="Escolha o arquivo..."
                ></b-form-file>
                <b-button :disabled="!file" type="submit" class="mt-2" variant="success" size="sm">
                  <i class="fa fa-cloud-download mr-1"></i>Importar
                </b-button>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <div class="mb-2">
          <b-badge>
            <span class="title-badge">Últimas Importações</span>
          </b-badge>
          <b-button @click="getImportacoes" size="sm" variant="dark" class="ml-2">
            <i class="fa fa-refresh mr-1"></i>Atualizar Importações
          </b-button>
        </div>

        <Loading :loader="loader" />
        <div v-if="!loader">
          <b-table class="table-sm" :fields="fields" :items="pageImportacoes.rows" striped hover>
            <template v-slot:cell(statusImportacaoPEdido)="data">
              <b-badge
                :variant="data.item.statusImportacaoPEdido == 'finalizado' ? 'success' : 'danger'"
              >{{data.item.statusImportacaoPEdido.toUpperCase()}}</b-badge>
            </template>
            <template v-slot:cell(actions)="data">
              <b-button
                v-b-tooltip.hover
                title="Detalhes"
               @click="selecionaImportacao(data.item.idImportacaoPedido);$bvModal.show('modal-import-results')" variant="primary" size="sm">
                <i class="fa fa-search-plus"></i>
              </b-button>
            </template>
          </b-table>
          <b-pagination
            size="sm"
            v-model="page"
            :total-rows="pageImportacoes.count"
            :per-page="pageImportacoes.limite"
          ></b-pagination>
        </div>
      </div>
    </b-card>
    <ModalResults :idImportacao="idImportacao" />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Loading from "../shared/Loading";
import Importacoes from "../../services/importacoes";
import Pedidos from "../../services/pedidos";
import { showError } from "@/global";
import moment from "moment";
import ModalResults from './ModalResults';
export default {
  name: "ImportPedido",
  components: { PageTitle, Loading,ModalResults },
  watch: {
    page() {
      this.getImportacoes();
    }
  },
  mounted() {
    this.getImportacoes();
  },
  data() {
    return {
      file: null,
      page: 1,
      loader: false,
      idImportacao: null,
      pageImportacoes: {
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
    async getImportacoes() {
      this.loader = true;
      try {
        const res = await Importacoes.getImportacoes(this.page - 1);
        this.pageImportacoes = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    async importPedido() {
      try {
        const fd = new FormData();
        fd.append("file", this.file);
        await Pedidos.importPedido(fd);
        this.getImportacoes();
        this.$toasted.global.defaultSuccess();
      } catch (err) {
        showError(err);
      }
    },
    selecionaImportacao(id){
      this.idImportacao = id;
    }
  }
};
</script>

<style>
</style>