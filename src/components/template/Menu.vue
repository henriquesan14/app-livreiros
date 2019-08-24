<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar"
        v-model="filtroMenu"
        class="filter-field"
      />
    </div>
    <span class="tree-filter-empty" v-if="items.length < 1">Categoria não encontrada</span>
    <nav class="menu-aside">
      <ul>
        <router-link
          active-class="active"
          exact
          v-if="item.visible"
          :to="item.path"
          tag="li"
          v-for="item in items"
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
      filtroMenu: "",
      items: [
        {
          text: "Home",
          path: "/dashboard/home",
          icon: "fa fa-home",
          visible: true
        },
        {
          text: "Usuarios",
          path: "/dashboard/usuarios",
          icon: "fa fa-cogs",
          visible: this.hasRole("BUSCAR_USUARIO")
        },
        {
          text: "Livros",
          path: "/dashboard/livros",
          icon: "fa fa-book",
          visible: this.hasRole("BUSCAR_LIVRO")
        },
        {
          text: "Editoras",
          path: "/dashboard/editoras",
          icon: "fas fa-book-open",
          visible: this.hasRole("BUSCAR_EDITORA")
        },
        {
          text: "Autores",
          path: "/dashboard/autores",
          icon: "fas fa-user-cog",
          visible: this.hasRole("BUSCAR_AUTOR")
        },
        {
          text: "Assuntos",
          path: "/dashboard/assuntos",
          icon: "fa fa-comments",
          visible: this.hasRole("BUSCAR_ASSUNTO")
        },
        {
          text: "Categorias",
          path: "/dashboard/categorias",
          icon: "fas fa-file-alt",
          visible: this.hasRole("BUSCAR_DESCRICAO")
        }
      ]
    };
  },
  watch: {
    filtroMenu(newValue, oldValue) {
      let items = [
        {
          text: "Home",
          path: "/dashboard/home",
          icon: "fa fa-home",
          visible: true
        },
        {
          text: "Usuarios",
          path: "/dashboard/usuarios",
          icon: "fa fa-cogs",
          visible: this.hasRole("BUSCAR_USUARIO")
        },
        {
          text: "Livros",
          path: "/dashboard/livros",
          icon: "fa fa-book",
          visible: this.hasRole("BUSCAR_LIVRO")
        },
        {
          text: "Editoras",
          path: "/dashboard/editoras",
          icon: "fas fa-book-open",
          visible: this.hasRole("BUSCAR_EDITORA")
        },
        {
          text: "Autores",
          path: "/dashboard/autores",
          icon: "fas fa-user-cog",
          visible: this.hasRole("BUSCAR_AUTOR")
        },
        {
          text: "Assuntos",
          path: "/dashboard/assuntos",
          icon: "fa fa-comments",
          visible: this.hasRole("BUSCAR_ASSUNTO")
        },
        {
          text: "Categorias",
          path: "/dashboard/categorias",
          icon: "fas fa-file-alt",
          visible: this.hasRole("BUSCAR_DESCRICAO")
        }
      ];
      this.items = items
        .filter(x => x.visible === true)
        .filter(x => x.text.toLowerCase().includes(newValue.toLowerCase()));
    }
  },
  methods: {
    hasRole(role) {
      let roles = JSON.parse(localStorage.getItem(userKey)).user.permissoes;
      if (roles.includes(role)) {
        return true;
      }
      return false;
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
      background-color: rgba(255, 255, 255, 0.2);

      i {
        color: #20a8d8;
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
    background-color: rgba(255, 255, 255, 0.2);

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
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .menu-filter {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #aaa;

    i {
      color: #aaa;
      margin-right: 10px;
      font-size: 0.875rem;
    }
  }

  input {
    color: #ccc;
    font-size: 0.875rem;
    border: 0;
    outline: 0;
    width: 100%;
    background: transparent;
  }
}

.tree-filter-empty {
  color: #ccc;
  font-size: 0.875rem;
  margin-left: 20px;
}
</style>
