<template>
    <div class="solicitacoes">
        <PageTitle icon="fas fa-box-open" main="Administração de solicitações" sub="Gerenciar solicitações de livros" />
        <b-card header="Editoras">
      <template slot="header">
        <h5 class="card-title">Solicitações de livros</h5>
      </template>
      <b-button
        size="sm"
        variant="dark"
        class="mb-2"
      >
        <i class="fa fa-plus-circle mr-1"></i> Nova Solicitação
      </b-button>
      <b-row>
        <b-col md="12" sm="12" class="mb-3">
          <b-input-group>
            <b-form-input
              size="sm"
              @keyup.enter="getEditoras()"
              type="text"
              v-model="nome"
              placeholder="Pesquise o nome do livro..."
            />
            <b-input-group-append>
              <b-button size="sm" @click="getSolicitacoes()" variant="primary">
                <i class="fa fa-search"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

      <b-table
        class="table-sm"
        :responsive="true"
        :fields="fields"
        v-if="!loader && pageSolicitacoes.rows.length > 0"
        hover
        striped
        :items="pageSolicitacoes.rows"
      >
        <template slot="actions" slot-scope="data">
          <b-button
            v-b-tooltip.hover 
            title="Confirmar"
            size="sm"
            variant="success"
            class="mr-2"
          >
            <i class="fa fa-check"></i>
          </b-button>
          <b-button
            v-b-tooltip.hover 
            title="Cancelar"
            size="sm"
            variant="danger"
            class="mr-2"
          >
            <i class="fa fa-times"></i>
          </b-button>
        </template>
      </b-table>
      <div v-if="!loader && pageSolicitacoes.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination size="sm" v-model="page" :total-rows="pageSolicitacoes.count" :per-page="10"></b-pagination>
    </b-card>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle';
import Loading from '../shared/Loading';
export default {
    name: 'Solicitacoes',
    components: {PageTitle, Loading},
    data(){
        return {
            page: 1,
            pageSolicitacoes: {
                count: 50,
                rows: [
                    {id: 1, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 2, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 3, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 4, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 5, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 6, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 7, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 8, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 9, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 10, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 11, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    {id: 12, data: '01/02/2019 12:00',obs: 'N/A', qtd: 1, status: 'PENDENTE', usuario: 'Vladmir'},
                    ]
            },
            fields: [
                { key: "id", label: "Cód.", sortable: true },
                { key: "data", label: "Data/hora", sortable: true },
                { key: "obs", label: "Obs.", sortable: true },
                { key: "qtd", label: "Qtd.", sortable: true },
                { key: "status", label: "Status", sortable: true },
                { key: "usuario", label: "Usuário", sortable: true },
                { key: "actions", label: "Ações" }
            ]
        }
    }
}
</script>

<style>

</style>