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
              <the-mask
                mask="FFFFFFF"
                :tokens="hexTokens"
                @keyup.native="changeAjusteValor()"
                maxlength="10"
                v-model.number="ajusteValor"
                class="form-control form-control-sm"
              ></the-mask>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Desconto (%)">
              <the-mask
                mask="FFFFFFF"
                :tokens="hexTokens"
                @keyup.native="changeAjustePorcento()"
                v-model.number="ajustePorcento"
                class="form-control form-control-sm"
              ></the-mask>
            </b-form-group>
          </b-col>
        </b-row>

        <b-badge class="mb-2" variant="danger">
          <span id="total">Total: {{total | currency}}</span>
        </b-badge>
        <br />
        <b-badge class="mb-2" variant="danger">
          <span id="total">Total com desconto: {{totalComAjuste | currency}}</span>
        </b-badge>

        <b-row>
          <b-col>
            <b-form-group label="Obs.">
              <b-form-textarea v-model="pedido.obsPedido"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>

        <div v-if="pedido.tipoPedido === 'on-line'">
          <b-badge>
            <span class="title-badge">Pedido Online</span>
          </b-badge>
          <b-row>
            <b-col>
              <b-form-group label="Valor Frete*">
                <b-form-input
                  v-model="pedido.valorFrete"
                  maxlength="6"
                  v-money="money"
                  placeholder="Valor do frete"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Valor Tarifa">
                <b-form-input
                  v-model="pedido.valorTarifa"
                  maxlength="6"
                  v-money="money"
                  placeholder="Valor da tarifa"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="ID Externo*">
                <b-form-input
                  v-model="pedidoOnline.idExterno"
                  maxlength="30"
                  placeholder="ID externo"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Canal de venda*">
                <b-form-select size="sm" v-model="pedidoOnline.canalVendas">
                  <option value="site">Site</option>
                  <option value="amazon">Amazon</option>
                  <option value="estante-virtual">Estante Virtual</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Data do Pagamento*">
                <b-form-input
                  v-model="pedidoOnline.dataHoraPagamento"
                  type="date"
                  placeholder="Data do pagamento"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Status Pagamento">
                <b-form-select size="sm" v-model="pedidoOnline.statusPagamento">
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Tipo do Pagamento*">
                <b-form-select size="sm" v-model="pedidoOnline.tipoPagamento">
                  <option value="cartao">Cartão</option>
                  <option value="deposito">Depósito</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Status do Envio*">
                <b-form-select size="sm" v-model="pedidoOnline.statusEnvio">
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Tipo Envio*">
                <b-form-select size="sm" v-model="pedidoOnline.tipoEnvio">
                  <option value="normal">Normal</option>
                  <option value="sedex">SEDEX</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="CEP*">
                <the-mask
                  v-model="pedidoOnline.cep"
                  class="form-control form-control-sm"
                  mask="######-###"
                  placeholder="CEP"
                  size="sm"
                ></the-mask>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="5">
              <b-form-group label="Destinatário*">
                <b-form-input
                  v-model="pedidoOnline.destinatario"
                  maxlength="50"
                  placeholder="Destinatário"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Logradouro*">
                <b-form-input
                  v-model="pedidoOnline.rua"
                  maxlength="100"
                  placeholder="Logradouro"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="1">
              <b-form-group label="Nº*">
                <b-form-input v-model="pedidoOnline.numero" placeholder="Nº" size="sm"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group label="Bairro*">
                <b-form-input v-model="pedidoOnline.bairro" size="sm" placeholder="Bairro"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Complemento*">
                <b-form-input
                  v-model="pedidoOnline.complemento"
                  size="sm"
                  placeholder="Complemento"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Estado: *" label-for="estado">
                <b-form-select
                  size="sm"
                  v-model="pedidoOnline.idUf"
                  @change="loadCidades(pedidoOnline.idUf)"
                >
                  <option :value="null" disabled>Selecione o estado</option>
                  <option
                    v-for="estado in estados"
                    :value="estado.idUf"
                    :key="estado.idUf"
                  >{{estado.nomeUf}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Cidade: *" label-for="cidade">
                <b-form-select size="sm" v-model="pedidoOnline.idCidade">
                  <option :value="null" disabled>Selecione a cidade</option>
                  <option
                    v-for="cidade in cidades"
                    :value="cidade.idCidade"
                    :key="cidade.idCidade"
                  >{{cidade.nomeCidade}}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </div>

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
                <th>Valor total</th>
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
                  <b-button
                    type="button"
                    @click="aumentaQuantidade(item)"
                    variant="primary"
                    size="sm"
                  >
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
                            type="button"
                            size="sm"
                            @click="ajusteQuantidade(item)"
                            variant="success"
                            block
                          >Ok</b-button>
                        </b-dropdown-item-button>
                      </b-form>
                    </b-dropdown-form>
                  </b-dropdown>
                  <b-button
                    type="button"
                    @click="diminuiQuantidade(item)"
                    variant="primary"
                    size="sm"
                  >
                    <i class="fas fa-minus-circle"></i>
                  </b-button>
                </td>
                <td>{{item.livro.precoLivroDescrito | currency}}</td>
                <td>{{item.livro.precoLivroDescrito * item.qtdLivroDescrito | currency}}</td>
                <td>
                  <b-button type="button" @click="removeProduto(item)" size="sm" variant="danger">
                    <i class="fas fa-trash"></i>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>

          <b-button type="button" size="sm" variant="success" @click="submitPedido()">
            <i class="fa fa-save mr-1"></i>Finalizar
          </b-button>
          <b-button @click="back()" class="btn btn-secondary ml-2 mr-2" size="sm" variant="dark">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </b-button>
          <b-button @click="zeraCart()" variant="danger" size="sm">
            <i class="fa fa-times-circle mr-1"></i>Limpar
          </b-button>
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
  setQuantity,
  setCart,
  getCart
} from "../../utils/storage";
import { mapGetters } from "vuex";
import Autocomplete from "../shared/Autocomplete";
import Clientes from "../../services/clientes";
import { showError } from "@/global";
import Pedido from "../../services/pedidos";
import { required } from "vuelidate/lib/validators";
import { VMoney } from "v-money";
import Estado from "../../services/estados";
export default {
  name: "Cart",
  components: { Autocomplete },
  directives: { money: VMoney },
  data() {
    return {
      cidades: [],
      estados: [],
      pedidoOnline: {
        canalVendas: "site",
        statusPagamento: "pendente",
        tipoPagamento: "cartao",
        statusEnvio: "pendente",
        tipoEnvio: "normal",
        idUf: null,
        idCidade: null
      },
      ajustePorcento: 0,
      ajusteValor: 0,
      qtdSelecionada: null,
      clientes: [],
      submitted: false,
      money: {
        decimal: ".",
        precision: 2,
        masked: false
      },
      totalComAjuste: 0,
      total: 0,
      hexTokens: {
        F: {
          pattern: /^[\d,.?!]+$/
        }
      }
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
  mounted() {
    this.loadEstados();
    this.total = this.calculaTotal();
  },
  watch: {
    total() {
      this.changeAjustePorcento();
      this.changeAjusteValor();
      this.totalAjustado();
    }
  },
  computed: mapGetters(["cart", "pedido"]),
  methods: {
    diminuiQuantidade(item) {
      decreaseQuantity(item);
      this.$store.dispatch("SET_CART");
      this.total = this.calculaTotal();
    },
    aumentaQuantidade(item) {
      increaseQuantity(item);
      this.$store.dispatch("SET_CART");
      this.total = this.calculaTotal();
    },
    removeProduto(item) {
      removeLivro(item);
      this.$store.dispatch("SET_CART");
      this.total = this.calculaTotal();
    },
    existemItens() {
      return this.cart.livrosDescritos && this.cart.livrosDescritos.length > 0;
    },
    ajusteQuantidade(item) {
      setQuantity(item, this.qtdSelecionada);
      this.$store.dispatch("SET_CART");
      this.total = this.calculaTotal();
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
      this.pedido.valorDesconto = this.ajusteValor;
      if (this.pedido.tipoPedido === "on-line") {
        this.pedido.pedidoOnline = this.pedidoOnline;
      }
      if (this.pedido.tipoPedido === "balcao") {
        delete this.pedido.valorFrete;
        delete this.pedido.valorTarifa;
      }
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
        this.zeraCart();
        this.$toasted.global.defaultSuccess();
        this.$router.push("/dashboard/pedidos");
      } catch (err) {
        showError(err);
      }
    },
    back() {
      history.back();
    },
    changeAjustePorcento() {
      let a = this.ajustePorcento * this.total;
      this.ajusteValor = a / 100;
      this.totalAjustado();
    },
    changeAjusteValor() {
      let a = this.ajusteValor * 100;
      this.ajustePorcento = a / this.total;
      this.totalAjustado();
    },
    calculaTotal() {
      let cart = getCart();
      let sum = 0;
      for (var i = 0; i < cart.livrosDescritos.length; i++) {
        sum +=
          cart.livrosDescritos[i].livro.precoLivroDescrito *
          cart.livrosDescritos[i].qtdLivroDescrito;
      }
      return sum;
    },
    totalAjustado() {
      this.totalComAjuste = this.total - this.ajusteValor;
    },
    async loadCidades(idUf) {
      this.pedidoOnline.idCidade = null;
      try {
        const res = await Estado.getCidades(idUf);
        this.cidades = res.data;
      } catch (err) {
        showError(err);
      }
    },
    async loadEstados() {
      try {
        const res = await Estado.getEstados();
        this.estados = res.data;
      } catch (err) {
        showError(err);
      }
    },
    zeraCart() {
      let pedido = {
        tipoPedido: "balcao",
        nomeCliente: "Selecione um cliente...",
        livrosDescritos: []
      };
      this.$store.dispatch("SET_PEDIDO", pedido);
      this.$store.dispatch("ZERA_CART");
      setCart({ livrosDescritos: [] });
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
