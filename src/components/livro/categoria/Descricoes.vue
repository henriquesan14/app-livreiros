<template>
    <div class="descricoes">
        <b-modal size="lg" id="modal-descricoes" hide-footer>
            <template slot="modal-title">
                Gerenciar Descrições
            </template>
            <div class="d-block">
                <b-form>
                    <b-row>
                        <b-col>
                            <b-form-group label="Nome">
                                <b-form-input />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="( - ) R$">
                                <b-form-input v-money="money"  maxLength="6" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button class="mb-3" variant="success">Adicionar</b-button>
                </b-form>
                <b-table :responsive="true" :fields="fields" :items="descricoes"  hover striped>
                    <template slot="actions" slot-scope="data">
                        <b-button variant="warning" class="mr-2"
                        v-b-tooltip.hover title="Alterar">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button variant="danger"  v-b-tooltip.hover title="Desativar" class="mr-2"><i class="fa fa-lock"></i></b-button>
                    
                    </template>
                </b-table>
            </div>
            <b-button  @click="$bvModal.hide('modal-descricoes')">Fechar</b-button>
        </b-modal>
    </div>
</template>

<script>
import {VMoney} from 'v-money'
export default {
    name: 'Descricoes',
    directives: {money: VMoney},
    data(){
        return {
            descricoes: [
                {idDescricao: 1, nomeDescricao: 'Descrição1'},
                {idDescricao: 2, nomeDescricao: 'Descrição2'},
                {idDescricao: 3, nomeDescricao: 'Descrição3'},
                {idDescricao: 4, nomeDescricao: 'Descrição4'},
            ],
            fields: [
                {key: 'idDescricao', label: 'Cód.', sortable: true},
                {key: 'nomeDescricao', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            money: {
                decimal: '.',
                thousands: '',
                precision: 2,
                masked: false
            },
        }
    }
}
</script>

<style>

</style>
