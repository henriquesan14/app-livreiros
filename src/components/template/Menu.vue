<template>
  <aside class="menu" v-show="isMenuVisible">
    <nav class="menu-aside">
      <ul>
        <router-link
        active-class="active"
        exact
        to="/dashboard/home"
        tag="li"
        >
        <span><i class="fas fa-home mr-2" ></i>Home</span>
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
        }
      ]
    };
  },
  mounted(){
    this.initMenu();
  },
  methods: {
    initMenu() {
      let roles = JSON.parse(localStorage.getItem(userKey)).user.permissoes;
      this.items.forEach(i => {
        if(roles.includes(i.visible)){
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
}

</style>
