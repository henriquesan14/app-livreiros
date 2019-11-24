<template>
  <div class="solicitacoes">
    <PageTitle
      icon="fas fa-box-open"
      main="Administração de solicitações"
      sub="Gerenciar solicitações de livros"
    />
    <b-card header="Editoras">
      <template slot="header">
        <h5 class="card-title">Solicitações de livros</h5>
      </template>
      <b-row>
        <b-col>
          <b-form-group label="Status">
            <b-form-select @change="getSolicitacoes" size="sm" v-model="status">
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
              @change="getSolicitacoes"
              size="sm"
              type="date"
              v-model="dataInicio"
              placeholder="Pesquise o nome do livro..."
            />
          </b-form-group>
        </b-col>
        <b-col md="5" class="mb-3">
          <b-form-group label="Data Fim:">
            <b-form-input @change="getSolicitacoes" size="sm" type="date" v-model="dataFim" />
          </b-form-group>
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
        <template v-slot:cell(statusSolicitacao)="data">
          <b-badge
            :variant="data.item.statusSolicitacao === 'confirmado' ? 'success' : 'danger'"
          >{{data.item.statusSolicitacao.toUpperCase()}}</b-badge>
        </template>
        <template v-slot:cell(actions)="data">
          <b-button
            :disabled="data.item.statusSolicitacao !== 'pendente'"
            @click="showMsgConfirmacao(data.item)"
            v-b-tooltip.hover
            title="Confirmar"
            size="sm"
            variant="success"
            class="mr-2"
          >
            <i class="fa fa-check"></i>
          </b-button>
          <b-button
            :disabled="data.item.statusSolicitacao !== 'pendente'"
            @click="showMsgCancelamento(data.item)"
            v-b-tooltip.hover
            title="Cancelar"
            size="sm"
            variant="danger"
            class="mr-2"
          >
            <i class="fa fa-times"></i>
          </b-button>
          <b-button v-b-tooltip.hover title="Info. Solicitação" size="sm" @click="data.toggleDetails" class="mr-2">
          <i class="fa fa-caret-down mr-1 ml-1"></i>
          </b-button>
        </template>
        <template v-slot:row-details="data">
          <b-card header="Informações Solicitação">
            <b-row class="mb-2">
              <b-col>
                <strong>Livro: </strong>
                {{data.item.livroDescrito.livro.tituloLivro}}
              </b-col>
              <b-col>
                <strong>Obs: </strong>
                {{data.item.obsSolicitacao}}
              </b-col>           
            </b-row>
          </b-card>
        </template>
      </b-table>
      <div v-if="!loader && pageSolicitacoes.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination
        size="sm"
        v-model="page"
        :total-rows="pageSolicitacoes.count"
        :per-page="pageSolicitacoes.limite"
      ></b-pagination>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Loading from "../shared/Loading";
import Solicitacoes from "../../services/solicitacoes";
import moment from "moment";
import { showError } from "@/global";
export default {
  name: "Solicitacoes",
  components: { PageTitle, Loading },
  data() {
    return {
      page: 1,
      fields: [
        { key: "livroDescrito.livro.idLivro", label: "Cód. Livro", sortable: true },
        {
          key: "createdAt",
          label: "Data/hora",
          sortable: true,
          formatter: value => {
            return moment(String(value)).format("DD/MM/YYYY HH:mm");
          }
        },
        { key: "qtdSolicitada", label: "Qtd.", sortable: true },
        { key: "statusSolicitacao", label: "Status", sortable: true },
        { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      loader: false,
      nome: "",
      pageSolicitacoes: { rows: [] },
      status: "",
      dataInicio: "",
      dataFim: ""
    };
  },
  mounted() {
    this.getSolicitacoes();
  },
  watch: {
    page() {
      this.getSolicitacoes();
    }
  },
  sockets: {
    newSolicitacao: function(data){
      this.getSolicitacoes();
      this.$toasted.global.newSolicitacao(data.message);
    }
  },
  methods: {
    async getSolicitacoes() {
      this.loader = true;
      try {
        const res = await Solicitacoes.getSolicitacoes(
          this.page - 1,
          10,
          this.status,
          this.dataInicio,
          this.dataFim
        );
        this.pageSolicitacoes = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    async statusSolicitacao(id, status) {
      try {
        await Solicitacoes.statusSolicitacao(id, status);
        this.getSolicitacoes();
      } catch (err) {
        showError(err);
      }
    },
    showMsgConfirmacao(solicitacao) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          `Tem certeza que deseja confirmar a solicitação de Cód. ${solicitacao.idSolicitacao}?`,
          {
            title: "Confirmação",
            size: "md",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "SIM",
            cancelTitle: "NÃO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(res => {
          if (res) {
            this.statusSolicitacao(solicitacao.idSolicitacao, {
              status: "confirmado"
            });
          }
        })
        .catch(() => {});
    },
    showMsgCancelamento(solicitacao) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          `Tem certeza que deseja cancelar a solicitação de Cód. ${solicitacao.idSolicitacao}?`,
          {
            title: "Cancelamento",
            size: "md",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "SIM",
            cancelTitle: "NÃO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(res => {
          if (res) {
            this.statusSolicitacao(solicitacao.idSolicitacao, {
              status: "cancelado"
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>