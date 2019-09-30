<template>
  <div class="cart-pedidos">
    <b-modal size="lg" id="modal-cart" hide-footer>
      <template slot="modal-title">Finalizar venda</template>
      <div class="d-block">
        <div v-if="existemItens()">
          <b-row>
            <b-col>
              <b-form-group label="Pesquise o cliente">
                <b-form-input size="sm"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="table-responsive">
            <table class="table table-sm table-hover table-striped">
              <thead>
                <tr>
                  <th>Cód Livro Descrito</th>
                  <th>Cód. Livro</th>
                  <th>Qtd.</th>
                  <th>Valor Unitário</th>
                  <th>Valor Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.livrosDescritos" :key="item.id">
                  <td>{{item.idLivroDescrito}}</td>
                  <td>{{item.livro.idLivro}}</td>
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
                        <b-row>
                          <b-col>
                            <b-form-group label="Qtd.">
                              <b-form-input v-model="qtdSelecionada" class="mb-1" size="sm"></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-dropdown-item-button id="btn-form">
                          <b-button size="sm" @click="ajusteQuantidade(item)" variant="success" block>Ok</b-button>
                        </b-dropdown-item-button>
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
                        <b-row>
                          <b-col>
                            <b-form-group label="Ajuste (%)">
                              <b-form-input v-model="ajusteSelecionado" class="mb-1" size="sm"></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-dropdown-item-button id="btn-form">
                          <b-button size="sm" @click="ajustePreco(item)" variant="success" block>Ok</b-button>
                        </b-dropdown-item-button>
                      </b-dropdown-form>
                    </b-dropdown>
                    <b-button @click="removeProduto(item)" size="sm" variant="danger">
                      <i class="fas fa-trash"></i>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <b-badge variant="danger">
              <span id="total">Total: {{total() | currency}}</span>
            </b-badge>
            <b-button class="ml-3" size="sm" variant="success">Finalizar</b-button>
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
  setPrice
} from '../../utils/storage';
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      qtdSelecionada: null,
      ajusteSelecionado: null
    };
  },
  mounted(){
    console.log(this.cart);
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
      setPrice(item, parseInt(item.livro.precoLivroDescrito) + parseInt(ajuste, 10));
      this.$store.dispatch("SET_CART");
    },
    ajusteQuantidade(item){
      setQuantity(item, this.qtdSelecionada);
      this.$store.dispatch("SET_CART");
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
