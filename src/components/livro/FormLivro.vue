<template>
<div class="form-livro">
    <b-form @submit.prevent="submitLivro()">
                <img id="img-livro" v-if="livro.imagemLivro || url" :src="url ? url  : 'https://imagens-capas-1.s3.amazonaws.com/'+ livro.imagemLivro">

                <button type="button" v-if="url" @click.prevent="url = null; image=null" class="btn-danger btn-center"><i class="fa fa-times"></i></button>
                <b-row>
                    <b-col md="12">
                        <b-form-group label="Imagem:">
                            <b-form-file @change="onFileChange" v-model="image" accept="image/jpeg, image/png" browse-text="Procurar"  
                            placeholder="Escolha uma imagem..."></b-form-file>
                        </b-form-group>
                    </b-col>
                </b-row> 

                <b-row>
                    <b-col md="12" >
                        <b-form-group label="ISBN: ">
                                <b-form-input  @blur="searchIsbn()" maxLength="13"  v-model.trim="livro.isbn" type="text" placeholder="Informe o ISBN..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <b-form-group :invalid-feedback="invalidFeedBack($v.livro.tituloLivro)" label="Título: *" >
                                <b-form-input maxLength="100"
                                :class="{'is-invalid': submitted && $v.livro.tituloLivro.$invalid, 'is-valid': submitted && !$v.livro.tituloLivro.$invalid}"
                                v-model="livro.tituloLivro" type="text" placeholder="Titulo..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <span class="text-danger font-menor" v-if="submitted && $v.livro.idAutor.$invalid">Selecione um autor</span>

                <b-row>
                    <b-col md="12">
                        <b-form-group label="Autor: *">
                            <b-input-group >
                                <b-form-input maxLength="100"
                                v-model="autor.nomeAutor"  placeholder="Autor..."></b-form-input>
                                <b-input-group-append>
                                    <b-button :disabled="!autor.nomeAutor" @click.prevent="searchAutores()" class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                    <b-button variant="primary" @click.prevent="$bvModal.show('modal-autor')"><i class="fa fa-plus"></i></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <span class="text-primary font-menor" v-if="subAutor && pageAutores.rows.length < 1">Nenhum resultado...</span>
                        </b-form-group>
                        
                    </b-col>
                </b-row>
                

                <b-row v-if="pageAutores.rows.length > 0">
                    <b-col>
                        <b-form-group>
                            <b-form-radio v-model="livro.idAutor" v-for="autor in pageAutores.rows" :key="autor.idAutor" :value="autor.idAutor">{{autor.nomeAutor}}</b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <span class="text-danger font-menor" v-if="submitted && $v.livro.idAssunto.$invalid">Selecione um assunto</span>
                <b-row>
                    <b-col md="12">
                        <b-form-group label="Assunto: *" >
                            <b-input-group>
                                <b-form-input maxLength="100" v-model="assunto.nomeAssunto" placeholder="Assunto..." />
                                <b-input-group-append>
                                    <b-button :disabled="!assunto.nomeAssunto" @click.prevent="searchAssuntos()" class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                    <b-button variant="primary" @click.prevent="$bvModal.show('modal-assunto')"><i class="fa fa-plus"></i></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <span class="text-primary font-menor" v-if="subAssunto && pageAssuntos.rows.length < 1">Nenhum resultado...</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                

                <b-row v-if="pageAssuntos.rows.length > 0">
                    <b-col>
                        <b-form-group>
                            <b-form-radio v-model="livro.idAssunto" v-for="assunto in pageAssuntos.rows" :key="assunto.idAssunto" :value="assunto.idAssunto">{{assunto.nomeAssunto}}</b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <span class="text-danger font-menor" v-if="submitted && $v.livro.idEditora.$invalid">Selecione uma editora</span>
                <b-row>
                    <b-col md="12">
                        <b-form-group label="Editora: *">
                            <b-input-group>
                                <b-form-input maxLength="100" v-model="editora.nomeEditora" placeholder="Editora..." />
                                <b-input-group-append>
                                    <b-button :disabled="!editora.nomeEditora" @click.prevent="searchEditoras()" class="mr-2" variant="primary"><i class="fa fa-search"></i></b-button>
                                    <b-button variant="primary" @click.prevent="$bvModal.show('modal-editora')"><i class="fa fa-plus"></i></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <span class="text-primary font-menor" v-if="subEditora && pageEditoras.rows.length < 1">Nenhum resultado...</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                

                <b-row v-if="pageEditoras.rows.length > 0">
                    <b-col>
                        <b-form-group>
                            <b-form-radio v-model="livro.idEditora" v-for="editora in pageEditoras.rows" :key="editora.idEditora" :value="editora.idEditora">{{editora.nomeEditora}}</b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Idioma: " class="mb-3">
                            <b-form-input maxLength="35" v-model="livro.idiomaLivro" type="text" placeholder="Idioma..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group :invalid-feedback="invalidFeedBack($v.livro.anoLivro)"
                         label="Ano de publicação: *" class="mb-3">
                            <the-mask
                            :class="{'is-invalid': submitted && $v.livro.anoLivro.$invalid, 'is-valid': submitted && !$v.livro.anoLivro.$invalid}"
                             class="form-control" :mask="'####'" v-model="livro.anoLivro" type="text" placeholder="Ano..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group  label="Edição: " class="mb-3">
                            <b-form-input maxLength="5" v-model="livro.edicaoLivro" type="text" placeholder="Edição..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group :invalid-feedback="invalidFeedBack($v.livro.precoLivro)" label="Preço R$: *">                         
                            <b-form-input 
                            :class="{'is-invalid': submitted && $v.livro.precoLivro.$invalid, 'is-valid': submitted && !$v.livro.precoLivro.$invalid}"
                             maxLength="10" v-money="money" v-model="livro.precoLivro" type="text"  />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Condição: *" :invalid-feedback="invalidFeedBack($v.livro.condicaoLivro)">
                            <b-form-select
                            :class="{'is-invalid': submitted && $v.livro.condicaoLivro.$invalid, 'is-valid': submitted && !$v.livro.condicaoLivro.$invalid}" 
                            v-model="livro.condicaoLivro">
                                <option :value="null" disabled>Selecione a condição</option>
                                <option value="Usado">Usado</option>
                                <option value="Novo">Novo</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Qtd. de páginas: ">
                            <the-mask :mask="'#####'" class="form-control"  v-model="livro.paginasLivro" type="text" placeholder="Qtd. páginas..." />
                        </b-form-group>
                    </b-col>
                </b-row>  

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Peso (g): ">
                            <the-mask :mask="'#####'" class="form-control"  v-model="livro.pesoLivro" type="text" placeholder="Peso..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Coleção: ">
                            <b-form-input maxLength="100" v-model="livro.colecaoLivro" type="text" placeholder="Coleção..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Tradução: ">
                            <b-form-input maxLength="100" v-model="livro.traducaoLivro" type="text" placeholder="Tradução..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Ilustração: ">
                            <b-form-input maxLength="100" v-model="livro.ilustracaoLivro" type="text" placeholder="Ilustração..." />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group label="Dimensões: ">
                            <b-form-input maxLength="50" v-model="livro.dimensaoLivro" type="text" placeholder="Dimensões..." />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group label="Acabamento: *" :invalid-feedback="invalidFeedBack($v.livro.acabamentoLivro)">
                            <b-form-select
                            :class="{'is-invalid': submitted && $v.livro.acabamentoLivro.$invalid, 'is-valid': submitted && !$v.livro.acabamentoLivro.$invalid}"
                             v-model="livro.acabamentoLivro">
                                <option :value="null" disabled>Selecione o acabamento</option>
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
                        <b-form-group label="Sinopse: ">
                            <b-form-textarea v-model="livro.sinopseLivro" placeholder="Sinopse..."
      rows="8"></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-button size="sm" type="submit" class="mr-2" variant="success"><i class="fa fa-save mr-1"></i>Salvar</b-button>  
                <router-link tag="b-button" to="/dashboard/livros" class="btn-dark btn-sm"><i class="fa fa-arrow-left mr-1"></i>Voltar</router-link>
            </b-form>

            <FormAutor @zera-autor="getAutores(autor.nomeAutor)" :autor="autor"/>
            <FormEditora @zera-editora="getEditoras(editora.nomeEditora)" :editora="editora"/>
            <FormAssunto @zera-assunto="getAssuntos(assunto.nomeAssunto)" :assunto="assunto"/>
