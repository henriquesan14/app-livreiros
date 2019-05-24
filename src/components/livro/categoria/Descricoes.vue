<template>
    <div class="descricoes">
        <b-modal size="lg" id="modal-descricoes" hide-footer>
            <template slot="modal-title">
                Gerenciar Descrições
            </template>
            <Loading :loader="loader" />
            <div v-if="!loader" class="d-block">
                <b-form @submit.prevent="handleSubmit()">
                    <b-row>
                        <b-col>
                            <b-form-group label="Nome">
                                <b-form-input v-model="descricao.nomeDescricao" maxLength="100" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="( - ) R$">
                                <b-form-input v-model="descricao.reducaoPreco" v-money="money"  maxLength="6" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button type="submit" class="mb-3 mr-2" variant="success">{{descricao.idDescricao ? 'Alterar':'Adicionar'}}</b-button>
                    <b-button variant="danger" class="mb-3 mr-2" @click="zeraDescricao()">Limpar</b-button>
                    <b-button class="mb-3"  @click="$bvModal.hide('modal-descricoes')">Fechar</b-button>
                </b-form>
                <b-table :responsive="true" :fields="fields" :items="descricoes"  hover striped>
                    <template slot="actions" slot-scope="data">
                        <b-button @click="loadDescricao(data.item)"
                         variant="warning" class="mr-2"
                        v-b-tooltip.hover title="Alterar">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button
                        v-b-tooltip.hover :title="data.item.statusDescricao == true ? 'Desativar': 'Ativar'"
                        :variant="data.item.statusDescricao == true ? 'danger': 'success'"
                         @click="showMsgBoxTwo(data.item)" class="mr-2">
                            <i class="fas" :class="data.item.statusDescricao == true ? 'fa-lock':'fa-lock-open'"></i></b-button>
                    
                    </template>
                </b-table>
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
export default {
    name: 'Descricoes',
    components: {Loading},
    computed: mapGetters(['descricoes']),
    directives: {money: VMoney},
    data(){
        return {
            descricao: {},
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
        }
    },
    mounted(){
        this.zeraDescricao();
    },
    props: {
        loader: {
            type: Boolean,
            required: true
        },
        idCategoriaDescricao: {
            type: Number
        }
    },
    methods: {
        loadDescricao(descricao){
            this.descricao = {...descricao};
        },
        showMsgBoxTwo(descricao) {
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm(`Tem certeza que deseja ativar/desativar a descrição de Cód. ${descricao.idDescricao}?` , {
            title: 'Confirmação',
            size: 'md',
            buttonSize: 'md',
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
      submitDescricao(){
              this.$emit('save-descricao', this.descricao);
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
          const url = `${baseApiUrl}/descricoes/${this.idCategoriaDescricao}`;
          try{
            await axios.put(url, this.descricao);
            this.$toasted.global.defaultSuccess();
            this.getDescricoes();
            this.zeraDescricao();
          }catch(err){
              console.log(err)
              showError(err);
          }   
      },
      async getDescricoes(){
          this.loader = true;
            try{
                await this.$store.dispatch('GET_DESCRICOES', this.idCategoriaDescricao);
            }catch(err){
                showError(err)
            }finally{
                this.loader = false;
            }
      },
      handleSubmit(){
          if(this.descricao.idDescricao){
              this.editDescricao();
          }else{
              this.saveDescricao();
          }
      }
    }
}
</script>

<style>

</style>
