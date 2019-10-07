<template>
  <div class="pedido-atual">
    <PageTitle
      icon="fas fa-cart-arrow-down"
      main="Administração de pedidos"
      sub="Gerenciar pedido atual"
    />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Pedido atual</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <b-button @click="back()" class="btn-dark btn-sm mb-1">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </b-button>
        </div>
      </template>
      <Cart />
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Cart from "./Cart";
export default {
  name: "PedidoAtual",
  components: { PageTitle, Cart },
  methods: {
      back(){
          history.back();
      }
  }
};
</script>

<style>
</style>