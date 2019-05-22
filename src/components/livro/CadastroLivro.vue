<template>
    <div class="cadastro-livro">
        <PageTitle icon="fa fa-book" main="Administração de livros" sub="Cadastro livro"/>
        <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/livros">Voltar</router-link>
        <b-card header="Novo livro">
            <b-form @submit.prevent="submitLivro()">

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
<<<<<<< HEAD
                            <b-form-input v-model="livro.isbnLivro" type="text" placeholder="Informe o ISBN..." />
                            <b-input-group-append>
                                <b-button @click="searchIsbn()" variant="primary"><i class="fa fa-cloud-download mr-1"></i></b-button>
=======
                            <b-form-input maxLength="13"  v-model.trim="livro.isbn" type="text" placeholder="Informe o ISBN..." />
                            <b-input-group-append>
                                <b-button @click.prevent="searchIsbn()" variant="primary"><i class="fa fa-cloud-download mr-1"></i></b-button>
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <Loading class="mb-2" :loader="loaderIsbn"/>

                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Titulo" class="mb-3">
<<<<<<< HEAD
                            <b-form-input v-model="livro.tituloLivro" type="text" placeholder="Titulo..." />
=======
                            <b-form-input maxLength="100"
                            :class="{'is-invalid': submitted && $v.livro.tituloLivro.$invalid, 'is-valid': submitted && !$v.livro.tituloLivro.$invalid}"
                             v-model="livro.tituloLivro" type="text" placeholder="Titulo..." />
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                        </b-input-group>
                    </b-col>
                </b-row>

                <span class="text-danger" v-if="submitted && $v.livro.idAutor.$invalid">Selecione um autor</span>
                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Autor" class="mb-3">
<<<<<<< HEAD
                            <b-form-input v-model="livro.autorLivro" type="text" placeholder="Autor..." />
=======
                            <b-form-input maxLength="100"
                             v-model="autor.nomeAutor"  placeholder="Autor..."></b-form-input>
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                            <b-input-group-append>
                                <b-button @click.prevent="searchAutores()" class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                <b-button variant="primary" @click.prevent="$bvModal.show('modal-autor')"><i class="fa fa-plus"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                        
                    </b-col>
                </b-row>
                <span class="text-primary" v-if="subAutor && autores.length < 1">Nenhum resultado...</span>

                

                <Loading class="mb-2" :loader="loaderAutor"/>
                <b-row v-if="!loaderAutor && autores.length > 0">
                    <b-col>
                        <b-form-group>
                            <b-form-radio v-model="livro.idAutor" v-for="autor in autores" :key="autor.idAutor" :value="autor.idAutor">{{autor.nomeAutor}}</b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <span class="text-danger" v-if="submitted && $v.livro.idAssunto.$invalid">Selecione um assunto</span>
                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Assunto" class="mb-3">
                            <b-form-input maxLength="100" v-model="assunto.nomeAssunto" placeholder="Assunto..." />
                            <b-input-group-append>
                                <b-button @click.prevent="searchAssuntos()" class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                <b-button variant="primary" @click.prevent="$bvModal.show('modal-assunto')"><i class="fa fa-plus"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <span class="text-primary" v-if="subAssunto && assuntos.length < 1">Nenhum resultado...</span>

                <Loading class="mb-2" :loader="loaderAssunto"/>
                <b-row v-if="!loaderAssunto && assuntos.length > 0">
                    <b-col>
                        <b-form-group>
                            <b-form-radio v-model="livro.idAssunto" v-for="assunto in assuntos" :key="assunto.idAssunto" :value="assunto.idAssunto">{{assunto.nomeAssunto}}</b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <span class="text-danger" v-if="submitted && $v.livro.idEditora.$invalid">Selecione uma editora</span>
                <b-row>
                    <b-col md="12">
                        <b-input-group prepend="Editora" class="mb-3">
<<<<<<< HEAD
                            <b-form-input v-model="livro.editoraLivro" type="text" placeholder="Editora..." />
=======
                            <b-form-input maxLength="100" v-model="editora.nomeEditora" placeholder="Editora..." />
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                            <b-input-group-append>
                                <b-button @click.prevent="searchEditoras()" class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                <b-button variant="primary" @click.prevent="$bvModal.show('modal-editora')"><i class="fa fa-plus"></i></b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <span class="text-primary" v-if="subEditora && editoras.length < 1">Nenhum resultado...</span>

                <Loading class="mb-2" :loader="loaderEditora"/>
                <b-row v-if="!loaderEditora && editoras.length > 0">
                    <b-col>
                        <b-form-group>
                            <b-form-radio v-model="livro.idEditora" v-for="editora in editoras" :key="editora.idEditora" :value="editora.idEditora">{{editora.nomeEditora}}</b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Idioma" class="mb-3">
                            <b-form-input maxLength="35" v-model="livro.idiomaLivro" type="text" placeholder="Idioma..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
