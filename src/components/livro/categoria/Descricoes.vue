<template>
    <div class="descricoes">
        <b-modal size="lg" id="modal-descricoes" hide-footer>
            <template slot="modal-title">
                Gerenciar Descrições
            </template>
            <Loading :loader="loader" />
            <div class="d-block">
                <b-form @submit.prevent="submitDescricao()">
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
                        <b-button variant="danger" @click="showMsgBoxTwo(data.item)"  v-b-tooltip.hover title="Desativar" class="mr-2"><i class="fa fa-lock"></i></b-button>
                    
                    </template>
                </b-table>
            </div>
            
        </b-modal>
    </div>
</template>

<script>
import {VMoney} from 'v-money'
import Loading from '../../shared/Loading'
import axios from 'axios';
import {showError, baseApiUrl} from '@/global'
import {mapGetters} from 'vuex';
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
    props: {
        loader: {
            type: Boolean,
            required: true
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
      statusDescricao(id){
          alert(id)
      },
      zeraDescricao(){
          this.descricao = {};
      }
    }
}
</script>

<style>

</style>
