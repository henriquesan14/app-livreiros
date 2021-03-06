<template>
  <div class="autores">
    <PageTitle
      icon="fas fa-file-alt"
      main="Administração de categorias"
      sub="Gerenciar categorias das descrições"
    />

    <b-card header="Categorias">
      <template slot="header">
        <h5 class="card-title">Categorias</h5>
      </template>
      <b-button
        v-hasRole="'ESCREVER_DESCRICAO'"
        variant="dark"
        @click="zeraCategoria();$bvModal.show('modal-categoria')"
        class="mb-2"
        size="sm"
      >
        <i class="fa fa-plus-circle mr-1"></i>Nova Categoria
      </b-button>
      <b-row>
        <b-col md="12" sm="12" class="mb-3">
          <b-input-group>
            <b-form-input
              size="sm"
              @keyup.enter="getCategorias()"
              type="text"
              v-model="nome"
              placeholder="Pesquise o nome da categoria..."
            />
            <b-input-group-append>
              <b-button size="sm" @click="getCategorias()" variant="primary">
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
        v-if="!loader && pageCategorias.rows.length > 0"
        hover
        striped
        :items="pageCategorias.rows"
      >
        <template v-slot:cell(statusCategoriaDescricao)="data">
          <b-badge
            :variant="data.item.statusCategoriaDescricao ? 'success' : 'danger'"
          >{{data.item.statusCategoriaDescricao ? 'ATIVA':'DESATIVADA'}}</b-badge>
        </template>
        <template v-slot:cell(actions)="data">
          <b-button
            v-b-tooltip.hover
            title="Editar"
            size="sm"
            v-hasRole="'ESCREVER_DESCRICAO'"
            @click="loadCategoria(data.item);$bvModal.show('modal-categoria')"
            variant="warning"
            class="mr-2"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button
            v-b-tooltip.hover
            title="Adicionar descrição"
            size="sm"
            v-hasRole="'ESCREVER_DESCRICAO'"
            variant="primary"
            @click="navigate(data.item.idCategoriaDescricao)"
            class="mr-2"
          >
            <i class="fa fa-plus"></i>
          </b-button>
          <b-button
            v-b-tooltip.hover
            :title="data.item.statusCategoriaDescricao == true ? 'Desativar': 'Ativar'"
            size="sm"
            v-hasRole="'ESCREVER_DESCRICAO'"
            :variant="data.item.statusCategoriaDescricao == true ? 'danger': 'success'"
            @click="showMsgBoxTwo(data.item)"
          >
            <i
              class="fas"
              :class="data.item.statusCategoriaDescricao == true ? 'fa-ban':'fa-lock-open'"
            ></i>
          </b-button>
        </template>
      </b-table>
      <div v-if="!loader && pageCategorias.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination
        size="sm"
        v-model="page"
        :total-rows="pageCategorias.count"
        :per-page="pageCategorias.limite"
      ></b-pagination>
    </b-card>
    <FormCategoria @zera-categoria="getCategorias()" :categoria="categoria" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "../../shared/Loading";
import PageTitle from "../../template/PageTitle";
import FormCategoria from "./FormCategoria";
import { showError } from "@/global";
import Categoria from "../../../services/categorias";
export default {
  name: "Categorias",
  components: { Loading, PageTitle, FormCategoria },
  data() {
    return {
      categoria: {},
      loader: false,
      page: 1,
      nome: "",
      fields: [
        { key: "idCategoriaDescricao", label: "Cód.", sortable: true },
        { key: "nomeCategoriaDescricao", label: "Nome", sortable: true },
        { key: "statusCategoriaDescricao", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      loaderDescricao: false
    };
  },
  mounted() {
    this.getCategorias();
  },
  watch: {
    page() {
      this.getCategorias();
    }
  },
  computed: mapGetters(["pageCategorias"]),
  methods: {
    async getCategorias() {
      this.loader = true;
      try {
        await this.$store.dispatch("GET_CATEGORIAS", {
          nome: this.nome,
          page: this.page - 1
        });
      } catch (err) {
        () => {};
      } finally {
        this.loader = false;
      }
    },
    loadCategoria(categoria) {
      this.categoria = { ...categoria };
    },
    async getDescricoes(id) {
      this.loaderDescricao = true;
      this.$bvModal.show("modal-descricoes");
      this.categoria.idCategoriaDescricao = id;
      try {
        await this.$store.dispatch("GET_DESCRICOES", id);
      } catch (err) {
        showError(err);
      } finally {
        this.loaderDescricao = false;
      }
    },
    showMsgBoxTwo(categoria) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          `Tem certeza que deseja ativar/desativar a categoria de Cód. ${categoria.idCategoriaDescricao}?`,
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
            this.statusCategoria(categoria.idCategoriaDescricao);
          }
        })
        .catch(() => {});
    },
    async statusCategoria(id) {
      try {
        await Categoria.statusCategoria(id);
        this.getCategorias();
        this.$toasted.global.defaultSuccess();
      } catch (err) {
        showError(err);
      }
    },
    zeraCategoria() {
      this.categoria = {};
    },
    navigate(id) {
      this.$router.push({ name: "descricoes", params: { id } });
    }
  }
};
</script>

<style>
</style>
