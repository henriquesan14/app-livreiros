<template>
    <div class="c-detalhes-livro">
        <b-modal size="lg" id="modal-detalhes-livro" hide-footer>
            <template slot="modal-title">
                <h3>Detalhes Livro</h3>
            </template>
            <Loading :loader="loader" />
            <div v-if="!loader" class="d-block">
                <div class="detalhes-livro">
                    <div class="box1">
                        <div class="infos1">
                            <span><strong>Id:</strong> {{livro.idLivro}}</span>
                            <span><strong>ISBN:</strong> {{livro.isbn ? livro.isbn : 'N/A'}}</span>
                            <span><strong>Titulo:</strong> {{livro.tituloLivro}}</span>
                            <span><strong>Autor:</strong> {{livro.autor.nomeAutor}}</span>
                            <span><strong>Editora:</strong> {{livro.editora.nomeEditora}}</span>
                            <span><strong>Assunto:</strong> {{livro.assunto.nomeAsunto ? livro.assunto.nomeAsunto : 'N/A'}}</span>
                            <span><strong>Idioma:</strong> {{livro.idiomaLivro ? livro.idiomaLivro : 'N/A'}}</span>
                        </div>
                        <div>
                            <img class="img-livro" 
                            :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (livro.imagemLivro == null ? '1557681051638': livro.imagemLivro)" alt="">
                        </div>
                    </div>

                    <div class="box2">
                        <div class="infos2">
                            <span><strong>Ano:</strong> {{livro.anoLivro}}</span>
                            <span><strong>Condição:</strong> {{livro.condicaoLivro}}</span>
                            <span><strong>Dimensões:</strong> {{livro.dimensaoLivro ? livro.dimensaoLivro : 'N/A'}}</span>
                            <span><strong>Coleção:</strong> {{livro.colecaoLivro ? livro.colecaoLivro : 'N/A'}}</span>
                            <span><strong>Ilustração:</strong> {{livro.ilustracaoLivro ? livro.ilustracaoLivro : 'N/A'}}</span>
                        </div>

                        <div class="infos3">
                            <span><strong>Edição:</strong> {{livro.edicaoLivro ? livro.edicaoLivro : 'N/A'}}</span>
                            <span><strong>Preço:</strong> {{'R$' + livro.precoLivro}}</span>
                            <span><strong>Peso:</strong> {{livro.pesoLivro ? livro.pesoLivro : 'N/A'}}</span>
                            <span><strong>Tradução:</strong> {{livro.traducaoLivro ? livro.traducaoLivro : 'N/A'}}</span>
                            <span><strong>Acabamento:</strong> {{livro.acabamentoLivro}}</span>
                        </div>

                        <div class="infos4">
                            <h5><strong>Qtd. estoque:</strong> {{livro.qtdTotal}}</h5>
                        </div>
                    </div>
                    <div class="box3">
                         <b-form-group>
                             <label><strong>Sinopse:</strong></label>
                            <b-form-textarea readonly="readonly" cols="100" rows="4"
                            :value="livro.sinopseLivro ? livro.sinopseLivro : 'N/A'">
                            
                            </b-form-textarea>
                        </b-form-group>
                    </div>
                    <h4 class="text-center mt-3">Movimentações</h4>
                    <b-table :responsive="true"  :items="livro.livroMovimentos" :fields="fields" striped hover>
                    </b-table>
                    <div v-if="livro.livroMovimentos.length < 1">
                            Nenhuma movimentação
                    </div>
                </div> <!--detalhes-livro-->
            </div> <!--body-modal-->
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError} from '@/global';
import Loading from '../shared/Loading'
import moment from 'moment'
export default {
    name: 'ModalDetalhesLivro',
    components: {Loading},
    data(){
        return {
            livro: {
                autor: {},
                editora: {},
                assunto: {},
                livroMovimentos: [],
                livrosDescritos: []
            },
            date: '2019-05-22 16:10',
            loader: false,
            fields: [
                {key: 'createdAt', label: 'Data/Hora', sortable: true, 
                formatter: (value) => {
                    return moment(String(value)).format('MM/DD/YYYY HH:mm')}
                    },
                {key: 'subIdLivro', label: 'SubCód.', sortable: true},
                {key: 'idUsuario', label: 'Usuário', sortable: true},
                {key: 'tipoLivroMovimento', label: 'Tipo', sortable: true},
                {key: 'qtdMovimento', label: 'Qtd.', sortable: true},
            ]
        }
    },
    props: ['livroSelecionado'],

    watch: {
        livroSelecionado(){
            this.getLivro();
        }
    },
    methods: {
        async getLivro(){
            this.loader = true;
            const url = `${baseApiUrl}/livros/${this.livroSelecionado}`
            try{
                const res = await axios.get(url);
                this.livro = res.data
            }catch(err){
                showError(err)
            }finally{
                this.loader = false;
            }
            
        }
    }
}
</script>

<style>

    .detalhes-livro{
        display: flex;
        flex-direction: column;
        padding: 10px;
        border: 1px solid #ccc;
    }

    .box1{  
        padding: 10px; 
        display: flex;
        justify-content: space-between;
        
    }

    .infos1{
        display: flex;
        flex-direction: column;
        font-size: 18px;
    }

    
    .box2{
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .infos2{
        display:flex;
        flex-direction: column;
    }

    .infos3{
        display:flex;
        flex-direction: column;
    }
    

    .box3{
        display:flex;
        
    }

    img.img-livro{
        width: 160px;
        height: 220px;
    }
</style>
