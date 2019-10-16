<template>
  <div>
    <PageTitle icon="fa fa-info-circle" main="Recurso não encontrado" />
    <b-card>
      <template slot="header">
        <h5>Falha</h5>
      </template>
      <h5>Recurso não encontrado</h5>
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../components/template/PageTitle";
export default {
  name: "Error404",
  components: { PageTitle }
};
</script>

<style>
</style>
