<template>
    <div class='users'>
       <PageTitle icon="fa fa-book" main="Administração de livros" sub="Gerenciar livros"/>
            
            <b-card header="Livros">
                <router-link to="/dashboard/livros/cadastro" tag="b-button" class="mb-2 btn-dark btn-sm">Novo Livro</router-link>
                <b-row>
                    <b-col md="12" sm="12" class="mb-3">
                        <b-input-group>
                            <b-form-select v-model="filtroSelecionado" class="col-2 mr-2">
                                <option v-for="op in options" :key="op.name" :value="op.value">{{op.name}}</option>
                            </b-form-select>
                            <b-form-input @keyup.enter="getLivros()" v-model="nomeFiltro" type="text" placeholder="Pesquise o nome do livro..." />
                            <b-input-group-append>
                                <b-button @click="getLivros()"  variant="primary"><i class="fa fa-search"></i></b-button>
                            </b-input-group-append>
                            
                        </b-input-group>
                    </b-col>
                </b-row>

                <Loading :loader="loader"/>
                <div class="scroll-table" v-if="!loader">
                    <div v-for="livro in pageLivros.rows" :key="livro.idLivro">
                        <div class="box-livro mb-2" >
                            <div class="img-livro">
                                <img 
                                :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (livro.imagemLivro == null ? '1557681051638': livro.imagemLivro)" 
                                alt="capa-livro">
                                
                            </div>
                            <div class="info-livro">
                                <div class="title-livro">
                                    <h4><strong>{{livro.tituloLivro}}</strong></h4>
                                    <h4>{{livro.autor.nomeAutor}}</h4>
                                </div>
                                <div class="desc-livro">
                                    <div class="desc1">
                                        <span><strong>Ano: </strong>{{livro.anoLivro}}</span>
                                        <span><strong>Tipo:</strong> {{livro.condicaoLivro}}</span>
                                        <span><strong>Qtd.:</strong> {{livro.qtdTotal}}</span>
                                    </div>
                                    <div class="desc2">
                                        <span><strong>Editora:</strong> {{livro.editora.nomeEditora}}</span>
                                        <span><strong>Assunto:</strong> {{livro.assunto.nomeAssunto}}</span>
                                        <span><strong>ID:</strong> {{livro.idLivro}}</span>
                                    </div>
                                </div>  
                            </div><!--info-->

                            <div class="info2-livro">
                                <h4>{{'R$' + livro.precoLivro}}</h4>
                                <div class="btns-livro">
                                    <b-button @click="loadLivro(livro.idLivro);zeraLivroDesc();$bvModal.show('new-livro-descrito')"
                                     v-b-tooltip.hover title="Adicionar" 
                                    variant="primary" class="mr-2"><i class="fa fa-plus"></i></b-button>
                                    <b-button v-b-tooltip.hover title="Alterar" 
                                    variant="warning" class="mr-2"><i class="fa fa-pencil"></i></b-button>
                                    <b-button @click="loadLivro(livro.idLivro);$bvModal.show('modal-detalhes-livro')"
                                    v-b-tooltip.hover title="Detalhes" 
                                    variant="dark"><i class="fa fa-search-plus"></i></b-button>
                                </div>
                                
                                <b-button :disabled="livro.livrosDescritos.length < 1" @click="livro.showCollapse = !livro.showCollapse" class="mt-2" variant="secondary">Descrição<i class="fa fa-caret-down ml-2"></i></b-button>

                            </div><!--btn-->
                        </div><!--box-->
                        <div v-if="livro.livrosDescritos.length > 0">
                            
                            <b-collapse id="collapse-livro" class="mb-3" v-model="livro.showCollapse">
                                <h4 class="text-center">Livros Descritos</h4>
                                <b-table :responsive="true" :items="livro.livrosDescritos" :fields="fields" hover striped >
                                    <template slot="actions">
                                        <b-button variant="warning"
                                            v-b-tooltip.hover title="Alterar">
                                            <i class="fa fa-pencil"></i>
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-collapse>
                            
                        </div>
                    </div>

                    
                    
                </div> <!--scroll-->
                <div v-if="!loader && pageLivros.rows.length < 1" class="mb-2">
                    <span>Nenhum resultado...</span>
                </div>
                <b-pagination size="md" v-model="page" :total-rows="pageLivros.count" :per-page="10"></b-pagination>
            </b-card>

            <b-modal size="lg" id="new-livro-descrito" hide-footer>
                <template slot="modal-title">
                    <h3>Cadastro Livro Descrito</h3>
                </template>
                <div class="d-block">
                    <FormLivroDescrito @save-livro-desc="saveLivroDesc" :livroDescrito="livroDescrito" :livroSelecionado="livroSelecionado" />
                </div>
            </b-modal>

            <ModalDetalhesLivro :livroSelecionado="livroSelecionado" />
        </div> <!--component-->
