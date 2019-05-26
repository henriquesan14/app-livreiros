<template>
    <div>
        <Loading :loader="loader"/>
        <div v-if="!loader" class="table-responsive">
            <table class="table table-hover table-striped">
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
                <b-col md="6">
                    <b-form-group label="Código.">
                        <b-form-input :readonly="true" :value="livro.idLivro" />
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="SubCódigo.">
                        <b-form-input v-model="livroDescrito.subIdLivro" maxLength="2" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group label="Valor">
                        <b-form-input :readonly="true" :value="livro.precoLivro" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Qtd.">
                        <the-mask mask="####" class="form-control" v-model="livroDescrito.qtdLivro" />
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

            <div v-for="categoria in categoriasAtivas" :key="categoria.idCategoriaDescricao">
                <h5><strong>{{categoria.nomeCategoriaDescricao}}</strong></h5>
                <b-table :items="categoria.descricoes" :fields="fields"  striped hover>
                    <template slot="actions" slot-scope="data">
                        <b-form-checkbox-group name="descricoes">
                            <b-form-checkbox @change="onChangeDesc(data.item.idDescricao)"  ></b-form-checkbox>
                        </b-form-checkbox-group>
                    </template>
                </b-table>
            </div>
            <b-button type="submit" class="mr-2" variant="success">Salvar</b-button>
            <b-button @click="$bvModal.hide('new-livro-descrito')">Fechar</b-button>
        </b-form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import axios from 'axios';
import { baseApiUrl, showError} from '@/global';
import Loading from '../shared/Loading'
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
            ]
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
            this.livroDescrito.idLivro = this.livroSelecionado;
            this.$emit('save-livro-desc', this.livroDescrito);
        }
    }
}
</script>
<style>
</style>