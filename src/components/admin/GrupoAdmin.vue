<template>
    <div class="grupo-admin">
        <b-button class="mb-3" variant="dark">Novo grupo</b-button>
        <b-table v-if="!loader && grupos.rows.length > 0" hover striped :items="grupos.rows" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadGrupo(data.item)" class="mr-2"
                v-b-tooltip.hover title="Alterar">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="dark" @click="loadGrupo(data.item)" class="mr-2"
                v-b-tooltip.hover title="Associar permissões">
                    <i class="fa fa-cogs"></i>
                </b-button>
            </template>
        </b-table>
        <Loading :loader="loader" />
    </div>
</template>

<script>
import { mapGetters}  from 'vuex'
import Loading from '../shared/Loading'

export default {
    name: 'GrupoAdmin',
    components: {Loading},
    data(){
        return {
            user: {},
            page: 1,
            nome: '',
            loader: false,
            fields: [
                {key: 'idGrupo', label: 'Cód.', sortable: true},
                {key: 'nomeGrupo', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    watch:{
        page(){
            this.getGrupos()
        }
    },
    computed: mapGetters(['grupos']),
    mounted(){
        this.getGrupos();
    },
    methods:{
        async getGrupos(){
            this.loader = true;
        try{
            await this.$store.dispatch('GET_GRUPOS', {nome: this.nome, page: this.page -1});
        }catch(err){
            () => {}
        }finally{
            this.loader = false;
        }     
        },
        loadGrupo(grupo){
            this.grupo = {...grupo};
        }
    }
}
</script>

<style>

</style>
