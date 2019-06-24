<template>
    <div class="grupo-admin">
        <b-button size="sm" v-hasRole="'ESCREVER_GRUPO'" class="mb-3" @click="zeraGrupo(); $bvModal.show('modal-grupo')" variant="dark"><i class="fa fa-plus-circle mr-1"></i>Novo grupo</b-button>
        <b-table class="table-sm" v-if="!loader && grupos.length > 0" hover striped :items="grupos" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button size="sm" v-hasRole="'ESCREVER_GRUPO'" variant="warning" @click="loadGrupo(data.item); $bvModal.show('modal-grupo')" class="mr-2"
                >
                    <i class="fa fa-cogs"></i>
                </b-button>
            </template>
        </b-table>
        <Loading :loader="loader" />

        <b-modal size="lg" id="modal-grupo" hide-footer>
        <template slot="modal-title">
            {{grupo.idGrupo == null ? 'Novo grupo' : 'Edição grupo'}}
        </template>
        <div class="d-block">
           <b-form @submit.prevent="submitGrupo()">
               <b-row>
                   <b-col md="6" sm="12">
                       <b-form-group label="Nome: " label-for="nomeGrupo">
                        <b-form-input maxlength="100" class="input-perm"
                        :class="{'is-invalid': submitted && $v.grupo.nomeGrupo.$invalid, 'is-valid': submitted && !$v.grupo.nomeGrupo.$invalid}"  
                         id="nomeGrupo" v-model="grupo.nomeGrupo" placeholder="Informe o nome do grupo" />
                    </b-form-group>
                   </b-col>

                   <b-col md="6" sm="12">
                    <b-form-group label="Categoria da permissão: " label-for="categoriaPermissao">
                        <b-form-select class="input-perm" id="categoriaPermissao" @change="getPermissoes(categoriaSelecionada)" v-model="categoriaSelecionada" :options="options">
                        </b-form-select>
                    </b-form-group>
                </b-col>
               </b-row>
               <b-row>
                <b-col md="12" sm="12">
                        <div class="perm-group">
                            <h5 class="text-primary">Adicione permissões:</h5>
                            <span class="mr-2 perms"  v-for="permissao in permissoes" :key="permissao.idPermissao">{{permissao.nomePermissao}}
                                <button :disabled="verificaPermissao(permissao.idPermissao)" type="button" @click="addPermissao(permissao)"  class="primary ml-1" >
                                    <i class="fa"  :class="verificaPermissao(permissao.idPermissao) === true ? 'fa-ban':'fa-plus'"></i>
                                </button>
                            </span>      
                        </div>
                </b-col>
               </b-row>
               
               <b-row >
                <b-col md="12" sm="12">  
                    <div class="perm-group">
                        <h5 class="text-primary">Permissões do grupo:</h5>
                        <h6 v-if="submitted && $v.grupo.permissoes.$invalid" class="alert-perm">Adicione pelo menos uma permissão</h6>
                        
                        <span class="mr-2 perms" v-for="perm in grupo.permissoes" :key="perm.idPermissao">{{perm.nomePermissao}}
                            <button type="button" @click="removePermissao()" class="ml-1 danger">
                                <i class="fa fa-trash"></i>
                            </button>
                        </span>      
                        <span v-if="grupo.permissoes.length < 1">Nenhuma permissão...</span>
                    </div>
                </b-col>
               </b-row>
               <b-button class="mr-2" size="sm" type="submit" variant="success"><i class="fa fa-save mr-1"></i>Salvar</b-button>
               <b-button type="button" size="sm"  @click="$bvModal.hide('modal-grupo')"><i class="fa fa-arrow-left mr-1"></i>Fechar</b-button>
           </b-form>
        </div>
    </b-modal>
    </div>    
</template>

<script>
import { mapGetters}  from 'vuex'
import Loading from '../shared/Loading'
import { required } from "vuelidate/lib/validators";
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';

