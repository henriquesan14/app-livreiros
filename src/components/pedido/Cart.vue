<template>
  <div class="cart-pedidos">
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
              <div>
                <span
                  class="text-danger mt-2 font-menor"
                  v-if="submitted && $v.pedido.idCliente.$invalid"
                >Selecione um cliente</span>
              </div>
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
          <b-col md="3">
            <b-form-group label="Desconto (R$)">
              <b-form-input
                @keyup="changeAjusteValor()"
                v-money="money"
                maxlength="10"
                v-model="ajusteValor"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Desconto (%)">
              <b-form-input @keyup="changeAjustePorcento()" v-model.number="ajustePorcento" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-badge class="mb-2"  variant="danger">
          <span id="total">Total: {{totalAjustado | currency}}</span>
        </b-badge>

        <b-row>
          <b-col>
            <b-form-group label="Obs.">
              <b-form-textarea v-model="pedido.obsPedido"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="table-responsive">
          <b-badge class="mb-1">
            <span class="title-badge">Livros Descritos</span>
          </b-badge>
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Cód.</th>
                <th>Nome</th>
                <th>Qtd.</th>
                <th>Valor Unitário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.livrosDescritos" :key="item.id">
                <td>
                  <img
                    class="img-cart"
                    :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (item.livro.imagemLivro == null ? '1570218265559': item.livro.imagemLivro)"
                  />
                </td>
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
                                v-model.number="qtdSelecionada"
                                mask="####"
                              ></the-mask>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-dropdown-item-button id="btn-form">
                          <b-button
                            size="sm"
                            @click="ajusteQuantidade(item)"
                            variant="success"
                            block
                          >Ok</b-button>
                        </b-dropdown-item-button>
                      </b-form>
                    </b-dropdown-form>
                  </b-dropdown>
                  <b-button @click="diminuiQuantidade(item)" variant="primary" size="sm">
                    <i class="fas fa-minus-circle"></i>
                  </b-button>
                </td>
                <td>{{item.livro.precoLivroDescrito | currency}}</td>
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
                              <the-mask
                                mask="####"
                                v-model.number="ajusteSelecionado"
                                class="form-control form-control-sm mb-1"
                                size="sm"
                              ></the-mask>
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

          <b-button size="sm" variant="success" @click="submitPedido()">Finalizar</b-button>
          <b-button
            @click="back()"
            class="btn btn-secondary ml-2 mr-4"
            size="sm"
            variant="dark"
          >Voltar</b-button>
        </div>
      </div>
      <div v-if="!existemItens()">
        <b-badge variant="info">
          <span>Sem itens a venda.</span>
        </b-badge>
      </div>
    </div>
  </div>
</template>

<script>
import {
  removeLivro,
  increaseQuantity,
  decreaseQuantity,
  total,
  setQuantity,
  setPrice,
  setCart
} from "../../utils/storage";
import { mapGetters } from "vuex";
import Autocomplete from "../shared/Autocomplete";
import Clientes from "../../services/clientes";
import { showError } from "@/global";
import Pedido from "../../services/pedidos";
import { required } from "vuelidate/lib/validators";
import { VMoney } from "v-money";
export default {
  name: "Cart",
  components: { Autocomplete },
  directives: { money: VMoney },
  data() {
    return {
      ajustePorcento: 0,
      ajusteValor: 0,
      qtdSelecionada: null,
      ajusteSelecionado: null,
      clientes: [],
      submitted: false,
      money: {
        decimal: ".",
        thousands: "",
        precision: 2,
        masked: false
      },
      totalAjustado: total()
    };
  },
  validations() {
    return {
      pedido: {
        idCliente: { required },
        livrosDescritos: { required }
      }
    };
  },
  computed: mapGetters(["cart", "pedido"]),
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
    ajustePreco(item) {
      let ajuste =
        (item.livro.precoLivroDescrito * this.ajusteSelecionado) / 100;
      setPrice(
        item,
        parseInt(item.livro.precoLivroDescrito) - parseInt(ajuste, 10)
      );
      this.$store.dispatch("SET_CART");
    },
    ajusteQuantidade(item) {
      setQuantity(item, this.qtdSelecionada);
      this.$store.dispatch("SET_CART");
    },
    async getClientes(nomeCliente) {
      try {
        const res = await Clientes.getClientes(nomeCliente);
        this.clientes = res.data.rows;
      } catch (err) {
        showError(err);
      }
    },
    clienteSelected(cliente) {
      this.pedido.livrosDescritos = this.cart.livrosDescritos;
      this.pedido.idCliente = cliente.idCliente;
      this.pedido.nomeCliente = cliente.nomeCliente;
      let pedido = { ...this.pedido };
      this.$store.dispatch("SET_PEDIDO", pedido);
    },
    onChangeCliente(nomeCliente) {
      this.getClientes(nomeCliente);
    },
    submitPedido() {
      this.pedido.livrosDescritos = this.cart.livrosDescritos;
      let pedido = { ...this.pedido };
      this.$store.dispatch("SET_PEDIDO", pedido);
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.finalizaVenda();
    },
    async finalizaVenda() {
      try {
        await Pedido.savePedido(this.pedido);
        this.$emit("atualiza-livros");
        this.$bvModal.hide("modal-cart");
        let pedido = {
          tipoPedido: "balcao",
          nomeCliente: "Selecione um cliente...",
          livrosDescritos: []
        };
        this.$store.dispatch("SET_PEDIDO", pedido);
        this.$toasted.global.defaultSuccess();
        this.$store.dispatch("ZERA_CART");
        setCart({ livrosDescritos: [] });
      } catch (err) {
        showError(err);
      }
    },
    back() {
      history.back();
    },
    changeAjustePorcento() {
      let a = this.ajustePorcento * parseFloat(total());
      this.ajusteValor = a / 100;
      this.totalAjustado = parseFloat(total()) - this.ajusteValor;
    },
    changeAjusteValor() {
      let a = this.ajusteValor * 100;
      this.ajustePorcento = (a / total());
      this.totalAjustado = parseFloat(total()) - this.ajusteValor;
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
  font-size: 1.1rem;
}

td {
  vertical-align: middle !important;
}

.img-cart {
  width: 100px;
  height: 120px;
}
</style>
