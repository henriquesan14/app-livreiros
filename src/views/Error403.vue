<template>
  <div>
    <PageTitle icon="fa fa-ban" main="Acesso Restrito" />
    <b-card>
      <template slot="header">
        <h5>Restrição</h5>
      </template>
      <h5>Acesso negado - Você não possui essa permissão.</h5>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../components/template/PageTitle";
export default {
  name: "Error403",
  components: { PageTitle }
};
</script>

<style>
</style>
