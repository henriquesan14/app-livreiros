<template>
  <div class="edicao-cliente">
    <PageTitle icon="far fa-user" main="Administração de clientes" sub="Edição cliente" />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Alteração cliente</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/clientes">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <FormCliente />
    </b-card>
  </div>
</template>

<script>
import FormCliente from "./FormCliente";
import PageTitle from "../template/PageTitle";
export default {
  name: "EdicaoCliente",
  components: { FormCliente, PageTitle }
};
</script>

<style>
</style>