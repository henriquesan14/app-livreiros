<template>
  <div class="user-admin">
    <router-link
      v-hasRole="'ESCREVER_USUARIO'"
      class="btn btn-dark btn-sm mb-2"
      tag="b-button"
      to="/dashboard/usuarios/cadastro"
    >
      <i class="fa fa-plus-circle mr-1"></i>Novo usuário
    </router-link>
    <b-row>
      <b-col md="12" sm="12" class="mb-3">
        <b-input-group>
          <b-form-input
            size="sm"
            v-model="nome"
            @keydown.enter="getUsers()"
            type="text"
            placeholder="Pesquise o nome do usuário..."
          />
          <b-input-group-append>
            <b-button size="sm" @click="getUsers()" variant="primary">
              <i class="fa fa-search"></i>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-table
      class="table-sm"
      :responsive="true"
      v-if="!loader && pageUsers.rows.length > 0"
      hover
      striped
      :items="pageUsers.rows"
      :fields="fields"
    >
      <template slot="statusUsuario" slot-scope="data">
        <b-badge
          :variant="data.item.statusUsuario ? 'success' : 'danger'"
        >{{data.item.statusUsuario ? 'ATIVO':'DESATIVADO'}}</b-badge>
      </template>
      <template slot="actions" slot-scope="data">
        <b-button
          v-b-tooltip.hover 
          title="Editar"
          size="sm"
          v-hasRole="'ESCREVER_USUARIO'"
          variant="warning"
          class="mr-2"
          @click="navigate(data.item.idUsuario)"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover 
          :title="data.item.statusUsuario == true ? 'Desativar': 'Ativar'"
          size="sm"
          v-hasRole="'ESCREVER_USUARIO'"
          :variant="data.item.statusUsuario == true ? 'danger': 'success'"
          @click="showMsgBoxTwo(data.item);"
          class="mr-2"
        >
          <i class="fas" :class="data.item.statusUsuario == true ? 'fa-ban':'fa-lock-open'"></i>
        </b-button>
      </template>
    </b-table>
    <div v-if="!loader && pageUsers.rows.length < 1" class="mb-2">
      <span>Nenhum resultado...</span>
    </div>
    <Loading :loader="loader" />
    <b-pagination size="sm" v-model="page" :total-rows="pageUsers.count" :per-page="10"></b-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "../shared/Loading";
import { showError } from "@/global";
import Usuario from "../../services/usuarios";
export default {
  name: "UserAdmin",
  components: { Loading },
  data() {
    return {
      user: {},
      page: 1,
      nome: "",
      loader: false,
      fields: [
        { key: "idUsuario", label: "Cód.", sortable: true },
        { key: "nomeUsuario", label: "Nome", sortable: true },
        { key: "loginUsuario", label: "Login", sortable: true },
        { key: "statusUsuario", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      boxTwo: ""
    };
  },

  watch: {
    page() {
      this.getUsers();
    }
  },
  computed: mapGetters(["pageUsers"]),
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.loader = true;
      try {
        await this.$store.dispatch("GET_USERS", {
          nome: this.nome,
          page: this.page - 1
        });
      } catch (err) {
        () => {};
      } finally {
        this.loader = false;
      }
    },
    loadUser(user) {
      this.user = { ...user };
    },
    showMsgBoxTwo(user) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          `Tem certeza que deseja ativar/desativar o usuário de Cód. ${user.idUsuario}?`,
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
            this.statusUser(user.idUsuario);
          }
        })
        .catch(() => {});
    },
    async statusUser(idUsuario) {
      try {
        await Usuario.statusUser(idUsuario);
        this.getUsers();
        this.$toasted.global.defaultSuccess();
      } catch (err) {
        showError(err);
      }
    },
    navigate(id) {
      this.$router.push({ name: "edicao-user", params: { id } });
    }
  }
};
</script>

<style>
</style>
