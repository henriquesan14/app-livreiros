<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar" 
            v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="items" :options="options" :filter="treeFilter" ref="tree" />
    </aside>
    
</template>

<script>
import { mapGetters } from 'vuex'
import Tree from 'liquor-tree'

export default {
    name: 'Menu',
    components: {Tree},
    computed: mapGetters(['isMenuVisible']),
    data(){
        return {
            treeFilter: '',
            e: false,
            items: [
            {text: 'Home'},
            {text: 'Usuarios'},
            {text: 'Livros'},
            {text: 'Editoras'},
            {text: 'Autores'},
            {text: 'Assuntos'},
            {text: 'Categorias'}
          ],
          options: {
            filter: {
                emptyText: 'Categoria não encontrada'
            }
          }
        }
    },
    methods: {
        onNodeSelect(node){
            this.$router.push(`/dashboard/${node.text.toLowerCase()}`)

            if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.dispatch('toggleMenu', false)
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    .tree-arrow.has-child {
        filter: brightness(2);
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