</template>

<script>
import PageTitle from '../template/PageTitle'
import {mapGetters} from 'vuex'
import Loading from '../shared/Loading'
import ModalDetalhesLivro from './ModalDetalhesLivro'
import FormLivroDescrito from './FormLivroDescrito'
import axios from 'axios';
import { baseApiUrl, showError} from '@/global';
export default {
    name: 'Livros',
    components: {PageTitle, Loading, ModalDetalhesLivro, FormLivroDescrito},
    computed: mapGetters(['pageLivros']),
    mounted(){
        this.getLivros();
    },
    data(){
        return {
            loader: false,
            page: 1,
            livroSelecionado: null,
            fields: [
                {key: 'subIdLivro', label: 'SubCód.', sortable: true},
                {key: 'textLivroDescrito', label: 'Desc.', sortable: true, 
                formatter: value => value != null ? value : 'N/A'},
                {key: 'qtdLivro', label: 'Qtd.', sortable: true},
                {key: 'precoLivroDescrito', label: 'Preço', sortable: true, 
                formatter: (value) => {return 'R$' + value;}},
                {key: 'actions', label: 'Ações'}
            ],
            options: [
                {name: 'Título', value: 'titulo'},
                {name: 'Autor', value: 'autor'},
                {name: 'Editora', value: 'editora'}
            ],
            filtroSelecionado: 'titulo',
            nomeFiltro: '',
            livroDescrito: {descricoes: []}
        }
    },
    watch:{
        page(){
            this.getLivros()
        }
    },
    methods:{
        async getLivros(){
            this.loader = true;
        try{
            await this.$store.dispatch('GET_LIVROS', {page: this.page -1, name: this.filtroSelecionado, value: this.nomeFiltro});
        }catch(err){
            () => {}
        }finally{
            this.loader = false;
        }     
        },
        loadLivro(id){
            this.livroSelecionado = id;
        },
        async saveLivroDesc(livroDesc){
            const url = `${baseApiUrl}/livrosdescritos`;
            try{
                await axios.post(url, livroDesc);
                this.$toasted.global.defaultSuccess();
                this.getLivros();
                this.zeraLivroDesc();
                this.$bvModal.hide('new-livro-descrito');
            }catch(err){
                showError(err);
            }
            
        },
        zeraLivroDesc(){
            this.livroDescrito= {descricoes: []};
        }
    }
}
</script>

<style scoped>

    #collapse-livro{
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    .box-livro{
        border:1px solid #ccc;
        border-radius: 5px;
        display:flex;
        height: auto;
        padding:5px;
    }
    .img-livro{
        flex:1;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2px;
        margin-right:5px;
    }
    
    .img-livro img{
        width: 100px;
        height: 140px;
    }
    .info-livro{
        display: flex;
        padding:5px;
        flex-direction: column;
        flex:5;
        margin-right: 5px;
    }

    .desc-livro{
        display: flex;    
    }

    .desc1{
        display: flex;
        flex-direction: column;
        margin-right: 50px;
    }

    .desc2{
        display: flex;
        flex-direction: column;
    }

    .desc-livro span{
        margin-right: 10px;
    }
   
    .info2-livro{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .btns-livros{
        display: flex;
    }

    @media (max-width: 500px) {
        .scroll-table{
            overflow-x: auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            
        }

        .box-livro{
            border: none;
        }        

        
    }
</style>
