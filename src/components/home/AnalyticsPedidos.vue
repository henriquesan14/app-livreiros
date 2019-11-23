<template>
  <div class="home">
    <PageTitle icon="fas fa-chart-line" main="Analytics" sub="Estatísticas de pedidos dos últimos 30 dias" />
    <b-row>
      <b-col md="4">
        <b-form-group label="Data inicio:">
          <b-form-input
            @change="getRelatorios"
            size="sm"
            type="date"
            v-model="dataInicio"
          />
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group label="Data Fim:">
          <b-form-input @change="getRelatorios" size="sm" type="date" v-model="dataFim" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-button @click="ultimosTrintaDias();getRelatorios();" size="sm" variant="dark"><i class="fa fa-refresh mr-1"></i>Últimos 30 dias</b-button>
      </b-col>
    </b-row>
    <b-card no-body>
      <b-tabs card>
      <b-tab title="Gráficos" active>
        <div v-if="loaded">
      <template slot="header">
        <h5 class="title-card-main"></h5>
      </template>
      <b-row class="mb-1">
        <b-col md="6">
          <b-badge><span class="title-badge">Total pedidos/tipo</span></b-badge>
          <b-card>
            <PieChart :width="200" :height="200" :chartdata="configPieChart.chartdata" :options="configPieChart.options" />
          </b-card>
        </b-col>
        <b-col md="6">
          <b-badge><span class="title-badge">Total pedidos/status</span></b-badge>
          <b-card >
            <Chart :width="200" :height="200" :chartdata="configDoughnutChart.chartdata" :options="configDoughnutChart.options" />
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="7">
          <b-badge><span class="title-badge">Total pedidos/dia</span></b-badge>
          <b-card >
            <LineChart :width="200" :height="220" :chartdata="configLineChart.chartdata" :options="configLineChart.options" />
          </b-card>
        </b-col>
        <b-col md="5">
          <b-badge><span class="title-badge">Total pedidos/usuário</span></b-badge>
          <b-card >
            <BarChart :width="200" :height="220" :chartdata="configBarChart.chartdata" :options="configBarChart.options" />
          </b-card>
        </b-col>
      </b-row>
    </div>
      </b-tab>
      <b-tab title="Relatórios" >
        <Loading :loader="loader" />
        <div v-if="!loader && loaded">
          <b-badge v-if="pageRelatorios.rows.length < 1"><span class="title-badge">Nenhum pedido encontrado nesse período</span></b-badge>
          <b-table class="table-sm"
        :responsive="true"
        v-if="!loader && pageRelatorios.rows.length > 0"
        hover
        striped
        :items="pageRelatorios.rows"
        :fields="fields">
        <template v-slot:cell(statusPedido)="data">
            <b-badge
              :variant="data.item.statusPedido === 'confirmado' ? 'success' : 'danger'"
            >{{data.item.statusPedido.toUpperCase()}}</b-badge>
          </template>
          <template v-slot:cell(valorTotal)="data">{{data.item.valorTotal | currency}}</template>
          <template v-slot:cell(actions)="data">
          <b-button @click="navigate(data.item.idPedido)" v-b-tooltip.hover title="Detalhes" size="sm" variant="primary" class="mr-2">
            <i class="fa fa-search-plus"></i>
          </b-button>
        </template>
          </b-table>
          <b-pagination
          size="sm"
          v-model="page"
          :total-rows="pageRelatorios.count"
          :per-page="pageRelatorios.limite"
        ></b-pagination>
        <div>
          <b-card header="Resumo dos pedidos">
            <h5>Qtd. Pedidos: {{pageRelatorios.count}}</h5>
            <h5>Valor total descontos:{{formataValor(pageRelatorios.relatorios.DadosDescontos.sum)}}</h5>
            <h5>Valor total tarifas:{{formataValor(pageRelatorios.relatorios.DadosTarifas.sum)}}</h5>
            <h5>Valor total pedidos:{{formataValor(pageRelatorios.relatorios.DadosValorTotal.sum)}}</h5>
            <h5>Valor médio por pedido:{{formataValor(pageRelatorios.relatorios.DadosValorTotal.avg)}}</h5>
            <h5>Qtd. livros vendidos:{{pageRelatorios.relatorios.dadosPedioLivros.dadosQtdLivros.sum}}</h5>
            <h5>Valor médio livros vendidos:{{formataValor(pageRelatorios.relatorios.dadosPedioLivros.dadosValorUnitLivros.avg)}}</h5>
          </b-card>
        </div>
      </div>
      </b-tab>
    </b-tabs>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Chart from "./Chart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from './BarChart';
