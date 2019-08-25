<template>
  <div class="grupo-admin">
    <router-link
      tag="button"
      class="btn btn-dark btn-sm mb-3"
      v-hasRole="'ESCREVER_GRUPO'"
      to="/dashboard/usuarios/grupos/cadastro"
    >
      <i class="fa fa-plus-circle mr-1"></i>Novo grupo
    </router-link>
    <b-table
      class="table-sm"
      v-if="grupos.length > 0"
      hover
      striped
      :items="grupos"
      :fields="fields"
    >
      <template slot="actions" slot-scope="data">
        <b-button
          size="sm"
          v-hasRole="'ESCREVER_GRUPO'"
          variant="warning"
          @click="navigate(data.item.idGrupo)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { showError } from "@/global";
export default {
  name: "GrupoAdmin",
  data() {
    return {
      fields: [
        { key: "idGrupo", label: "Cód.", sortable: true },
        { key: "nomeGrupo", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" }
      ],
    };
  },
  computed: mapGetters(["grupos"]),
  methods: {
    async getGrupos() {
      try {
        await this.$store.dispatch("GET_GRUPOS");
      } catch (err) {
        () => {
          showError(err);
        };
      }
    },
    navigate(id) {
      this.$router.push({ name: "edicao-grupo", params: { id } });
    }
  }
};
</script>
<style>
</style>
