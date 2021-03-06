<template>
  <div class="pedidos">
    <PageTitle icon="fa fa-shopping-cart" main="Administração de pedidos" sub="Gerenciar pedidos" />

    <b-card header="pedidos">
      <template slot="header">
        <h5 class="card-title">Pedidos</h5>
      </template>
      <router-link to="/dashboard/pedidos/import" class="btn btn-dark btn-sm mb-2 mr-2">
      <i class="fa fa-cloud-download mr-1"></i>
      Importar pedidos</router-link>
      <b-button @click="updateRastreamentos" class="mb-2" size="sm" variant="success">
        <i class="fa fa-refresh mr-1"></i>
        Atualizar rastreamentos</b-button>
      <b-row>
        <b-col>
          <b-form-group label="Tipo">
            <b-form-select @change="getPedidos" size="sm" v-model="tipo">
              <option :value="''" disabled>Selecione um tipo</option>
              <option :value="''">Todos</option>
              <option value="balcao">Balcão</option>
              <option value="on-line">Online</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Status">
            <b-form-select @change="getPedidos" size="sm" v-model="status">
              <option :value="''" disabled>Selecione um status</option>
              <option :value="''">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="finalizado">Finalizado</option>
              <option value="cancelado">Cancelado</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="4" class="mb-3">
          <b-form-group label="Data inicio:">
            <b-form-input
              @change="getPedidos"
              size="sm"
              type="date"
              v-model="dataInicio"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" class="mb-3">
          <b-form-group label="Data Fim:">
            <b-form-input @change="getPedidos" size="sm" type="date" v-model="dataFim" />
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
        <template v-slot:cell(statusPedido)="data">
          <b-badge
            :variant="data.item.statusPedido === 'confirmado' ? 'success' : 'danger'"
          >{{data.item.statusPedido.toUpperCase()}}</b-badge>
        </template>
        <template v-slot:cell(valorTotal)="data">{{data.item.valorTotal | currency}}</template>
        <template v-slot:cell(actions)="data">
          <b-button @click="navigateEditPedido(data.item.idPedido)" v-b-tooltip.hover title="Editar" variant="warning" size="sm" class="mr-2">
          <i class="fa fa-pencil"></i>
          </b-button>
          <b-button @click="navigate(data.item.idPedido)" v-b-tooltip.hover title="Detalhes" size="sm" variant="primary" class="mr-2">
            <i class="fa fa-search-plus"></i>
          </b-button>
          <b-button v-b-tooltip.hover title="Info. Envio" :disabled="data.item.tipoPedido != 'on-line'" size="sm" @click="data.toggleDetails" class="mr-2">
          <i class="fa fa-caret-down mr-1 ml-1"></i>
          </b-button>
        </template>

        <template v-slot:row-details="data">
          <b-card header="Informações Pedido online">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Status Envio:</b></b-col>
              <b-col>
                <b-badge :variant="data.item.pedidoOnline.statusEnvio === 'entregue' ? 'success' : 'danger'">
                  <span class="badge-title">{{data.item.pedidoOnline.statusEnvio.toUpperCase()}}</span>
                </b-badge>
              </b-col>
              <b-col sm="3" class="text-sm-right"><b>Status Pagamento:</b></b-col>
              <b-col>
                <b-badge :variant="data.item.pedidoOnline.statusPagamento === 'pago' ? 'success' : 'danger'">
                  <span class="badge-title">{{data.item.pedidoOnline.statusPagamento.toUpperCase()}}</span>
                </b-badge>
              </b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Info envio:</b></b-col>
              <b-col>{{data.item.pedidoOnline.infoEnvio || "N/A"}}</b-col>
              <b-col sm="3" class="text-sm-right"><b>Data envio:</b></b-col>
              <b-col>{{formataData(data.item.pedidoOnline.dataHoraEnvio) || "N/A"}}</b-col>
              
            </b-row>
          </b-card>
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
      tipo: "",
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
        const res = await Pedidos.getPedidos(
          this.page - 1,
          10,
          this.status,
          this.dataInicio,
          this.dataFim,
          this.tipo
        );
        this.pagePedidos = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    async updateRastreamentos(){
      try{
        await Pedidos.updateRastreamentos();
        this.getPedidos();
      }catch(err){
        showError(err);
      }
    },
    navigate(id) {
      this.$router.push({ name: "pedido-detail", params: { id } });
    },
    navigateEditPedido(id) {
      this.$router.push({ name: "edicao-pedido", params: { id } });
    },
    formataData(value){
      if(value){
        return moment(String(value)).format("DD/MM/YYYY HH:mm");
      }   
    }
  }
};
</script>

<style>
</style>
