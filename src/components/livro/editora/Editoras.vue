<template>
    <div class="editoras">
        <PageTitle icon="fas fa-book-open" main="Administração de editoras" sub="Gerenciar editoras"/>
    
        <b-card header="Editoras">
            <template slot="header">
                <h5 class="card-title">Editoras</h5>
            </template>
                <b-button size="sm" v-hasRole="'ESCREVER_EDITORA'" variant="dark" @click="zeraEditora();$bvModal.show('modal-editora')" class="mb-2" ><i class="fa fa-plus-circle mr-1"></i> Editora</b-button>
                <b-row>
                    <b-col md="12" sm="12" class="mb-3">
                        <b-input-group>
                            <b-form-input size="sm" @keyup.enter="getEditoras()"  type="text" v-model="nome" placeholder="Pesquise o nome da editora..." />
                            <b-input-group-append>
                                <b-button size="sm" @click="getEditoras()"  variant="primary"><i class="fa fa-search"></i></b-button>
                            </b-input-group-append> 
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-table class="table-sm" :responsive="true" :fields="fields" v-if="!loader && pageEditoras.rows.length > 0" hover striped :items="pageEditoras.rows" >
                    <template slot="actions" slot-scope="data">
                        <b-button size="sm" v-hasRole="'ESCREVER_EDITORA'" @click="loadEditora(data.item);$bvModal.show('modal-editora')" variant="warning" class="mr-2"
                        v-b-tooltip.hover title="Alterar">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                    
                    </template>
                </b-table>
                <div v-if="!loader && pageEditoras.rows.length < 1" class="mb-2">
                    <span>Nenhum resultado...</span>
                </div>
                <Loading :loader="loader"/>
                <b-pagination size="sm" v-model="page" :total-rows="pageEditoras.count" :per-page="10"></b-pagination>
            </b-card>
            <FormEditora @zera-editora="getEditoras()" :editora="editora" />
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Loading from '../../shared/Loading'
import PageTitle from '../../template/PageTitle';
import FormEditora from './FormEditora'
export default {
    name:'Editoras',
    components: {Loading, PageTitle, FormEditora},
    data(){
        return {
            editora: {},
            loader: false,
            page: 1,
            nome: '',
            fields: [
                {key: 'idEditora', label: 'Cód.', sortable: true},
                {key: 'nomeEditora', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
        }
    },
    mounted(){
        this.getEditoras();
    },
    watch:{
        page(){
            this.getEditoras();
        }
    },
    computed: mapGetters(['pageEditoras']),
    methods: {
        async getEditoras(){
            this.loader = true;
            try{
                await this.$store.dispatch('GET_EDITORAS', {nome: this.nome, page: this.page -1});
            }catch(err){
                () => {}
            }finally{
                this.loader = false;
            } 
        },
        loadEditora(editora){
            this.editora = {...editora};
        },
      zeraEditora(){
          this.editora = {};
      }
    }
}
</script>

<style>
    h5{
        font-size: 1rem;
        text-align: center;
    }
</style>
