<template>
  <aside class="menu" v-show="isMenuVisible">
    <nav class="menu-aside">
      <ul>
        <router-link active-class="active" exact to="/dashboard/home" tag="li">
          <span>
            <i class="fas fa-chart-line mr-2"></i>Analytics
          </span>
        </router-link>
        <router-link
          active-class="active"
          exact
          :to="item.path"
          tag="li"
          v-for="item in activeItems"
          :key="item.id"
        >
          <span>
            <i :class="item.icon" class="mr-2"></i>
            {{item.text}}
          </span>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
import { userKey } from "@/global";
export default {
  name: "Menu",
  computed: mapGetters(["isMenuVisible"]),
  data() {
    return {
      activeItems: [],
      items: [
        {
          text: "Usuarios",
          path: "/dashboard/usuarios",
          icon: "fa fa-cogs",
          visible: "BUSCAR_USUARIO"
        },
        {
          text: "Livros",
          path: "/dashboard/livros",
          icon: "fa fa-book",
          visible: "BUSCAR_LIVRO"
        },
        {
          text: "Editoras",
          path: "/dashboard/editoras",
          icon: "fas fa-book-open",
          visible: "BUSCAR_EDITORA"
        },
        {
          text: "Autores",
          path: "/dashboard/autores",
          icon: "fas fa-user-cog",
          visible: "BUSCAR_AUTOR"
        },
        {
          text: "Assuntos",
          path: "/dashboard/assuntos",
          icon: "fa fa-comments",
          visible: "BUSCAR_ASSUNTO"
        },
        {
          text: "Categorias",
          path: "/dashboard/categorias",
          icon: "fas fa-file-alt",
          visible: "BUSCAR_DESCRICAO"
        },
        {
          text: "Solicitações",
          path: "/dashboard/solicitacoes",
          icon: "fas fa-box-open",
          visible: "BUSCAR_DESCRICAO"
        },
        {
          text: "Clientes",
          path: "/dashboard/clientes",
          icon: "far fa-user",
          visible: "BUSCAR_DESCRICAO"
        },
        {
          text: "Pedidos",
          path: "/dashboard/pedidos",
          icon: "fas fa-shopping-cart",
          visible: "BUSCAR_DESCRICAO"
        }
      ]
    };
  },
  mounted() {
    this.initMenu();
  },
  methods: {
    initMenu() {
      let roles = JSON.parse(localStorage.getItem(userKey)).user.permissoes;
      this.items.forEach(i => {
        if (roles.includes(i.visible)) {
          this.activeItems.push(i);
        }
      });
    }
  }
};
</script>

<style lang="scss">
nav ul {
  display: flex;
  flex-direction: column;
  padding: 0px;

  li {
    cursor: pointer;
    padding: 8px;
    &:hover {
      background-color: #20a8d8;

      i {
        color: #fff;
      }
    }

    span {
      font-size: 0.875rem;
      color: #fff;
      text-decoration: none;
      margin-left: 10px;

      i {
        font-size: 0.75rem;
        color: #73818f;
      }
    }
  }

  .active {
    background-color: #3a4248;

    i {
      color: #20a8d8;
    }
  }
}

nav ul li span:hover {
  color: #fff;
  text-decoration: none;
}

.menu {
  grid-area: menu;
  background-color: #2f353a;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
