<template>
  <div class="export-livros">
    <PageTitle
      icon="fas fa-file-download"
      main="Administração de livros"
      sub="Exportar livros"
    />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Exportação de Livros</h5>
          <router-link to="/dashboard/livros" tag="button" class="btn-dark btn-sm mb-1">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <Loading :loader="loader" />
      <div v-if="!loader">
        <b-button @click="exportLivros" class="mb-2" size="sm" variant="success"><i class="fas fa-file-download mr-1"></i>Iniciar exportação</b-button>
        <b-button @click="getExportacoes" size="sm" variant="dark" class="ml-2 mb-2">
            <i class="fa fa-refresh mr-1"></i>Atualizar Exportações
          </b-button>
        <b-table class="table-sm" :fields="fields" :items="pageExportacoes.rows" striped hover>
          <template v-slot:cell(statusExportacaoLivros)="data">
              <b-badge
                :variant="data.item.statusExportacaoLivros == 'finalizado' ? 'success' : 'danger'"
              >{{data.item.statusExportacaoLivros.toUpperCase()}}</b-badge>
          </template>
          <template v-slot:cell(actions)="data">
              <b-button :disabled="data.item.statusExportacaoLivros != 'finalizado'" @click="downloadExportacao(data.item.arquivoExportacao)" v-b-tooltip.hover
            title="Download" variant="primary" size="sm"><i class="fas fa-download"></i></b-button>
          </template>
        </b-table>
        <b-pagination
            size="sm"
            v-model="page"
            :total-rows="pageExportacoes.count"
            :per-page="pageExportacoes.limite"
          ></b-pagination>
      </div>
    </b-card>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle';
import Livros from '../../services/livros';
import Loading from '../shared/Loading';
import moment from 'moment';
import { showError } from "@/global";
export default {
    name: 'ExportLivros',
    components: { PageTitle, Loading },
    data(){
      return {
        page: 1,
        loader: false,
        pageExportacoes: {
          rows: []
        },
        fields: [
          { key: "idExportacaoLivros", label: "Cód.", sortable: true },
          {
            key: "createdAt",
            label: "Data/Hora",
            sortable: true,
            formatter: value => {
              return moment(String(value)).format("DD/MM/YYYY HH:mm");
            }
          },
          { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
          { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
          { key: "percentualConclusao", label: "Progresso", sortable: true },
          { key: "statusExportacaoLivros", label: "Status", sortable: true },
          {key: "actions", label: "Ações"}
        ]
      }
    },
    watch: {
    page() {
      this.getExportacoes();
      }
    },
    mounted(){
      this.getExportacoes();
    },
    methods: {
      async getExportacoes(){
        this.loader = true;
        try{
          const res = await Livros.getExportacoesLivros(this.page -1);
          this.pageExportacoes = res.data;
        }catch(err){
          showError(err);
        }finally{
          this.loader = false;
        }
      },
      async exportLivros(){
        try{
          const res = await Livros.exportLivros(this.page -1);
          this.$toasted.global.exportLivros();
          this.getExportacoes();
        }catch(err){
          showError(err);
        }
      },
      downloadExportacao(arquivoExportacao){
        window.open(this.pageExportacoes.link + arquivoExportacao);
      }
    }

}
</script>

<style>

</style>