<template>
    <div class="descricoes">
        <b-modal size="lg" id="modal-descricoes" hide-footer>
            <template slot="modal-title">
                Gerenciar Descrições
            </template>
            <Loading :loader="loader || loaderDesc" />
            <div v-if="!loader && !loaderDesc" class="d-block">
                <b-form @submit.prevent="handleSubmitSave()">
                    <b-row>
                        <b-col>
                            <b-form-group label="Nome">
                                <b-form-input size="sm"
                                :class="{'is-invalid': submitted && $v.descricao.nomeDescricao.$invalid, 'is-valid': submitted && !$v.descricao.nomeDescricao.$invalid}"
                                 v-model="descricao.nomeDescricao" maxLength="100" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="( - ) R$">
                                <b-form-input size="sm"
                                :class="{'is-invalid': submitted && $v.descricao.reducaoPreco.$invalid, 'is-valid': submitted && !$v.descricao.reducaoPreco.$invalid}"
                                 v-model="descricao.reducaoPreco" v-money="money"  maxLength="6" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button size="sm" type="submit" class="mb-3 mr-2" variant="success"><i class="fa fa-save mr-1"></i>Adicionar</b-button>
                    <b-button size="sm" variant="danger" class="mb-3 mr-2" @click="zeraDescricao()"><i class="fa fa-times-circle mr-1"></i>Limpar</b-button>
                    <b-button size="sm" class="mb-3"  @click="$bvModal.hide('modal-descricoes')"><i class="fa fa-arrow-left mr-1"></i>Fechar</b-button>
                </b-form>
                <b-table class="table-sm" :responsive="true" :fields="fields" :items="descricoes"  hover striped>
                    <template slot="actions" slot-scope="data">
                        <b-button size="sm" @click="loadDescricao(data.item); $bvModal.show('modal-edit-descricoes')"
                         variant="warning" class="mr-2"
                        v-b-tooltip.hover title="Alterar">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button size="sm"
                        v-b-tooltip.hover :title="data.item.statusDescricao == true ? 'Desativar': 'Ativar'"
                        :variant="data.item.statusDescricao == true ? 'danger': 'success'"
                         @click="showMsgBoxTwo(data.item)" class="mr-2">
                            <i class="fas" :class="data.item.statusDescricao == true ? 'fa-lock':'fa-lock-open'"></i></b-button>
                    
                    </template>
                </b-table>
            </div>
            
        </b-modal>

        <b-modal size="dm" id="modal-edit-descricoes" hide-footer>
            <template slot="modal-title">
                Alterar descrição Cód.
            </template>
            <div class="d-block">
                <b-form @submit.prevent="handleSubmitEdit()">
                    <b-row>
                        <b-col>
                            <b-form-group label="Nome">
                                <b-form-input size="sm"
                                :class="{'is-invalid': submitted && $v.descricaoEdit.nomeDescricao.$invalid, 'is-valid': submitted && !$v.descricaoEdit.nomeDescricao.$invalid}"
                                 v-model="descricaoEdit.nomeDescricao" maxLength="100" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="( - ) R$">
                                <b-form-input size="sm"
                                :class="{'is-invalid': submitted && $v.descricaoEdit.reducaoPreco.$invalid, 'is-valid': submitted && !$v.descricaoEdit.reducaoPreco.$invalid}"
                                 v-model="descricaoEdit.reducaoPreco" v-money="money"  maxLength="6" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button size="sm" type="submit" class="mb-3 mr-2" variant="success"><i class="fa fa-save mr-1"></i>Alterar</b-button>
                    <b-button size="sm" class="mb-3"  @click="$bvModal.hide('modal-edit-descricoes')"><i class="fa fa-arrow-left mr-1"></i>Fechar</b-button>
                </b-form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import {VMoney} from 'v-money'
import Loading from '../../shared/Loading'
import {mapGetters} from 'vuex';
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'
import { required } from "vuelidate/lib/validators";
export default {
    name: 'Descricoes',
    components: {Loading},
    computed: mapGetters(['descricoes']),
    directives: {money: VMoney},
    data(){
        return {
            descricao: {},
            descricaoEdit: {},
            fields: [
                {key: 'idDescricao', label: 'Cód.', sortable: true},
                {key: 'nomeDescricao', label: 'Nome', sortable: true},
                {key: 'reducaoPreco', label: '( - ) R$', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            money: {
                decimal: '.',
                thousands: '',
                precision: 2,
                masked: false
            },
            loaderDesc: false,
            submitted: false
        }
    },
    validations: {
        descricao: {
            nomeDescricao: {required},
            reducaoPreco: {required}
        },
        descricaoEdit: {
            nomeDescricao: {required},
            reducaoPreco: {required}
        }
    },
    props: {
        loader: {
            type: Boolean
        },
        idCategoriaDescricao: {
            type: Number
        }
    },
    methods: {
        loadDescricao(descricao){
            this.descricaoEdit = {...descricao};
        },
        showMsgBoxTwo(descricao) {
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm(`Tem certeza que deseja ativar/desativar a descrição de Cód. ${descricao.idDescricao}?` , {
            title: 'Confirmação',
            size: 'md',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'SIM',
            cancelTitle: 'NÃO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
            })
            .then((res) => {
                if(res){
                    this.statusDescricao(descricao.idDescricao);
                }
            })
            .catch(() => {
                
            })
      },
      async statusDescricao(id){
          const url = `${baseApiUrl}/descricoes/${id}/status`
          try{
              await axios.put(url);
              this.$toasted.global.defaultSuccess();
                 this.getDescricoes();
          }catch(err){
              showError(err)
          } 
      },
      zeraDescricao(){
          this.descricao = {};
      },
      async saveDescricao(){
          this.descricao.idCategoriaDescricao = this.idCategoriaDescricao;
          const url = `${baseApiUrl}/descricoes`;
          try{
            await axios.post(url, this.descricao);
            this.$toasted.global.defaultSuccess();
            this.getDescricoes();
            this.zeraDescricao();
          }catch(err){
              showError(err);
          }   
      },
      async editDescricao(){
          const url = `${baseApiUrl}/descricoes/${this.descricaoEdit.idDescricao}`;
          try{
            await axios.put(url, this.descricaoEdit);
            this.$toasted.global.defaultSuccess();
            this.getDescricoes();
            this.$bvModal.hide('modal-edit-descricoes');
          }catch(err){
              showError(err);
          }   
      },
      async getDescricoes(){
          this.loaderDesc = true;
            try{
                await this.$store.dispatch('GET_DESCRICOES', this.idCategoriaDescricao);
            }catch(err){
                showError(err)
            }finally{
                this.loaderDesc = false;
            }
      },
      handleSubmitSave(){
          this.submitted = true;
          this.$v.descricao.$touch();     
          if (this.$v.descricao.$invalid) {
                return;
          }
          this.submitted = false;
          this.saveDescricao();
      },
      handleSubmitEdit(){
          this.submitted = true;
          this.$v.descricaoEdit.$touch();     
          if (this.$v.descricaoEdit.$invalid) {
                return;
          }
          this.submitted = false;
          this.editDescricao();
      }

    }
}
</script>

<style>
</style>