<<<<<<< HEAD
                        <b-form-group label="Ano de publicação" class="mb-3">
                            <b-form-input v-model="livro.anoLivro" type="text" placeholder="Idioma..." />
=======
                        <b-form-group
                         label="Ano de publicação" class="mb-3">
                            <the-mask
                            :class="{'is-invalid': submitted && $v.livro.anoLivro.$invalid, 'is-valid': submitted && !$v.livro.anoLivro.$invalid}"
                             class="form-control" :mask="'####'" v-model="livro.anoLivro" type="text" placeholder="Ano..." />
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group  label="Edição" class="mb-3">
                            <b-form-input maxLength="5" v-model="livro.edicaoLivro" type="text" placeholder="Edição..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <label for="preco">Preço</label>
                        <b-input-group prepend="R$" class="mb-3" >                         
                            <b-form-input
                            :class="{'is-invalid': submitted && $v.livro.precoLivro.$invalid, 'is-valid': submitted && !$v.livro.precoLivro.$invalid}"
                             maxLength="10" v-money="money" v-model.lazy="livro.precoLivro" type="text"  />
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Condição">
<<<<<<< HEAD
                            <b-form-select v-model="livro.condicaoLivro">
=======
                            <b-form-select
                            :class="{'is-invalid': submitted && $v.livro.condicaoLivro.$invalid, 'is-valid': submitted && !$v.livro.condicaoLivro.$invalid}" 
                            v-model="livro.condicaoLivro">
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                                <option :value="null">Selecione a condição</option>
                                <option value="Usado">Usado</option>
                                <option value="Novo">Novo</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Qtd. de páginas">
<<<<<<< HEAD
                            <b-form-input v-model="livro.paginasLivro" type="text" placeholder="Qtd. páginas..." />
=======
                            <the-mask :mask="'#####'" class="form-control"  v-model="livro.paginasLivro" type="text" placeholder="Qtd. páginas..." />
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                        </b-form-group>
                    </b-col>
                </b-row>  

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Peso (g)">
                            <the-mask :mask="'#####'" class="form-control"  v-model="livro.pesoLivro" type="text" placeholder="Peso..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Coleção">
                            <b-form-input maxLength="100" v-model="livro.colecaoLivro" type="text" placeholder="Coleção..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Tradução">
                            <b-form-input maxLength="100" v-model="livro.traducaoLivro" type="text" placeholder="Tradução..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Ilustração">
                            <b-form-input maxLength="100" v-model="livro.ilustracaoLivro" type="text" placeholder="Ilustração..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Dimensões">
                            <b-form-input maxLength="50" v-model="livro.dimensoesLivro" type="text" placeholder="Dimensões..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Acabamento">
<<<<<<< HEAD
                            <b-form-select v-model="livro.acabamentoLivro">
=======
                            <b-form-select
                            :class="{'is-invalid': submitted && $v.livro.acabamentoLivro.$invalid, 'is-valid': submitted && !$v.livro.acabamentoLivro.$invalid}"
                             v-model="livro.acabamentoLivro">
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                                <option :value="null">Selecione o acabamento</option>
                                <option value="Capa comum">Capa comum</option>
                                <option value="Capa dura">Capa dura</option>
                                <option value="Aspiral">Aspiral</option>
                                <option value="Livro de Bolso">Livro de bolso</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group label="Sinopse">
                            <b-form-textarea v-model="livro.sinopseLivro" placeholder="Sinopse..."
<<<<<<< HEAD
      rows="6"></b-form-textarea>
=======
      rows="8"></b-form-textarea>
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-button type="submit" class="mr-2" variant="success">Salvar</b-button>  
                <b-button @click="reset()" variant="danger" class="mr-2">Limpar</b-button>
                <router-link tag="b-button" to="/dashboard/livros" class="btn-dark">Voltar</router-link>
            </b-form>
            <Loading :loader="loaderLivro" />
        </b-card>

        <FormAutor :autor="autor"/>
        <FormEditora :editora="editora"/>
        <FormAssunto :assunto="assunto"/>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import FormAutor from './FormAutor'
