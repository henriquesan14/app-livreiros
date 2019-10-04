<template>
  <div class="cadastro-cliente">
    <PageTitle icon="far fa-user" main="Administração de clientes" sub="Cadastro cliente" />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Novo cliente</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/clientes">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <FormCliente @submit-cliente="saveCliente" />
    </b-card>
  </div>
</template>

<script>
import FormCliente from "./FormCliente";
import PageTitle from "../template/PageTitle";
import Cliente from "../../services/clientes";
import { showError } from "@/global";
export default {
  name: "CadastroCliente",
  components: { FormCliente, PageTitle },
  methods: {
    async saveCliente(cliente) {
      try {
        if (cliente.tipoPessoa == "fisica") {
          cliente.clientePj = null;
        } else if (cliente.tipoPessoa == "juridica") {
          cliente.clientePf = null;
        }
        console.log(cliente);
        await Cliente.saveCliente(cliente);
        this.$toasted.global.defaultSuccess();
        this.$router.push("/dashboard/clientes");
      } catch (err) {
        showError(err);
      }
    }
  }
};
</script>

<style>
</style>