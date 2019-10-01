<template>
  <div class="cart-pedidos">
    <b-modal size="lg" id="modal-cart" hide-footer>
      <template slot="modal-title">Finalizar venda</template>
      <div class="d-block">
        <div v-if="existemItens()">
          <b-row>
            <b-col>
              <b-form-group label="Cliente">
                <Autocomplete
                  :valorInicial="pedido.nomeCliente"
                  :idAutocomplete="1"
                  :shouldReset="false"
                  title="Selecione um cliente..."
                  :items="clientes"
                  filterby="nomeCliente"
                  @selected="clienteSelected"
                  @change="onChangeCliente"
                />
               </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Tipo">
                <b-form-select size="sm" v-model="pedido.tipoPedido">
                  <option value="balcao">Balcão</option>
                  <option value="on-line">Online</option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Obs.">
                <b-form-textarea v-model="pedido.obsPedido"></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="table-responsive">
            <b-badge class="mb-1"><span class="title-badge">Livros Descritos</span></b-badge>
            <table class="table table-sm table-hover table-striped">
              <thead>
                <tr>
                  <th>Cód.</th>
                  <th>Livro</th>
                  <th>Qtd.</th>
                  <th>Valor Unitário</th>
                  <th>Valor Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.livrosDescritos" :key="item.id">
                  <td>{{item.idLivroDescrito}}</td>
                  <td>{{item.livro.tituloLivro}}</td>
                  <td>
                    <b-button @click="aumentaQuantidade(item)" variant="primary" size="sm">
                      <i class="fas fa-plus-circle"></i>
                    </b-button>
                    <b-dropdown
                      dropright
                      variant="outline-primary"
                      size="sm"
                      id="dropdown-1"
                      :text="item.qtdLivroDescrito.toString()"
                      class="m-md-2"
                    >
                      <b-dropdown-form>
                        <b-form @submit.prevent>
                          <b-row>
                            <b-col>
                              <b-form-group label="Qtd.">
                                <the-mask
                                class="form-control form-control-sm mb-1"
                                 v-model.number="qtdSelecionada" mask="####"></the-mask>
                              </b-form-group>
                            </b-col>
                          </b-row>

                          <b-dropdown-item-button id="btn-form">
                            <b-button size="sm" @click="ajusteQuantidade(item)" variant="success" block>Ok</b-button>
                          </b-dropdown-item-button>
                        </b-form>
                      </b-dropdown-form>
                    </b-dropdown>
                    <b-button @click="diminuiQuantidade(item)" variant="primary" size="sm">
                      <i class="fas fa-minus-circle"></i>
                    </b-button>
                  </td>
                  <td>{{item.livro.precoLivroDescrito | currency}}</td>
                  <td>{{item.livro.precoLivroDescrito * item.qtdLivroDescrito | currency}}</td>
                  <td>
                    <b-dropdown
                      dropright
                      variant="outline-success"
                      size="sm"
                      id="dropdown-1"
                      class="m-md-2"
                    >
                      <template slot="button-content">
                        <i class="fas fa-cogs"></i>
                      </template>
                      <b-dropdown-form>
                        <b-form @submit.prevent>
                          <b-row>
                            <b-col>
                              <b-form-group label="Desconto (%)">
                                <the-mask mask="####" v-model.number="ajusteSelecionado" class="form-control form-control-sm mb-1" size="sm"></the-mask>
                              </b-form-group>
                            </b-col>
                          </b-row>
                          <b-dropdown-item-button id="btn-form">
                            <b-button size="sm" @click="ajustePreco(item)" variant="success" block>Ok</b-button>
                          </b-dropdown-item-button>
                        </b-form>
                      </b-dropdown-form>
                    </b-dropdown>
                    <b-button @click="removeProduto(item)" size="sm" variant="danger">
                      <i class="fas fa-trash"></i>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <b-button size="sm" variant="success" @click="finalizaVenda()">Finalizar</b-button>
            <b-button @click="$bvModal.hide('modal-cart')" class="ml-2 mr-4" size="sm" variant="secondary">Fechar</b-button>
            <b-badge variant="danger">
              <span id="total">Total: {{total() | currency}}</span>
            </b-badge>
          </div>
        </div>
        <div v-if="!existemItens()">
          <b-badge variant="info">
            <span>Sem itens a venda.</span>
          </b-badge>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  getCart,
  removeLivro,
  increaseQuantity,
  decreaseQuantity,
  total,
  setQuantity,
  setPrice,
  setCart
} from '../../utils/storage';
import { mapGetters } from "vuex";
import Autocomplete from '../shared/Autocomplete';
import Clientes from '../../services/clientes';
import { showError } from "@/global";
import Pedido from '../../services/pedidos';
export default {
  name: "Cart",
  components: { Autocomplete },
  data() {
    return {
      pedido: {tipoPedido: 'balcao', nomeCliente: '', livrosDescritos: []},
      qtdSelecionada: null,
      ajusteSelecionado: null,
      clientes: []
    };
  },
  computed: mapGetters(["cart"]),
  methods: {
    diminuiQuantidade(item) {
      decreaseQuantity(item);
      this.$store.dispatch("SET_CART");
    },
    aumentaQuantidade(item) {
      increaseQuantity(item);
      this.$store.dispatch("SET_CART");
    },
    removeProduto(item) {
      removeLivro(item);
      this.$store.dispatch("SET_CART");
    },
    total() {
      return total();
    },
    existemItens() {
      return this.cart.livrosDescritos && this.cart.livrosDescritos.length > 0;
    },
    ajustePreco(item){
      let ajuste =  (item.livro.precoLivroDescrito * this.ajusteSelecionado) / 100;
      setPrice(item, parseInt(item.livro.precoLivroDescrito) - parseInt(ajuste, 10));
      this.$store.dispatch("SET_CART");
    },
    ajusteQuantidade(item){
      setQuantity(item, this.qtdSelecionada);
      this.$store.dispatch("SET_CART");
    },
    async getClientes(nomeCliente){
      try{
        const res = await Clientes.getClientes(nomeCliente);
        this.clientes = res.data.rows;
      }catch(err){
        showError(err);
      }
    },
    clienteSelected(cliente){
      this.pedido.idCliente = cliente.idCliente;
      this.pedido.nomeCliente = cliente.nomeCliente;
    },
    onChangeCliente(nomeCliente) {
      this.getClientes(nomeCliente);
    },
    async finalizaVenda(){
      this.pedido.livrosDescritos = this.cart.livrosDescritos;
      try{
        await Pedido.savePedido(this.pedido);
        this.$bvModal.hide('modal-cart');
        this.pedido = {tipoPedido: 'balcao', nomeCliente: '', livrosDescritos: []};
        this.$toasted.global.defaultSuccess();
        this.$store.dispatch('ZERA_CART');
        setCart({livrosDescritos: []});
      }catch(err){
        console.log(err.response);
        showError(err);
      }
    }
  }
};
</script>

<style>
#btn-form:active {
  background-color: transparent;
}
span {
  font-size: 0.875rem;
}
span#total {
  font-size: 1rem;
}
</style>