</div>
</template>

<script>
import FormAutor from './autor/FormAutor'
import FormAssunto from './assunto/FormAssunto'
import FormEditora from './editora/FormEditora'
import axios from 'axios';
import { baseApiUrl, showError} from '@/global';
import { mapGetters } from 'vuex'
import { required, minValue, minLength } from "vuelidate/lib/validators";
import {VMoney} from 'v-money';
import { validationMsg } from '../../config/validation-msgs';
export default {
    name: 'FormLivro',
    directives: {money: VMoney},
    components: {Loading, FormAutor, FormAssunto, FormEditora},
    computed: mapGetters(['livro','pageAutores', 'pageEditoras', 'pageAssuntos']),
    validations() {
        return {
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
        }
    },
    data(){
        return {
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
            url: null
        }
    },
    mounted(){
        this.resetStore();
    },
    created(){
        if(this.livro.idLivro){
            this.convertLivro();
        }
        
    },
    methods: {
        resetStore(){
            this.$store.dispatch('RESET_ASSUNTOS');
            this.$store.dispatch('RESET_EDITORAS');
            this.$store.dispatch('RESET_AUTORES');
        },
        async searchIsbn(){
            if(this.livro.isbn.length >= 10){
                let loader = this.$loading.show();
                const url = `${baseApiUrl}/livros/isbn/${this.livro.isbn}`
                try{
                    const res = await axios.get(url);
                    this.importToInput(res);
                }catch(err){
                    showError(err);
                }finally{
                    loader.hide();
                }
            } 
        },
        importToInput(res){        
            this.autor.nomeAutor = res.data.busca.autorLivro;
            this.editora.nomeEditora = res.data.busca.editoraLivro;
            let livro = {...this.livro};
            livro.tituloLivro = res.data.busca.tituloLivro;
            livro.paginasLivro = res.data.busca.paginasLivro;
            livro.anoLivro ? livro.anoLivro = res.data.busca.anoLivro : null;
            livro.sinopseLivro = res.data.busca.sinopseLivro;
            this.$store.dispatch('SET_LIVRO', {livro: livro});
        },
        convertLivro(){
            this.autor.nomeAutor = this.livro.autor.nomeAutor;
            this.editora.nomeEditora = this.livro.editora.nomeEditora;
            this.assunto.nomeAssunto = this.livro.assunto.nomeAssunto;
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
            let loader = this.$loading.show();
            try{
                await this.$store.dispatch('GET_AUTORES', {nome})
            }catch(err){
                showError(err);
            }
            finally{
                loader.hide();
                this.subAutor = true;
            }
        },
        async getEditoras(nome){
            let loader = this.$loading.show();
            try{
                await this.$store.dispatch('GET_EDITORAS', {nome})
            }catch(err){
                showError(err);
            }
            finally{
                loader.hide();
                this.subEditora = true;
            }
        },
        async getAssuntos(nome){
            let loader = this.$loading.show();
            try{
                await this.$store.dispatch('GET_ASSUNTOS', {nome})
            }catch(err){
                showError(err);
            }
            finally{
                loader.hide();
                this.subAssunto = true;
            }
        },
        async upload(){
            if(this.image){
                let loader = this.$loading.show();
                const fd = new FormData();
                fd.append('image', this.image)
                try{
                    const url = `${baseApiUrl}/livros/capa`
                    const res = await axios.post(url, fd, {
                    });
                    this.livro.imagemLivro = res.data.imagemLivro;
                    this.$emit('submit-livro', this.livro);
                }catch(err){
                    showError(err);
                }finally{
                    loader.hide();
                }
            }else{
                this.$emit('submit-livro', this.livro);
            }  
        },
        submitLivro() {
            this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            this.submitted = false;
            this.upload();
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
         invalidFeedBack(field){
            return validationMsg(field);
        }
    }
}
</script>

<style scoped>
    .font-menor{
        font-size:.780rem;
    }

    #img-livro{
        display: block;
        margin: 0 auto;
        width: 180px;
        height: 200px;
        border: 8px solid #0080FF;
        border-radius: 5px;
    }

    .btn-center{
        display: block;
        margin: 0 auto;
        border: none;
        padding: 8px 15px;
        margin-top: 5px;
        border-radius: 5px;
    }
</style>