import FormAssunto from './FormAssunto'
import FormEditora from './FormEditora'
import axios from 'axios';
import { baseApiUrl, showError} from '@/global';
import { mapGetters } from 'vuex'
import Loading from '../shared/Loading'
import { required, minValue, minLength } from "vuelidate/lib/validators";
import {VMoney} from 'v-money'
export default {
    name:'CadastroLivro',
    components: {PageTitle, Loading, FormAutor, FormAssunto, FormEditora},
    directives: {money: VMoney},
    data(){
        return {
            livro: {
<<<<<<< HEAD
                imagemLivro: null,
                acabamentoLivro: null,
                condicaoLivro: null,
            }
            
=======
                acabamentoLivro: null,
                condicaoLivro: null
            },
            assunto: {
                nomeAssunto: ''
            },
            editora: {
                nomeEditora: ''
            },
            autor: {
                nomeAutor: ''
            },
            image: null,
            loaderAutor: false,
            loaderEditora: false,
            loaderAssunto: false,
            loaderIsbn: false,
            loaderLivro: false,
            submitted: false,
            money: {
                decimal: '.',
                thousands: '',
                precision: 2,
                masked: false
            },
            subAutor: false,
            subEditora: false,
            subAssunto: false,
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
        }
    },
    validations: {
        livro: {
            tituloLivro: {required},
            idAutor: {required},
            idEditora: {required},
            idAssunto: {required},
            acabamentoLivro: {required},
            condicaoLivro: {required},
            anoLivro: {required, minLength: minLength(4)},
            precoLivro: {required, minValue: minValue(5)}
        }
    },
    computed: mapGetters(['autores', 'editoras', 'assuntos']),
    mounted(){
    },
    methods: {
<<<<<<< HEAD
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
=======
        async searchIsbn(){
            this.loaderIsbn = true;
            const url = `${baseApiUrl}/livros/isbn/${this.livro.isbn}`
            try{
                const res = await axios.get(url);
                this.importToInput(res);
            }catch(err){
                showError(err);
            }finally{
                this.loaderIsbn = false;
            }
        },
        importToInput(res){
                this.autor.nomeAutor = res.data.Busca.autorLivro;
                this.editora.nomeEditora = res.data.Busca.editoraLivro;
                this.livro.tituloLivro = res.data.Busca.tituloLivro;
                this.livro.paginasLivro = res.data.Busca.paginasLivro;
                this.livro.anoLivro = res.data.Busca.anoLivro;
                this.livro.sinopseLivro = res.data.Busca.sinopseLivro;
        },
        searchAutores(){
            this.getAutores(this.autor.nomeAutor);
        },
        searchEditoras(){
            this.getEditoras(this.editora.nomeEditora);
        },
        searchAssuntos(){

            this.getAssuntos(this.assunto.nomeAssunto);
        },
        async getAutores(nome){
            this.loaderAutor = true;
            try{
                await this.$store.dispatch('GET_AUTORES', {nome})
            }catch(err){
                showError(err);
            }
            finally{
                this.loaderAutor = false;
                this.subAutor = true;
            }
        },
        async getEditoras(nome){
            this.loaderEditora = true;
            try{
                await this.$store.dispatch('GET_EDITORAS', {nome})
            }catch(err){
                showError(err);
            }
            finally{
                this.loaderEditora = false;
                this.subEditora = true;
            }
        },
        async getAssuntos(nome){
            this.loaderAssunto = true;
            try{
                await this.$store.dispatch('GET_ASSUNTOS', {nome})
            }catch(err){
                showError(err);
            }
            finally{
                this.loaderAssunto = false;
                this.subAssunto = true;
            }
        },
        async saveLivro(){
            const url = `${baseApiUrl}/livros`
            try{
                await axios.post(url, this.livro);
                this.reset();
                    this.$toasted.global.defaultSuccess();
            }catch(err){
                showError(err);
            }
        },
        async upload(){
            this.loaderLivro = true;
            const fd = new FormData();
            fd.append('image', this.image)
            try{
                const res = await axios.post(`${baseApiUrl}/livros/capa`, fd, {
                });
                this.livro.imagemLivro = res.data.imagemLivro;
                this.saveLivro();
            }catch(err){
                showError(err);
            }finally{
                this.loaderLivro = false;
            }
        },
        submitLivro() {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                
                if (this.$v.$invalid) {
                    return;
                }
                this.submitted = false;
                this.upload();
        },
        reset(){
            this.submitted = false;
            this.livro = {
                acabamentoLivro: null,
                condicaoLivro: null
            };
            this.image = null;
            this.autor.nomeAutor = '';
            this.editora.nomeEditora = '';
            this.assunto.nomeAssunto = '';
>>>>>>> 62e23ec2dc2784a0f45847042d76af4819ec19d0
        }
    }
}
</script>

<style>
#my-list-id option{
    width: 600px;
}
</style>
