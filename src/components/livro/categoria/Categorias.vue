<template>
    <div class="autores">
        <PageTitle icon="fas fa-file-alt" main="Administração de categorias" sub="Gerenciar categorias das descrições"/>
    
        <b-card header="Categorias">
                <b-button variant="dark" @click="zeraCategoria();$bvModal.show('modal-categoria')" class="mb-2" size="sm">Nova Categoria</b-button>
                <b-row>
                    <b-col md="12" sm="12" class="mb-3">
                        <b-input-group>
                            <b-form-input @keyup.enter="getCategorias()"  type="text" v-model="nome" placeholder="Pesquise o nome da categoria..." />
                            <b-input-group-append>
                                <b-button @click="getCategorias()"  variant="primary"><i class="fa fa-search"></i></b-button>
                            </b-input-group-append> 
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-table :responsive="true" :fields="fields" v-if="!loader && pageCategorias.rows.length > 0" hover striped :items="pageCategorias.rows" >
                    <template slot="actions" slot-scope="data">
                        <b-button @click="loadCategoria(data.item);$bvModal.show('modal-categoria')" variant="warning" class="mr-2"
                        v-b-tooltip.hover title="Alterar">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button variant="success" @click="$bvModal.show('modal-descricoes')" v-b-tooltip.hover title="Adicionar" class="mr-2"><i class="fa fa-plus"></i></b-button>
                        <b-button
                        v-b-tooltip.hover :title="data.item.statusCategoriaDescricao == true ? 'Desativar': 'Ativar'"
                        :variant="data.item.statusCategoriaDescricao == true ? 'danger': 'success'"
                         @click="showMsgBoxTwo(data.item)"
                         >
                            <i class="fa fa-lock"></i>
                        </b-button>
                        
                    
                    </template>
                </b-table>
                <div v-if="!loader && pageCategorias.rows.length < 1" class="mb-2">
                    <span>Nenhum resultado...</span>
                </div>
                <Loading :loader="loader"/>
                <b-pagination size="md" v-model="page" :total-rows="pageCategorias.count" :per-page="10"></b-pagination>
            </b-card>
            <FormCategoria @zera-categoria="getCategorias()" :categoria="categoria" />
            <Descricoes />
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Loading from '../../shared/Loading'
import PageTitle from '../../template/PageTitle';
import FormCategoria from './FormCategoria'
import Descricoes from './Descricoes';
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'
export default {
    name:'Categorias',
    components: {Loading, PageTitle, FormCategoria, Descricoes},
    data(){
        return {
            categoria: {},
            loader: false,
            page: 1,
            nome: '',
            fields: [
                {key: 'idCategoriaDescricao', label: 'Cód.', sortable: true},
                {key: 'nomeCategoriaDescricao', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
        }
    },
    mounted(){
        this.getCategorias();
    },
    watch:{
        page(){
            this.getCategorias();
        }
    },
    computed: mapGetters(['pageCategorias']),
    methods: {
        async getCategorias(){
            this.loader = true;
            try{
                await this.$store.dispatch('GET_CATEGORIAS', {nome: this.nome, page: this.page -1});
            }catch(err){
                () => {}
            }finally{
                this.loader = false;
            } 
        },
        loadCategoria(categoria){
            this.categoria = {...categoria};
        },
        showMsgBoxTwo(categoria) {
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm(`Tem certeza que deseja ativar/desativar a categoria de Cód. ${categoria.idCategoriaDescricao}?` , {
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
                    this.statusCategoria(categoria.idCategoriaDescricao);
                }
            })
            .catch(() => {
                
            })
      },
      statusCategoria(id){
          const url = `${baseApiUrl}/categorias/${id}/status`;
          axios.put(url).then(() => {
              this.getCategorias();
              this.$toasted.global.defaultSuccess();
          }).catch(showError)
      },
      zeraCategoria(){
          this.categoria = {};
      }
    }
}
</script>

<style>

</style>
