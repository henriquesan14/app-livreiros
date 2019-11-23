<template>
  <div class="cart-pedidos">
    <PageTitle
      icon="fas fa-cart-arrow-down"
      main="Administração de pedidos"
      sub="Alteração de pedido"
    />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Alteração de pedido</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <b-button @click="back()" class="btn-dark btn-sm mb-1">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </b-button>
        </div>
      </template>
      <Loading :loader="loader"/>
      <div class="d-block" v-if="!loader">
        <div>
          <b-row>
            <b-col>
              <b-form-group label="Cliente">
                <Autocomplete
                  :valorInicial="pedido.cliente.nomeCliente"
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
                <b-form-select disabled size="sm" v-model="pedido.tipoPedido">
                  <option value="balcao">Balcão</option>
                  <option value="on-line">Online</option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>


          <b-row>
            <b-col md="4">
              <b-form-group label="Status Pedido">
                  <b-form-select size="sm" v-model="pedido.statusPedido">
                    <option value="pendente">Pendente</option>
                    <option value="finalizado">Finalizado</option>
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
            <span id="total">Total sem desconto: {{pedido.valorProdutos | currency}}</span>
          </b-badge>
          <br />
          <b-badge class="mb-2" variant="danger">
            <span id="total">Total com desconto: {{pedido.valorTotal | currency}}</span>
          </b-badge>
          <br />
          <b-badge class="mb-2" variant="danger">
            <span id="total">Total com desconto atual: {{totalAjustado() | currency}}</span>
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
                    v-model="pedido.pedidoOnline.idExterno"
                    maxlength="30"
                    placeholder="ID externo"
                    size="sm"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Canal de venda*">
                  <b-form-select size="sm" v-model="pedido.pedidoOnline.canalVendas">
                    <option value="site">Site</option>
                    <option value="amazon">Amazon</option>
                    <option value="estante-virtual">Estante Virtual</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Data do Pagamento*">
                  <b-form-input
                    disabled
                    :value="formataData(pedido.pedidoOnline.dataHoraPagamento)"
                    placeholder="Data do pagamento"
                    size="sm"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Status Pagamento">
                  <b-form-select size="sm" v-model="pedido.pedidoOnline.statusPagamento">
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Tipo do Pagamento*">
                  <b-form-select size="sm" v-model="pedido.pedidoOnline.tipoPagamento">
                    <option value="cartao">Cartão</option>
                    <option value="deposito">Depósito</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Status do Envio*">
                  <b-form-select size="sm" v-model="pedido.pedidoOnline.statusEnvio">
                    <option value="pendente">Pendente</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                    <option value="atrasado">Atrasado</option>
                    <option value="devolvido">Devolvido</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Tipo Envio*">
                  <b-form-select size="sm" v-model="pedido.pedidoOnline.tipoEnvio">
                    <option value="normal">Normal</option>
                    <option value="sedex">SEDEX</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="CEP*">
                  <the-mask
                    v-model="pedido.pedidoOnline.cep"
                    :value="'ekapoekpa'"
                    class="form-control form-control-sm"
                    mask="#####-###"
                    placeholder="CEP"
                    size="sm"
                  ></the-mask>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="4">
                <b-form-group label="Cód. Rastreamento">
                  <b-form-input size="sm" v-model="pedido.pedidoOnline.idRastreamento">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Data/Hora Envio">
                  <b-form-input disabled size="sm" :value="formataData(pedido.pedidoOnline.dataHoraEnvio)">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Info. Envio">
                  <b-form-textarea v-model="pedido.pedidoOnline.infoEnvio"></b-form-textarea>
                </b-form-group>
              </b-col>

            </b-row>

            <b-row>
              <b-col md="5">
                <b-form-group label="Destinatário*">
                  <b-form-input
                    v-model="pedido.pedidoOnline.destinatario"
                    maxlength="50"
                    placeholder="Destinatário"
                    size="sm"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Logradouro*">
                  <b-form-input
                    v-model="pedido.pedidoOnline.rua"
                    maxlength="100"
                    placeholder="Logradouro"
                    size="sm"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="1">
                <b-form-group label="Nº*">
                  <b-form-input v-model="pedido.pedidoOnline.numero" placeholder="Nº" size="sm"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group label="Bairro*">
                  <b-form-input v-model="pedido.pedidoOnline.bairro" size="sm" placeholder="Bairro"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Complemento*">
                  <b-form-input
                    v-model="pedido.pedidoOnline.complemento"
                    size="sm"
                    placeholder="Complemento"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Estado: *" label-for="estado">
                  <b-form-select
                    size="sm"
                    v-model="pedido.pedidoOnline.idUf"
                    @change="loadCidades(pedido.pedidoOnline.idUf)"
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
                  <b-form-select size="sm" v-model="pedido.pedidoOnline.idCidade">
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
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in pedido.pedidoLivros" :key="item.id">
                  <td>
                    <img
                      class="img-cart"
                      :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (item.livroDescrito.livro.imagemLivro == null ? '1570218265559': item.livroDescrito.livro.imagemLivro)"
                    />
                  </td>
                  <td>{{item.idLivroDescrito}}</td>
                  <td>{{item.livroDescrito.livro.tituloLivro}}</td>
                  <td>
                    {{item.qtdLivroDescrito}}
                  </td>
                  <td>{{item.valorUnitLivroDescrito | currency}}</td>
                  <td>{{item.valorTotalLivroDescrito * item.qtdLivroDescrito | currency}}</td>
                  
                </tr>
              </tbody>
            </table>

            <b-button type="button" size="sm" variant="success" @click="submitPedido()">
              <i class="fa fa-save mr-1"></i>Atualizar
            </b-button>
            <b-button @click="back()" class="btn btn-secondary ml-2 mr-2" size="sm" variant="dark">
              <i class="fa fa-arrow-left mr-1"></i>Voltar
            </b-button>
          </div>
        </div>
      </div>
    </b-card>
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
import PageTitle from '../template/PageTitle';
import Loading from '../shared/Loading';
import moment from 'moment';
export default {
  name: "EdicaoPedido",
  components: { Autocomplete, PageTitle, Loading },
  directives: { money: VMoney },
  data() {
    return {
      pedido: {
        cliente: {},
        pedidoOnline: {}
      },
      loader: false,
      cidades: [],
      estados: [],
      ajustePorcento: 0,
      ajusteValor: null,
      clientes: [],
      submitted: false,
      money: {
        decimal: ".",

        precision: 2,
        masked: false
      },
      totalComAjuste: 0,
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
      }
    };
  },
  mounted() {
    this.getPedido(this.$route.params.id);
    this.loadEstados();
  },
  methods: {
    async getPedido(idPedido){
      this.loader = true;
      try{
        const res = await Pedido.getPedido(idPedido);
        this.pedido = res.data;
        if(this.pedido.tipoPedido == 'on-line'){
          this.pedido.pedidoOnline.idUf = res.data.pedidoOnline.cidade.estado.idUf;
          this.loadCidades(this.pedido.pedidoOnline.idUf);
        }
      }catch(err){
        showError(err);
      }finally{
        this.loader = false;
      }
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
      this.pedido.idCliente = cliente.idCliente;
      this.pedido.cliente.nomeCliente = cliente.nomeCliente;
    },
    onChangeCliente(nomeCliente) {
      this.getClientes(nomeCliente);
    },
    submitPedido() {
      if (this.pedido.tipoPedido === "balcao") {
        delete this.pedido.valorFrete;
        delete this.pedido.valorTarifa;
      }
      if(this.ajusteValor){
        this.pedido.valorDesconto = this.ajusteValor;
      }
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.updatePedido();
    },
    async updatePedido() {
      try {
        await Pedido.updatePedido(this.pedido);
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
      let a = this.ajustePorcento * this.pedido.valorProdutos;
      this.ajusteValor = a / 100;
      this.totalAjustado();
    },
    changeAjusteValor() {
      let a = this.ajusteValor * 100;
      this.ajustePorcento = a / this.pedido.valorProdutos;
      this.totalAjustado();
    },
    totalAjustado() {
      return this.pedido.valorProdutos - this.ajusteValor;
    },
    async loadCidades(idUf) {
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
    formataData(value){
      if(value){
        return moment(String(value)).format("DD/MM/YYYY HH:mm");
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
