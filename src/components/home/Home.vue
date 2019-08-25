<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Home" sub="Analytics" />
    <b-card>
      <template slot="header">
        <h5 class="title-card-main">{{infosDia()}}</h5>
      </template>
      <b-row>
        <b-col sm="6" md="6">
          <b-card>
            <template slot="header">
              <h5 class="title-card">Total Por Condição</h5>
            </template>
            <Chart v-if="loaded" :chartdata="chartdata" :options="options" />
          </b-card>
        </b-col>

        <b-col sm="6" md="6">
          <b-card>
            <template slot="header">
              <h5 class="title-card">Livros Adicionados por dia - Mês Atual</h5>
            </template>
            <LineChart v-if="loaded2" :chartdata="chartdata2" :options="options2" />
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Chart from "./Chart";
import LineChart from "./LineChart";
import { showError } from "@/global";
import Stats from '../../services/stats';
export default {
  name: "Home",
  components: { PageTitle, Chart, LineChart },
  data() {
    return {
      loaded: false,
      chartdata: null,
      options: null,
      loaded2: false,
      chartdata2: null,
      options2: null,
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
    this.getStats();
    this.getStats2();
  },
  methods: {
    infosDia() {
      return `${this.dataAtual.getDate()} de ${
        this.jsonMes[this.dataAtual.getMonth()]
      } ${this.dataAtual.getFullYear()} - ${
        this.jsonDia[this.dataAtual.getDay()]
      }`;
    },
    async getStats() {
      this.loaded = false;
      try {
        const res = await Stats.getStats();
        let labels = res.data.totalPorCondicao.map(x => x.condicaoLivro);
        let data = res.data.totalPorCondicao
          .map(x => x.livrosDescritos)
          .map(y => y[0].total);

        this.chartdata = {
          labels: labels,
          datasets: [{ backgroundColor: ["#FF6384", "#36A2EB"], data: data }]
        };
        (this.options = {
          responsive: true,
          maintainAspectRatio: false
        }),
          (this.loaded = true);
      } catch (err) {
        showError(err);
      }
    },
    async getStats2() {
      this.loaded2 = false;
      try {
        const res = await Stats.getStats();
        let labels = res.data.adicionadosMesPorDia.map(x => x.dia);
        let data = res.data.adicionadosMesPorDia.map(x => x.totalAdiconado);
        let listDias = labels.map(x => new Date(x).getUTCDate());
        this.chartdata2 = {
          labels: listDias,
          datasets: [
            {
              label: this.jsonMes[this.dataAtual.getMonth()],
              backgroundColor: "#f87979",
              data: data
            }
          ]
        };
        (this.options2 = {
          responsive: true,
          maintainAspectRatio: false
        }),
          (this.loaded2 = true);
      } catch (err) {
        showError(err);
      }
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
</style>
