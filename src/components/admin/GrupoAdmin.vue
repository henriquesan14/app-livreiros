<template>
    <div class="grupo-admin">
        <b-button class="mb-3" @click="zeraGrupo(); $bvModal.show('modal-grupo')" variant="dark">Novo grupo</b-button>
        <b-table v-if="!loader && grupos.rows.length > 0" hover striped :items="grupos.rows" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadGrupo(data.item); $bvModal.show('modal-grupo')" class="mr-2"
                v-b-tooltip.hover title="Alterar">
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
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.grupo.nomeGrupo.$invalid, 'is-valid': submitted && !$v.grupo.nomeGrupo.$invalid}"  
                         id="nomeGrupo" v-model="grupo.nomeGrupo" placeholder="Informe o nome do grupo" />
                    </b-form-group>
                   </b-col>

                   <b-col md="6" sm="12">
                    <b-form-group label="Categoria de grupo: " label-for="categoriaGrupo">
                        <b-form-select @change="getPermissoes(categoriaSelecionada)" v-model="categoriaSelecionada" :options="options">
                        </b-form-select>
                    </b-form-group>
                </b-col>
               </b-row>
               <b-row>
                <b-col md="12" sm="12">
                        <div class="perm-group">
                            <h5>Adicione permissões:</h5>
                            <span class="mr-2"  v-for="permissao in permissoes" :key="permissao.idPermissao">{{permissao.nomePermissao}}
                                <button :disabled="verificaPermissao(permissao.idPermissao)" type="button" @click="addPermissao(permissao)"  class="primary ml-1" >
                                    <i class="fa"  :class="verificaPermissao(permissao.idPermissao) === true ? 'fa-ban':'fa-plus'"></i>
                                </button>
                            </span>      
                        </div>
                </b-col>
               </b-row>
               <b-row>
                <b-col md="12" sm="12">
                    <div class="perm-group">
                        <h5>Permissões do grupo:</h5>
                        <span class="mr-2" v-for="perm in grupo.permissoes" :key="perm.idPermissao">{{perm.nomePermissao}}<button :disabled="grupo.permissoes.length <= 1" type="button" @click="removePermissao()" class="ml-1 danger"><i class="fa fa-trash"></i></button></span>      
                        <span v-if="grupo.permissoes.length < 1">Nenhuma permissão...</span>
                    </div>
                </b-col>
               </b-row>
               <b-button class="mr-2" type="submit" variant="success">Salvar</b-button>
               <b-button type="button"   @click="$bvModal.hide('modal-grupo')">Fechar</b-button>
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
                {value: 'grupo', text: 'GRUPOS'}
            ]
        }
    },
    validations: {
        grupo: {
            nomeGrupo: {required}
        }
    },
    computed: mapGetters(['grupos', 'permissoes']),
    mounted(){
        this.getGrupos();
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
                // stop here if form is invalid
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
            }).catch(showError)
        },
        editGrupo(){
            this.convertPermissoes();
            const url = `${baseApiUrl}/grupos/${this.grupo.idGrupo}`;
            axios.put(url, this.grupo).then(() => {
                this.$bvModal.hide('modal-grupo');
                this.getGrupos();
                this.zeraGrupo();
                this.$toasted.global.defaultSuccess();
            }).catch(showError)
        }
    }
}
</script>
    
<style>
    .perm-group{
        padding: 8px;
        border: 1px solid #ccc;
        margin-bottom: 8px;
    }
    .perm-group span{
        font-size: 15px;
        margin: 2px;
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
