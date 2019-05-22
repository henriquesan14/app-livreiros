<template>
    <div class="cadastro-livro">
        <PageTitle icon="fa fa-book" main="Administração de livros" sub="Cadastro livro"/>
        <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/livros">Voltar</router-link>
        <b-card header="Novo livro">
            <b-form @submit.prevent="upload()">

                <b-row>
                    <b-col md="12">
                        <b-form-group label="Imagem:">
                            <b-form-file v-model="livro.imagemLivro" accept="image/jpeg, image/png" browse-text="Procurar"  
                            placeholder="Escolha uma imagem..."></b-form-file>
                        </b-form-group>
                    </b-col>
                </b-row> 

                <b-row>
                    <b-col md="12" >
                        <b-input-group prepend="ISBN" class="mb-3">
                            <b-form-input v-model="livro.isbnLivro" type="text" placeholder="Informe o ISBN..." />
                            <b-input-group-append>
                                <b-button @click="searchIsbn()" variant="primary"><i class="fa fa-cloud-download mr-1"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Titulo" class="mb-3">
                            <b-form-input v-model="livro.tituloLivro" type="text" placeholder="Titulo..." />
                        </b-input-group>
                    </b-col>
                </b-row>

                

                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Autor" class="mb-3">
                            <b-form-input v-model="livro.autorLivro" type="text" placeholder="Autor..." />
                            <b-input-group-append>
                                <b-button class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                <b-button variant="primary"><i class="fa fa-plus"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Assunto" class="mb-3">
                            <b-form-input type="text" placeholder="Assunto..." />
                            <b-input-group-append>
                                <b-button class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                <b-button variant="primary"><i class="fa fa-plus"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Editora" class="mb-3">
                            <b-form-input v-model="livro.editoraLivro" type="text" placeholder="Editora..." />
                            <b-input-group-append>
                                <b-button class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                <b-button variant="primary"><i class="fa fa-plus"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Idioma" class="mb-3">
                            <b-form-input type="text" placeholder="Idioma..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Ano de publicação" class="mb-3">
                            <b-form-input v-model="livro.anoLivro" type="text" placeholder="Idioma..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Edição" class="mb-3">
                            <b-form-input type="text" placeholder="Edição..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Preço" class="mb-3">
                            <b-form-input type="text" placeholder="Preço..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Condição">
                            <b-form-select v-model="livro.condicaoLivro">
                                <option :value="null">Selecione a condição</option>
                                <option value="1">Usado</option>
                                <option value="2">Novo</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Qtd. de páginas">
                            <b-form-input v-model="livro.paginasLivro" type="text" placeholder="Qtd. páginas..." />
                        </b-form-group>
                    </b-col>
                </b-row>  

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Peso (g)">
                            <b-form-input type="text" placeholder="Peso..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Coleção">
                            <b-form-input type="text" placeholder="Coleção..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Tradução">
                            <b-form-input type="text" placeholder="Tradução..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Ilustração">
                            <b-form-input type="text" placeholder="Ilustração..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Dimensões">
                            <b-form-input type="text" placeholder="Dimensões..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Acabamento">
                            <b-form-select v-model="livro.acabamentoLivro">
                                <option :value="null">Selecione o acabamento</option>
                                <option value="1">Capa comum</option>
                                <option value="2">Capa dura</option>
                                <option value="3">Livro de bolso</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group label="Sinopse">
                            <b-form-textarea v-model="livro.sinopseLivro" placeholder="Sinopse..."
      rows="6"></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-button type="submit" class="mr-2" variant="success">Salvar</b-button>  
                <b-button variant="danger" class="mr-2">Limpar</b-button>
                <router-link tag="b-button" to="/dashboard/livros" class="btn-dark">Voltar</router-link>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios';
import { baseApiUrl} from '@/global';
export default {
    name:'CadastroLivro',
    components: {PageTitle},
    data(){
        return {
            livro: {
                imagemLivro: null,
                acabamentoLivro: null,
                condicaoLivro: null,
            }
            
        }
    },
    methods: {
        searchIsbn(){
            const url = `${baseApiUrl}/livros/isbn/${this.livro.isbnLivro}`
            axios.get(url).then(res => this.livro = res.data.Busca).catch(err => console.log(err.response))
        },
        upload(){
            const fd = new FormData();
            fd.append('image', this.livro.imagemLivro)
            axios.post(`${baseApiUrl}/livros/capa`, fd, {
            }).then(() => {})
            .catch(() => {})
        }
    }
}
</script>

<style>

</style>
