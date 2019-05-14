<template>
    <div class="grupo-admin">
        <b-row>
            <b-col md="12" sm="12" class="mb-3">
                <b-input-group>
                    <b-form-input v-model="nome" @keydown.enter="getGrupos()" type="text" placeholder="Pesquise o nome do grupo..." />
                    <b-input-group-append>
                        <b-button @click="getGrupos()" variant="primary"><i class="fa fa-search"></i></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-table v-if="!loader && pageGrupos.rows.length > 0" hover striped :items="pageGrupos.rows" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadGrupo(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="dark" @click="loadGrupo(data.item)" class="mr-2">
                    <i class="fa fa-cogs"></i>
                </b-button>
                <b-button variant="danger" @click="loadGrupo(data.item)" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <div v-if="!loader && pageGrupos.rows.length < 1" class="mb-2">
            <span>Nenhum resultado...</span>
        </div>
        <Loading :loader="loader" />
        <b-pagination size="md" v-model="page" :total-rows="pageGrupos.count" :per-page="10"></b-pagination>
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
    computed: mapGetters(['pageGrupos']),
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
