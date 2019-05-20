<template>
    <div class='users'>
       <PageTitle icon="fa fa-book" main="Administração de livros" sub="Gerenciar livros"/>
            
            <b-card header="Livros">
                <b-button size="sm" class="mb-2" variant="dark">Novo Livro</b-button>
                <b-row>
                    <b-col md="12" sm="12" class="mb-3">
                        <b-input-group>
                            <b-form-select class="col-2 mr-2">
                                <option value="1">Autor1</option>
                                <option value="2">Autor2</option>
                            </b-form-select>
                            <b-form-input  type="text" placeholder="Pesquise o nome do livro..." />
                            <b-input-group-append>
                                <b-button  variant="primary"><i class="fa fa-search"></i></b-button>
                            </b-input-group-append>
                            
                        </b-input-group>
                    </b-col>
                </b-row>

                <Loading :loader="loader"/>
                <div class="scroll-table" v-if="!loader">
                    <div class="box-livro mb-2" v-for="livro in pageLivros.rows" :key="livro.idLivro">
                        <div class="img-livro">
                            <img :src="'https://imagens-capas-1.s3.amazonaws.com/'+ livro.imagemLivro" alt="">
                            <h4>{{'R$' + livro.precoLivro}}</h4>
                        </div>
                        <div class="info-livro">
                            <div class="title-livro">
                                <h4>{{livro.tituloLivro}}</h4>
                                <h4>{{livro.autor.nomeAutor}}</h4>
                            </div>
                            <div class="desc-livro">
                                <div class="desc1">
                                    <span>{{livro.anoLivro}}</span>
                                    <span>{{livro.condicaoLivro}}</span>
                                    <span>Qtd.: 1</span>
                                </div>
                                <div class="desc2">
                                    <span>Editora: {{livro.editora.nomeEditora}}</span>
                                    <span>Assunto: {{livro.assunto.nomeAssunto}}</span>
                                    <span>ID: {{livro.idLivro}}</span>
                                </div>
                            </div>  
                        </div><!--info-->

                        <div class="btns-livro">
                            <b-button size="sm" variant="primary" class="mb-2">Adicionar</b-button>
                            <b-button size="sm" variant="warning" class="mb-2">Editar</b-button>
                            <b-button size="sm" variant="dark">Visualizar</b-button>
                        </div><!--btn-->
                    </div><!--box-->
                </div> <!--scroll-->
                <div v-if="!loader && pageLivros.rows.length < 1" class="mb-2">
                    <span>Nenhum resultado...</span>
                </div>
                <b-pagination size="md" v-model="page" :total-rows="pageLivros.count" :per-page="10"></b-pagination>
            </b-card>
        </div> <!--component-->
</template>

<script>
import PageTitle from '../template/PageTitle'
import {mapGetters} from 'vuex'
import Loading from '../shared/Loading'
export default {
    name: 'Livros',
    components: {PageTitle, Loading},
    computed: mapGetters(['pageLivros']),
    mounted(){
        this.getLivros();
    },
    data(){
        return {
            loader: false,
            page: 1,
        }
    },
    watch:{
        page(){
            this.getUsers()
        }
    },
    methods:{
        async getLivros(){
            this.loader = true;
        try{
            await this.$store.dispatch('GET_LIVROS', {page: this.page -1});
        }catch(err){
            () => {}
        }finally{
            this.loader = false;
        }     
        }
    }
}
</script>

<style>

    
    .box-livro{
        border:1px solid #ccc;
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
   
    .btns-livro{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    @media (max-width: 800px) {
        .scroll-table{
            overflow-x: auto;
        }

        .box-livro{
            border: none;
        }
    }
</style>
