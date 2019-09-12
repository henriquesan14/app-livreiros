<template>
  <div class="descricoes">
    <PageTitle
      icon="fas fa-file-alt"
      main="Administração de descrições"
      sub="Gerenciar descrições"
    />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">{{categoria.nomeCategoriaDescricao}}</h5>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/categorias">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <template slot="modal-title">Gerenciar Descrições</template>
      <Loading :loader="loader || loaderDesc" />
      <div v-if="!loader && !loaderDesc" class="d-block">
        <b-badge><span class="title-badge">Nova Descrição</span></b-badge>
        <FormDescricao @submit-descricao="saveDescricao" :descricao="descricao" />
        <b-table
          class="table-sm"
          :responsive="true"
          :fields="fields"
          :items="descricoes"
          hover
          striped
        >
          <template slot="statusDescricao" slot-scope="data">
            <b-badge
              :variant="data.item.statusDescricao ? 'success' : 'danger'"
            >{{data.item.statusDescricao ? 'ATIVA':'DESATIVADA'}}</b-badge>
          </template>
          <template slot="actions" slot-scope="data">
            <b-button
              v-b-tooltip.hover 
              title="Editar"
              size="sm"
              @click="loadDescricao(data.item); $bvModal.show('modal-edit-descricoes')"
              variant="warning"
              class="mr-2"
            >
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button
              v-b-tooltip.hover 
              :title="data.item.statusDescricao == true ? 'Desativar':'Ativar'"
              size="sm"
              :variant="data.item.statusDescricao == true ? 'danger': 'success'"
              @click="showMsgBoxTwo(data.item)"
              class="mr-2"
            >
              <i class="fas" :class="data.item.statusDescricao == true ? 'fa-ban':'fa-lock-open'"></i>
            </b-button>
          </template>
        </b-table>
      </div>
    </b-card>

    <b-modal size="dm" id="modal-edit-descricoes" hide-footer>
      <template slot="modal-title">Alterar descrição Cód.</template>
      <div class="d-block">
        <FormDescricao @submit-descricao="editDescricao" :descricao="descricaoEdit" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import Loading from "../../shared/Loading";
import { mapGetters } from "vuex";
import { showError } from "@/global";
import Descricao from '../../../services/descricoes';
import PageTitle from '../../template/PageTitle';
import FormDescricao from './FormDescricao';
export default {
  name: "Descricoes",
  components: { Loading, PageTitle, FormDescricao },
  computed: mapGetters(["descricoes"]),
  data() {
    return {
      categoria: {},
      descricao: {},
      descricaoEdit: {},
      fields: [
        { key: "idDescricao", label: "Cód.", sortable: true },
        { key: "nomeDescricao", label: "Nome", sortable: true },
        { key: "reducaoPreco", label: "( - ) R$", sortable: true },
        { key: "statusDescricao", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      loaderDesc: false,
      submitted: false
    };
  },
  mounted(){
    this.getDescricoes(this.$route.params.id);
  },
  methods: {
    loadDescricao(descricao) {
      this.descricaoEdit = { ...descricao };
    },
    showMsgBoxTwo(descricao) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          `Tem certeza que deseja ativar/desativar a descrição de Cód. ${descricao.idDescricao}?`,
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
            this.statusDescricao(descricao.idDescricao);
          }
        })
        .catch(() => {});
    },
    async statusDescricao(id) {
      try {
        await Descricao.statusDescricao(id);
        this.$toasted.global.defaultSuccess();
        this.getDescricoes(this.$route.params.id);
      } catch (err) {
        showError(err);
      }
    },
    zeraDescricao() {
      this.descricao = {};
    },
    async saveDescricao(descricao) {
      try {
        await Descricao.saveDescricao(descricao);
        this.$toasted.global.defaultSuccess();
        this.getDescricoes(this.$route.params.id);
        this.zeraDescricao();
      } catch (err) {
        showError(err);
      }
    },
    async editDescricao(descricao) {
      try {
        await Descricao.editDescricao(descricao.idDescricao, descricao);
        this.$toasted.global.defaultSuccess();
        this.getDescricoes(this.$route.params.id);
        this.$bvModal.hide("modal-edit-descricoes");
      } catch (err) {
        showError(err);
      }
    },
    async getDescricoes(id) {
      this.loaderDesc = true;
      try {
        await this.$store.dispatch("GET_DESCRICOES", id);
        this.categoria = this.descricoes[0].categoria_descricao;
        this.descricao.idCategoriaDescricao = this.$route.params.id;
      } catch (err) {
        showError(err);
      } finally {
        this.loaderDesc = false;
      }
    },
  }
};
</script>

<style>
</style>
