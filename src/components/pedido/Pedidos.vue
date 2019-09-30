<template>
  <div class="pedidos">
    <PageTitle icon="fa fa-shopping-cart" main="Administração de pedidos" sub="Gerenciar pedidos" />

    <b-card header="pedidos">
      <template slot="header">
        <h5 class="card-title">Pedidos</h5>
      </template>

      <b-row>
        <b-col>
          <b-form-group label="Status">
            <b-form-select size="sm" v-model="status">
              <option :value="''" disabled>Selecione um status</option>
              <option :value="''">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="5" class="mb-3">
          <b-form-group label="Data inicio:">
            <b-form-input
              size="sm"
              type="date"
              v-model="dataInicio"
              placeholder="Pesquise o nome do livro..."
            />
          </b-form-group>
        </b-col>
        <b-col md="5" class="mb-3">
          <b-form-group label="Data Fim:">
            <b-form-input size="sm" type="date" v-model="dataFim" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-table
        class="table-sm"
        :responsive="true"
        :fields="fields"
        v-if="!loader && pagePedidos.rows.length > 0"
        hover
        striped
        :items="pagePedidos.rows"
      >
        <template slot="statusPedido" slot-scope="data">
          <b-badge
            :variant="data.item.statusPedido === 'confirmado' ? 'success' : 'danger'"
          >{{data.item.statusPedido.toUpperCase()}}</b-badge>
        </template>
        <template slot="valorTotal" slot-scope="data">{{data.item.valorTotal | currency}}</template>
        <template slot="actions" slot-scope="data">
          <b-button v-b-tooltip.hover title="Detalhes" size="sm" variant="primary" class="mr-2">
            <i class="fa fa-search-plus"></i>
          </b-button>
        </template>
      </b-table>
      <div v-if="!loader && pagePedidos.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination
        size="sm"
        v-model="page"
        :total-rows="pagePedidos.count"
        :per-page="pagePedidos.limite"
      ></b-pagination>
    </b-card>
  </div>
</template>

<script>
import Loading from "../shared/Loading";
import PageTitle from "../template/PageTitle";
import Pedidos from "../../services/pedidos";
import { showError } from "@/global";
import moment from "moment";
export default {
  name: "Pedidos",
  components: { Loading, PageTitle },
  data() {
    return {
      loader: false,
      pagePedidos: { rows: [] },
      page: 1,
      status: "",
      dataInicio: "",
      dataFim: "",
      fields: [
        { key: "idPedido", label: "Cód.", sortable: true },
        {
          key: "createdAt",
          label: "Data/Hora",
          sortable: true,
          formatter: value => {
            return moment(String(value)).format("DD/MM/YYYY HH:mm");
          }
        },
        { key: "cliente.nomeCliente", label: "Cliente", sortable: true },
        { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
        { key: "tipoPedido", label: "Tipo pedido", sortable: true },
        { key: "valorTotal", label: "Total", sortable: true },
        { key: "statusPedido", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  mounted() {
    this.getPedidos();
  },
  watch: {
    page() {
      this.getPedidos();
    }
  },
  methods: {
    async getPedidos() {
      this.loader = true;
      try {
        const res = await Pedidos.getPedidos(this.page - 1);
        this.pagePedidos = res.data;
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
