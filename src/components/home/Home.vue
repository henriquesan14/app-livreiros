<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Home" sub="Inicio" />
        <b-card>
            <Chart v-if="loaded" :chartdata="chartdata" :options="options" />
            <LineChart v-if="loaded2" :chartdata="chartdata2" :options="options2" />
        </b-card>

        
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Chart from './Chart'
import LineChart from './LineChart'
import { setTimeout } from 'timers';
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'
export default {
    name: 'Home',
    components: {PageTitle, Chart, LineChart},
    data(){
        return {
            loaded: false,
            loaded2: false,
            chartdata: null,
            options: null,
            chartdata2: null,
            options2: null
        }
    },
    mounted(){
        this.getStats();
        this.getStats2();
    },
    methods: {
        async getStats(){
            this.loaded = false;
            try{
                const res = await axios.get(`${baseApiUrl}/estatisticas`);
                
                let labels = res.data.totalPorCondicao.map(x => x.condicaoLivro)
                
                setTimeout(() => {
                    this.chartdata = {
                    labels: ['Novo', 'Usado'],
                    datasets: [
                        {
                        backgroundColor: ['#f87979', '#73A3D8'],
                        data: [40, 20]
                        }
                    ]
                }
                this.options = {
                    responsive: true,
                    maintainAspectRatio: false
                },
                this.loaded = true;
                }, 2000)
            }catch(err){
                console.log(err)
            }
        },
        async getStats2(){
            this.loaded2 = false;
            try{
                const res = await axios.get(`${baseApiUrl}/estatisticas`);
                
                let labels = res.data.adicionadosMesPorDia.map(x => x.dia);
                let data = res.data.adicionadosMesPorDia.map(x => x.totalAdiconado);
                this.labels2 = labels;
                this.datasets2 = [
                    {backgroundColor: '#f87979', data: data},
                ]
                this.options2 = {
                    responsive: true,
                    maintainAspectRatio: false
                },
                this.loaded2 = true;
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style>
    .stats{
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap
    }
</style>
