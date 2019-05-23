<template>
    <div class="autores">
        <PageTitle icon="fas fa-user-cog" main="Administração de autores" sub="Gerenciar autores"/>
    
        <b-card header="Autores">
                <b-button variant="dark" @click="zeraAutor();$bvModal.show('modal-autor')" class="mb-2" size="sm">Novo Autor</b-button>
                <b-row>
                    <b-col md="12" sm="12" class="mb-3">
                        <b-input-group>
                            <b-form-input @keyup.enter="getAutores()"  type="text" v-model="nome" placeholder="Pesquise o nome do autor..." />
                            <b-input-group-append>
                                <b-button @click="getAutores()"  variant="primary"><i class="fa fa-search"></i></b-button>
                            </b-input-group-append> 
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-table :responsive="true" :fields="fields" v-if="!loader && pageAutores.rows.length > 0" hover striped :items="pageAutores.rows" >
                    <template slot="actions" slot-scope="data">
                        <b-button @click="loadAutor(data.item);$bvModal.show('modal-autor')" variant="warning" class="mr-2"
                        v-b-tooltip.hover title="Alterar">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button @click="showMsgBoxTwo(data.item)" v-b-tooltip.hover title="Excluir"
                         variant="danger">
                            <i class="fa fa-trash"></i>
                            </b-button>
                    
                    </template>
                </b-table>
                <div v-if="!loader && pageAutores.rows.length < 1" class="mb-2">
                    <span>Nenhum resultado...</span>
                </div>
                <Loading :loader="loader"/>
                <b-pagination size="md" v-model="page" :total-rows="pageAutores.count" :per-page="10"></b-pagination>
            </b-card>
            <FormAutor @zera-autor="getAutores()" :autor="autor" />
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Loading from '../../shared/Loading'
import PageTitle from '../../template/PageTitle';
import FormAutor from './FormAutor'
export default {
    name:'Autores',
    components: {Loading, PageTitle, FormAutor},
    data(){
        return {
            autor: {},
            loader: false,
            page: 1,
            nome: '',
            fields: [
                {key: 'idAutor', label: 'Cód.', sortable: true},
                {key: 'nomeAutor', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
        }
    },
    mounted(){
        this.getAutores();
    },
    watch:{
        page(){
            this.getAutores();
        }
    },
    computed: mapGetters(['pageAutores']),
    methods: {
        async getAutores(){
            this.loader = true;
            try{
                await this.$store.dispatch('GET_AUTORES', {nome: this.nome, page: this.page -1});
            }catch(err){
                () => {}
            }finally{
                this.loader = false;
            } 
        },
        loadAutor(autor){
            this.autor = {...autor};
        },
        showMsgBoxTwo(autor) {
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm(`Tem certeza que deseja excluir o autor de Cód. ${autor.idAutor}?` , {
            title: 'Confirmação',
            size: 'md',
            buttonSize: 'md',
            okVariant: 'danger',
            okTitle: 'SIM',
            cancelTitle: 'NÃO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
            })
            .then((res) => {
                if(res){
                    this.removeAutor(autor.idAutor);
                }
            })
            .catch(() => {
                
            })
      },
      removeAutor(id){
          alert(id);
      },
      zeraAutor(){
          this.autor = {};
      }
    }
}
</script>

<style>

</style>
