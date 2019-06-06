<template>
    <div>
        <Loading :loader="loader"/>
        <div v-if="!loader" class="table-responsive">
            <table class="table table-hover table-sm table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Ano</th>
                        <th>Condicao</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{livro.tituloLivro}}</td>
                        <td>{{livro.autor.nomeAutor ? livro.autor.nomeAutor : 'N/A'}}</td>
                        <td>{{livro.editora.nomeEditora ? livro.editora.nomeEditora: 'N/A'}}</td>
                        <td>{{livro.anoLivro}}</td>
                        <td>{{livro.condicaoLivro}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-form @submit.prevent="submitLivroDesc()" v-if="!loader">
            <b-row>
                <b-col >
                    <b-form-group label="Código.">
                        <b-form-input size="sm" :readonly="true" :value="livro.idLivro" />
                    </b-form-group>
                </b-col>
                <b-col >
                    <b-form-group label="SubCódigo.">
                        <b-form-input size="sm" :readOnly="livroDescrito.idLivroDescrito" :class="{'is-invalid': submitted && $v.livroDescrito.subIdLivro.$invalid, 'is-valid': submitted && !$v.livroDescrito.subIdLivro.$invalid}" 
                        v-model="livroDescrito.subIdLivro" maxLength="2" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Valor">
                        <b-form-input size="sm" :readonly="true" :value="livro.precoLivro" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                
                <b-col md="4">
                    <b-form-group :label="livroDescrito.idLivroDescrito? 'Qtd. Atual' : 'Qtd.'">
                        <the-mask  :readOnly="livroDescrito.idLivroDescrito" :class="{'is-invalid': submitted && $v.livroDescrito.qtdLivro.$invalid, 'is-valid': submitted && !$v.livroDescrito.qtdLivro.$invalid}"
                         mask="####" class="form-control form-control-sm" v-model="livroDescrito.qtdLivro" />
                    </b-form-group>
                </b-col>
                <b-col  v-if="livroDescrito.idLivroDescrito">
                    <b-form-group label="Qtd.">
                        <the-mask
                         mask="####" class="form-control form-control-sm" v-model="livroDescrito.qtd" />
                    </b-form-group>
                </b-col>
                <b-col v-if="livroDescrito.idLivroDescrito" >
                    <b-form-group label="Tipo Movimento">
                        <b-form-select
                                v-model="livroDescrito.movimento">
                                    <option v-for="op in options" :key="op.name" :value="op.value">{{op.name}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>


            <b-row>
                <b-col>
                    <b-form-group label="Obs.">
                        <b-form-textarea v-model="livroDescrito.obsLivroDescrito" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row v-if="livroDescrito.textLivroDescrito">
                <b-col>
                    <b-form-group label="Descrição Atual">
                        <b-form-textarea :readonly="true" v-model="livroDescrito.textLivroDescrito" />
                    </b-form-group>
                </b-col>
            </b-row>
            
            <div v-for="categoria in categoriasAtivas" :key="categoria.idCategoriaDescricao">
                <h5 class="title-descricoes"><strong>{{categoria.nomeCategoriaDescricao}}</strong></h5>
                <b-table class="table-sm" :items="categoria.descricoes" :fields="fields"  striped hover>
                    <template slot="actions" slot-scope="data">
                        <b-form-checkbox-group>
                            <b-form-checkbox @change="onChangeDesc(data.item.idDescricao)"></b-form-checkbox>
                        </b-form-checkbox-group>
                    </template>
                </b-table>
            </div>
            <b-button size="sm" type="submit" class="mr-2" variant="success"><i class="fa fa-save mr-1"></i>{{livroDescrito.idLivroDescrito ? 'Alterar': 'Adicionar'}}</b-button>
            <b-button size="sm" @click="$bvModal.hide('new-livro-descrito');$bvModal.hide('edit-livro-descrito')"><i class="fa fa-arrow-left mr-1"></i>Fechar</b-button>
        </b-form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import axios from 'axios';
import { baseApiUrl, showError} from '@/global';
import Loading from '../shared/Loading'
import { required } from "vuelidate/lib/validators";
export default {
    name: 'FormLivroDescrito',
    components: {Loading},
    computed: mapGetters(['categoriasAtivas']),
    mounted(){
        this.$store.dispatch('GET_CATEGORIAS_ATIVAS');
    },
    props: [
        'livroSelecionado',
        'livroDescrito'
    ],
    watch: {
        livroSelecionado(){
            this.getLivro();
        }
    },
    data(){
        return {
            loader: false,
            livro: {autor: {}, editora: {}},
            fields: [
                {key: 'actions', label: 'Ações'},
                {key: 'nomeDescricao', label: 'Desc.', sortable: true},
                {key: 'reducaoPreco', label: '( - ) R$', sortable: true}
            ],
            submitted: false,
            options: [
                {name: 'Adicionar', value: 'adicionar'},
                {name: 'Corrigir', value: 'corrigir'},
                {name: 'Falta', value: 'falta'},
            ]
        }
    },
    validations: {
        livroDescrito: {
            subIdLivro: {required},
            qtdLivro: {required}
        }
    },
    methods:{
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
            
        },
        onChangeDesc(id){
            if(this.livroDescrito.descricoes.includes(id)){
                let index = this.livroDescrito.descricoes.indexOf(id);
                this.livroDescrito.descricoes.splice(index, 1);
            }else{
                this.livroDescrito.descricoes.push(id);
            }
        },
        submitLivroDesc(){
            this.submitted = true;
                // stop here if form is invalid
            this.$v.$touch();
                
            if (this.$v.$invalid) {
                return;
            }
            this.submitted = false;
            this.livroDescrito.idLivro = this.livroSelecionado;
            this.$emit('submit-livro-desc', this.livroDescrito);
        }
    }
}
</script>
<style>
    form{
        font-size: .875rem;
    }

    h5.title-descricoes{
        font-size: 1rem;
    }

</style>