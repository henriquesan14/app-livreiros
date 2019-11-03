<template>
  <div class="home">
    <PageTitle icon="fas fa-chart-line" main="Analytics" sub="Estatisticas Gerais últimos 30 dias" />
    <div v-if="loaded" class="box-cards-dashboard">
      <Card cor="#007bff" icon="fas fa-book" :value="pageRelatorios.relatorios.dadosPedioLivros.dadosQtdLivros.sum" desc="Livros vendidos" />
      <Card cor="#28a745" icon="fas fa-dollar-sign" :value="formataValor(pageRelatorios.relatorios.DadosValorTotal.sum)" desc="Ganho total" />
      <Card cor="#dc3545" icon="fas fa-chart-bar" :value="formataValor(pageRelatorios.relatorios.DadosValorTotal.avg)" desc="Média valor/pedido" />
      <Card cor="#343a40" icon="fas fa-chart-line" :value="formataValor(pageRelatorios.relatorios.dadosPedioLivros.dadosValorUnitLivros.avg)" desc="Média livros vendidos" />
    </div>

    <b-card v-if="loaded">
      <template slot="header">
        <h5 class="title-card-main">{{infosDia()}}</h5>
      </template>
      <b-row>
        <b-col sm="6" md="6">
            <b-badge><span class="title-badge">Total pedidos/dia</span></b-badge>
            <LineChart :chartdata="configLineChart.chartdata" :options="configLineChart.options" />
        </b-col>
        <b-col sm="6" md="6">
            <b-badge><span class="title-badge">Total pedidos/status</span></b-badge>
            <Chart :chartdata="configDoughnutChart.chartdata" :options="configDoughnutChart.options" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6" md="6" >
            <b-badge><span class="title-badge">Total pedidos/tipo</span></b-badge>
            <PieChart :chartdata="configPieChart.chartdata" :options="configPieChart.options" />
        </b-col>
        <b-col sm="6" md="6">
            <b-badge class="mb-2"><span class="title-badge">Total pedidos/usuário</span></b-badge>
            <BarChart :chartdata="configBarChart.chartdata" :options="configBarChart.options" />
        </b-col>
      </b-row>
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
import Stats from "../../services/stats";
import Card from "./Card";
import Pedidos from '../../services/pedidos';
import moment from 'moment';
export default {
  name: "AnalyticsPedidos",
  components: { PageTitle, Chart, LineChart, PieChart, BarChart, Card },
  data() {
    return {
      configLineChart: {},
      configDoughnutChart: {},
      configPieChart: {},
      configBarChart: {},
      pageRelatorios: {},
      loaded: false,
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
      dataExtenso: ""
    };
  },
  mounted() {
    this.getRelatorios();
  },
  methods: {
    infosDia() {
      return `${this.dataAtual.getDate()} de ${
        this.jsonMes[this.dataAtual.getMonth()]
      } ${this.dataAtual.getFullYear()} - ${
        this.jsonDia[this.dataAtual.getDay()]
      }`;
    },
    async getRelatorios(){
      try{
        let startdate = moment();
        startdate = startdate.subtract(30, "days");
        startdate = startdate.format("YYYY-MM-DD");
        const res = await Pedidos.relatorios(0, 100, startdate);
        this.pageRelatorios = res.data;
        this.loaded = true;
        this.lineChart();
        this.doughnutChart();
        this.pieChart();
        this.barChart();
      }catch(err){
        showError(err);
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
              backgroundColor: ["#69C3FF", "#FFFFFF", "#FF8AA3", "#FFDC84", "#A8D0E4"],
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
              backgroundColor: ["#32CD32", "#69C3FF"],
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
    formataValor(value){
      return 'R$ ' + value.toFixed(2).replace('.',',');
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
