<template>
    <div class="grupo-admin">
        <b-button class="mb-3" @click="grupo = {} ; $bvModal.show('edit-grupo')" variant="dark">Novo grupo</b-button>
        <b-table v-if="!loader && grupos.rows.length > 0" hover striped :items="grupos.rows" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadGrupo(data.item); $bvModal.show('edit-grupo')" class="mr-2"
                v-b-tooltip.hover title="Alterar">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="dark"  @click="loadGrupo(data.item)" class="mr-2"
                v-b-tooltip.hover title="Associar permissões">
                    <i class="fa fa-cogs"></i>
                </b-button>
            </template>
        </b-table>
        <Loading :loader="loader" />

        <b-modal size="lg" id="edit-grupo" hide-footer>
        <template slot="modal-title">
            {{grupo.idGrupo == null ? 'Novo grupo' : 'Edição grupo'}}
        </template>
        <div class="d-block">
           <b-form>
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
                        <b-form-select @change="getPermissoes(selected)" v-model="selected" :options="options">
                        </b-form-select>
                    </b-form-group>
                </b-col>
               </b-row>
               <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Permissões">
                        <b-form-checkbox-group v-model="grupo.permissoes" name="permissoes">
                            <b-form-checkbox v-for="permissao in permissoes" :key="permissao.idPermissao" :value="permissao.idPermissao">{{permissao.nomePermissao}}</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-col>
               </b-row>
               <b-button class="mr-2" type="submit" variant="success">Salvar</b-button>
               <b-button type="button"   @click="$bvModal.hide('edit-grupo')">Fechar</b-button>
           </b-form>
        </div>
    </b-modal>
    </div>    
</template>

<script>
import { mapGetters}  from 'vuex'
import Loading from '../shared/Loading'
import { required } from "vuelidate/lib/validators";

export default {
    name: 'GrupoAdmin',
    components: {Loading},
    data(){
        return {
            grupo: {},
            loader: false,
            submitted: false,
            fields: [
                {key: 'idGrupo', label: 'Cód.', sortable: true},
                {key: 'nomeGrupo', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            selected: 'usuario',
            options: [
                {value: 'usuario', text: 'USUÁRIOS'},
                {value: 'livro', text: 'LIVROS'},
                {value: 'assunto', text: 'ASSUNTOS'}
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
        this.getPermissoes(this.selected);
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
            
        }
    }
}
</script>

<style>

</style>
