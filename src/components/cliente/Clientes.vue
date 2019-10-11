<template>
  <div class="clientes">
    <PageTitle icon="far fa-user" main="Administração de clientes" sub="Gerenciar clientes" />

    <b-card header="clientes">
      <template slot="header">
        <h5 class="card-title">Clientes</h5>
      </template>
      <router-link tag="button" to="/dashboard/clientes/cadastro" class="btn btn-dark btn-sm mb-2">
        <i class="fa fa-plus-circle mr-1"></i>Novo Cliente
      </router-link>
      <b-row>
        <b-col md="12" sm="12" class="mb-3">
          <b-input-group>
            <b-form-input
              size="sm"
              @keyup.enter="getClientes()"
              type="text"
              v-model="nome"
              placeholder="Pesquise o nome do cliente..."
            />
            <b-input-group-append>
              <b-button size="sm" @click="getClientes()" variant="primary">
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
        v-if="!loader && pageClientes.rows.length > 0"
        hover
        striped
        :items="pageClientes.rows"
      >
        <template slot="tipoPessoa" slot-scope="data">{{data.item.tipoPessoa | toTitle}}</template>
        <template slot="actions" slot-scope="data">
          <b-button @click="navigate(data.item.idCliente)" v-b-tooltip.hover title="Editar" size="sm" variant="warning" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
        </template>
      </b-table>
      <div v-if="!loader && pageClientes.rows.length < 1" class="mb-2">
        <span>Nenhum resultado...</span>
      </div>
      <Loading :loader="loader" />
      <b-pagination
        size="sm"
        v-model="page"
        :total-rows="pageClientes.count"
        :per-page="pageClientes.limite"
      ></b-pagination>
    </b-card>
  </div>
</template>

<script>
import Loading from "../shared/Loading";
import PageTitle from "../template/PageTitle";
import Clientes from "../../services/clientes";
import { showError } from "@/global";
export default {
  name: "Clientes",
  components: { Loading, PageTitle },
  data() {
    return {
      loader: false,
      pageClientes: { rows: [] },
      page: 1,
      nome: "",
      fields: [
        { key: "idCliente", label: "Cód.", sortable: true },
        { key: "nomeCliente", label: "Nome", sortable: true },
        { key: "tipoPessoa", label: "Tipo Pessoa", sortable: true },
        {
          key: "clientePf.cpfCliente",
          label: "CPF",
          sortable: true,
          formatter: value => {
            if (value) {
              return value.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                "$1.$2.$3-$4"
              );
            }
            return "N/A";
          }
        },
        {
          key: "clientePj.cnpjCliente",
          label: "CNPJ",
          sortable: true,
          formatter: value => {
            if (value) {
              return value.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1 $2 $3/$4-$5"
              );
            }
            return "N/A";
          }
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  mounted() {
    this.getClientes();
  },
  watch: {
    page() {
      this.getClientes();
    }
  },
  methods: {
    async getClientes() {
      this.loader = true;
      try {
        const res = await Clientes.getClientes(this.nome, this.page - 1);
        this.pageClientes = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    navigate(id) {
      this.$router.push({ name: "edicao-cliente", params: { id } });
    }
  }
};
</script>

<style>
</style>