export default {
    name: 'GrupoAdmin',
    components: {Loading},
    data(){
        return {
            grupo: {permissoes: []},
            loader: false,
            submitted: false,
            fields: [
                {key: 'idGrupo', label: 'Cód.', sortable: true},
                {key: 'nomeGrupo', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            categoriaSelecionada: 'usuario',
            options: [
                {value: 'usuario', text: 'USUÁRIOS'},
                {value: 'livro', text: 'LIVROS'},
                {value: 'assunto', text: 'ASSUNTOS'},
                {value: 'autor', text: 'AUTORES'},
                {value: 'editora', text: 'EDITORAS'},
                {value: 'grupo', text: 'GRUPOS'},
                {value: 'descricao', text: 'DESCRIÇÃO'}
            ]
        }
    },
    validations: {
        grupo: {
            nomeGrupo: {required},
            permissoes: {required}
        }
    },
    computed: mapGetters(['grupos', 'permissoes']),
    mounted(){
        this.getPermissoes(this.categoriaSelecionada);
    },
    methods:{
        async getGrupos(){
            this.loader = true;
        try{
            await this.$store.dispatch('GET_GRUPOS');
        }catch(err){
            () => {}
        }finally{
            this.loader = false;
        }     
        },
        loadGrupo(grupo){
            this.grupo = {...grupo};
        },
        async getPermissoes(categoria){
            try{
                await this.$store.dispatch('GET_PERMISSOES', categoria);
            }catch(e){
                () => {}
            }
            
        },
        zeraGrupo(){
            this.submitted = false;
            this.grupo = {permissoes: []};
        },
        addPermissao(permissao){
            this.grupo.permissoes.push(permissao);
        },
        removePermissao(index){
            this.grupo.permissoes.splice(index, 1)
        },
        convertPermissoes(){
            this.grupo.permissoes = this.grupo.permissoes.map(p => p.idPermissao);
        },
        verificaPermissao(idPermissao){
            return this.grupo.permissoes.find(p => p.idPermissao === idPermissao) ? true : false;
        },
        submitGrupo() {
                this.submitted = true;
                this.$v.$touch();
                
                if (this.$v.$invalid) {
                    return;
                }
                this.submitted = false;
                if(this.grupo.idGrupo){
                    this.editGrupo();
                }else{
                    this.saveGrupo();
                }
                
        },
        saveGrupo(){
            this.convertPermissoes();
            const url = `${baseApiUrl}/grupos`;
            axios.post(url, this.grupo).then(() => {
                this.$bvModal.hide('modal-grupo');
                this.getGrupos();
                this.zeraGrupo();
                this.$toasted.global.defaultSuccess();
            }).catch((err) => {
                showError(err);
                this.$bvModal.hide('modal-grupo');
            })
        },
        editGrupo(){
            this.convertPermissoes();
            const url = `${baseApiUrl}/grupos/${this.grupo.idGrupo}`;
            axios.put(url, this.grupo).then(() => {
                this.$bvModal.hide('modal-grupo');
                this.getGrupos();
                this.zeraGrupo();
                this.$toasted.global.defaultSuccess();
            }).catch((err) => {
                showError(err);
                this.$bvModal.hide('modal-grupo');
            })
        }
    }
}
</script>
    
<style>


    form{
        font-size: .875rem;
        
    }

    input.input-perm, select.input-perm{
        font-size: .875rem;
    }



    .perm-group{
        padding: 8px;
        border: 1px solid #ccc;
        margin-bottom: 8px;

        display:flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .perm-group h5{
        width:100%;
        text-align: center;
        font-size: 1rem;
        
    }

    .perm-group h6{
        width: 100%;
        color: red;
        text-align: center;
    }

    .perm-group span{
        
        padding:2px;
        font-size: .875rem;
        margin: 2px;
    }

    .perm-group span.perms{
        border:1px solid #ccc;
    }

    .perm-group span button{
        border-radius: 5px;
        border: none;
        padding: 2px 8px;
        margin-top: 3px;
    }
    .perm-group span button i{
        font-size: 12px;
        color: #fff;
    }

    .primary{
        background-color: #428bca;
    }

    .danger{
        background-color: #d9534f;
    }

</style>
