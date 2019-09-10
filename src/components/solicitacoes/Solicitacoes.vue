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
      <b-button size="sm" variant="dark" class="mb-2">
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
        <template slot="statusSolicitacao" slot-scope="data">
          <b-badge
            :variant="data.item.statusSolicitacao === 'confirmado' ? 'success' : 'danger'"
          >{{data.item.statusSolicitacao.toUpperCase()}}</b-badge>
        </template>
        <template slot="actions" slot-scope="data">
          <b-button
            
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
            
            @click="showMsgCancelamento(data.item)"
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
        { key: "idSolicitacao", label: "Cód.", sortable: true },
        {
          key: "createdAt",
          label: "Data/hora",
          sortable: true,
          formatter: value => {
            return moment(String(value)).format("DD/MM/YYYY HH:mm");
          }
        },
        { key: "obsSolicitacao", label: "Obs.", sortable: true },
        { key: "qtdSolicitada", label: "Qtd.", sortable: true },
        { key: "statusSolicitacao", label: "Status", sortable: true },
        { key: "usuario.loginUsuario", label: "Usuário", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      loader: false,
      nome: "",
      pageSolicitacoes: { rows: [] }
    };
  },
  mounted() {
    this.getSolicitacoes();
  },
  methods: {
    async getSolicitacoes() {
      this.loader = true;
      try {
        const res = await Solicitacoes.getSolicitacoes(this.page - 1);
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
            this.statusSolicitacao(solicitacao.idSolicitacao, {status: 'confirmado'});
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
            this.statusSolicitacao(solicitacao.idSolicitacao, {status: 'cancelado'});
          }
        })
        .catch(() => {});
    },
  }
};
</script>

<style>
</style>