import { showError } from "@/global";
import Pedidos from '../../services/pedidos';
import Loading from '../shared/Loading';
import moment from 'moment';
import { formatCurrency } from '../../utils/format_currency';
export default {
  name: "AnalyticsPedidos",
  components: { PageTitle, Chart, LineChart, PieChart, BarChart, Loading },
  data() {
    return {
      configLineChart: {},
      configDoughnutChart: {},
      configPieChart: {},
      configBarChart: {},
      pageRelatorios: { rows: [], relatorios: []},
      loaded: false,
      loader: false,
      page: 1,
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
      ],
      jsonMes: {
        0: "Janeiro",
        1: "Fevereiro",
        2: "Março",
        3: "Abril",
        4: "Maio",
        5: "Junho",
        6: "Julho",
        7: "Agosto",
        8: "Setembro",
        9: "Outubro",
        10: "Novembro",
        11: "Dezembro"
      },
      jsonDia: {
        0: "Domingo",
        1: "Segunda",
        2: "Terça",
        3: "Quarta",
        4: "Quinta",
        5: "Sexta",
        6: "Sábado"
      },
      dataAtual: new Date(),
      dataExtenso: "",
      dataInicio: '',
      dataFim: ''
    };
  },
  mounted() {
    this.ultimosTrintaDias();
    this.getRelatorios();
  },
  watch: {
    page() {
      this.getRelatorios();
    }
  },
  methods: {
    async getRelatorios(){
      this.loader = true;
      try{
        const res = await Pedidos.relatorios(this.page -1, 100, this.dataInicio, this.dataFim);
        this.pageRelatorios = res.data;
        this.loaded = true;
        this.lineChart();
        this.doughnutChart();
        this.pieChart();
        this.barChart();
      }catch(err){
        showError(err);
      }finally{
        this.loader = false;
      }
    },
    lineChart(){
        let vendasPorDia = this.pageRelatorios.relatorios.vendasPorDia;
        let labels = vendasPorDia.buckets.map(x => x.key_as_string);
        let data = vendasPorDia.buckets.map(x => x.doc_count);
        let listDias = labels.map(x => {
          let date = new Date(x);
          return date.getUTCDate() + "/" + date.getUTCMonth();
        });
        this.configLineChart.chartdata = {
          labels: listDias,
          datasets: [
            {
              label: 'Total de pedidos/dia',
              backgroundColor: "#FF8AA3",
              data: data
            }
          ]
        };
        this.configLineChart.options = {
          responsive: true,
          maintainAspectRatio: false
        };
    },
    doughnutChart(){
        let pedidosPorStatus = this.pageRelatorios.relatorios.totalPorStatusPedidos;
        let labels = pedidosPorStatus.buckets.map(x => x.key);
        let data = pedidosPorStatus.buckets.map(x => x.doc_count);
        this.configDoughnutChart.chartdata = {
          labels: labels,
          datasets: [
            {
              backgroundColor: ["#69C3FF", "#32CD32", "#FF8AA3", "#A8D0E4"],
              data: data
            }
          ]
        };
        this.configDoughnutChart.options = {
          responsive: true,
          maintainAspectRatio: false
        }
    },
    pieChart(){
        let pedidosPorTipo = this.pageRelatorios.relatorios.totalPorTiposPedidos;
        let labels = pedidosPorTipo.buckets.map(x => x.key);
        let data = pedidosPorTipo.buckets.map(x => x.doc_count);
        this.configPieChart.chartdata = {
          labels: labels,
          datasets: [
            {
              backgroundColor: ["#FF8AA3", "#69C3FF"],
              data: data
            }
          ]
        };
        this.configPieChart.options = {
          responsive: true,
          maintainAspectRatio: false
        }
    },
    barChart(){
        let totalPorUsuarios = this.pageRelatorios.relatorios.totalPorUsuarios;
        let labels = totalPorUsuarios.buckets.map(x => x.key);
        let data = totalPorUsuarios.buckets.map(x => x.doc_count);
        this.configBarChart.chartdata = {
          labels: labels,
          datasets: [
            {
              data: data,
              label: 'Qtd. Pedidos',
              backgroundColor: ["#32CD32", "#69C3FF", "#FFDC84", "#FF8AA3", "#A8D0E4"],
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
            }
          ]
        };
        this.configBarChart.options = {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
}
    },
    ultimosTrintaDias(){
      let startdate = moment();
      startdate = startdate.subtract(1, "months");
      startdate = startdate.format("YYYY-MM-DD");
      this.dataInicio = startdate;
    },
    formataValor(value){
      return formatCurrency(value);
    },
    navigate(id) {
      this.$router.push({ name: "pedido-detail", params: { id } });
    }
  }
};
</script>

<style>
.title-card-main {
  font-size: 1rem;
  text-align: center;
}

.title-card {
  text-align: center;
  font-size: 0.875rem;
}

.box-cards-dashboard {
  width: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>
