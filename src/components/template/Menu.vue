<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar" 
            v-model="filtroMenu" class="filter-field">
        </div>
        <span class="tree-filter-empty" v-if="items.length < 1">Categoria não encontrada</span>
        <nav >
            <ul>
                <router-link active-class="active" exact v-if="item.visible" :to="item.path" tag="li" v-for="item in items" :key="item.id" >
                    <span>{{item.text}}</span>
                </router-link>
            </ul>
        </nav>
    </aside>
    
</template>

<script>
import { mapGetters } from 'vuex'
import {userKey} from '@/global'
export default {
    name: 'Menu',
    computed: mapGetters(['isMenuVisible']),
    data(){
        return {
            filtroMenu: '',
            items: [
            {text: 'Home', path: '/dashboard/home', visible: true},
            {text: 'Usuarios', path: '/dashboard/usuarios', visible: this.hasRole('BUSCAR_USUARIO')},
            {text: 'Livros', path: '/dashboard/livros', visible: this.hasRole('BUSCAR_LIVRO')},
            {text: 'Editoras', path: '/dashboard/editoras', visible: this.hasRole('BUSCAR_EDITORA')},
            {text: 'Autores', path: '/dashboard/autores', visible: this.hasRole('BUSCAR_AUTOR')},
            {text: 'Assuntos', path: '/dashboard/assuntos', visible: this.hasRole('BUSCAR_ASSUNTO')},
            {text: 'Categorias', path: '/dashboard/categorias', visible: this.hasRole('BUSCAR_DESCRICAO')}
          ],
        }
    },
    watch: {
        filtroMenu(newValue, oldValue){
            let items = [
            {text: 'Home', path: '/dashboard/home', visible: true},
            {text: 'Usuarios', path: '/dashboard/usuarios', visible: this.hasRole('BUSCAR_USUARIO')},
            {text: 'Livros', path: '/dashboard/livros', visible: this.hasRole('BUSCAR_LIVRO')},
            {text: 'Editoras', path: '/dashboard/editoras', visible: this.hasRole('BUSCAR_EDITORA')},
            {text: 'Autores', path: '/dashboard/autores', visible: this.hasRole('BUSCAR_AUTOR')},
            {text: 'Assuntos', path: '/dashboard/assuntos', visible: this.hasRole('BUSCAR_ASSUNTO')},
            {text: 'Categorias', path: '/dashboard/categorias', visible: this.hasRole('BUSCAR_DESCRICAO')}
          ];
            this.items =items.filter(x=> x.visible === true).filter(x => x.text.toLowerCase().includes(newValue.toLowerCase()));
        }
    },
    methods: {
        toRoute(path){
            this.$router.push(path);
            if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.dispatch('toggleMenu', false)
            }
        },
        hasRole(role){
            let roles = JSON.parse(localStorage.getItem(userKey)).user.permissoes;
            if(roles.includes(role)){
                return true;
            }
            return false;
        }
    }
}
</script>

<style>

    nav ul {
        display:flex;
        flex-direction: column;
        padding: 0px;
    }

    nav ul li{
        cursor: pointer;
        padding: 8px;
    }

    nav ul li:hover, .active{
        background-color: rgba(255, 255, 255, 0.2);
    }

    nav ul li span{
        margin-left: 32px;
        color: #fff;
        text-decoration: none;
    }

    nav ul li span:hover{
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

    
    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }
    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }
    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }
    .tree-filter-empty {
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }

</style>
