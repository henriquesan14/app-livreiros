<template>
  <div class="pedido-detail">
    <PageTitle icon="fas fa-shopping-cart" main="Administração de pedidos" sub="Detalhes pedido" />
    <b-card>
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Detalhes Pedido Atual</h5>
          <router-link tag="button" to="/dashboard/pedidos" class="btn-dark btn-sm mb-1">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
      <div v-if="!loader">
        <div class="table-responsive">
          <b-row>
            <b-col>
              <b-card no-body header="Informações">
                <div class="card-info">
                  <div class="box-info">
                    <span class="title">Cód.</span>
                    <span>{{pedido.idPedido}}</span>
                    <span class="title">Data do pedido</span>
                    <span>{{formataData(pedido.createdAt)}}</span>
                    <span class="title">Tipo Pedido</span>
                    <span>{{pedido.tipoPedido}}</span>
                    <span class="title">Cliente</span>
                    <span>{{pedido.cliente.nomeCliente}}</span>
                    <span class="title">Usuário</span>
                    <span>
                      {{pedido.usuario.loginUsuario
                      }}
                    </span>
                  </div>
                </div>
              </b-card>
            </b-col>

            <b-col>
              <b-card no-body header="Informações">
                <div class="card-info">
                  <div class="box-info">
                    <span class="title">Status Pedido</span>
                    <b-badge class="desc-pedido" :variant="pedido.statusPedido == 'pendente' ? 'danger' : 'success'"><span>{{pedido.statusPedido.toUpperCase()}}</span></b-badge>
                    <span class="title">Valor desconto</span>
                    <span>{{pedido.valorDesconto | currency}}</span>
                    <span class="title">Valor Frete</span>
                    <span>{{pedido.valorFrete | currency}}</span>
                    <span class="title">Valor tarifa</span>
                    <span>{{pedido.valorTarifa | currency}}</span>
                    <span class="title">Valor total</span>
                    
                      <b-badge variant="danger" class="desc-pedido"><span>{{pedido.valorTotal | currency
                      }}</span></b-badge>
                  
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <br />
          <b-row v-if="pedido.pedidoOnline">
            <b-col>
              <b-card no-body header="Pedido Online">
                <div class="card-info">
                  <div class="box-info">
                    <span class="title">ID Externo</span>
                    <span>{{pedido.pedidoOnline.idExterno}}</span>
                    <span class="title">Canal de vendas</span>
                    <span>{{pedido.pedidoOnline.canalVendas}}</span>
                    <span class="title">Status pagamento</span>
                    <b-badge class="desc-pedido" :variant="pedido.pedidoOnline.statusPagamento == 'pendente' ? 'danger' : 'success'"><span>{{pedido.pedidoOnline.statusPagamento.toUpperCase()}}</span></b-badge>
                    <span class="title">Data/hora pagamento</span>
                    <span>{{formataData(pedido.pedidoOnline.dataHoraPagamento)}}</span>
                    <span class="title">Tipo Pagamento</span>
                    <span>{{pedido.pedidoOnline.tipoPagamento}}</span>
                    <span class="title">Tipo Envio</span>
                    <span>
                      {{pedido.pedidoOnline.tipoEnvio
                      }}
                    </span>
                    <span class="title">Status envio</span>
                    <b-badge class="desc-pedido" :variant="pedido.pedidoOnline.statusEnvio == 'pendente' ? 'danger' : 'success'"><span>{{pedido.pedidoOnline.statusEnvio.toUpperCase()}}</span></b-badge>
                  </div>
                </div>
              </b-card>
            </b-col>

            <b-col>
              <b-card no-body header="Pedido Online">
                <div class="card-info">
                  <div class="box-info">
                    <span class="title">CEP</span>
                    <span>{{pedido.pedidoOnline.cep}}</span>
                    <span class="title">Destinatário</span>
                    <span>{{pedido.pedidoOnline.destinatario}}</span>
                    <span class="title">Rua</span>
                    <span>{{pedido.pedidoOnline.rua}}</span>
                    <span class="title">Número</span>
                    <span>{{pedido.pedidoOnline.numero}}</span>
                    <span class="title">Complemento</span>
                    <span>{{pedido.pedidoOnline.complemento ? pedido.pedidoOnline.complemento : 'N/A'}}</span>
                    <span class="title">Bairro</span>
                    <span>{{pedido.pedidoOnline.bairro}}</span>
                    <span class="title">Cidade</span>
                    <span>{{pedido.pedidoOnline.idCidade}}</span>
                    
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>

          <b-row class="mt-1" v-if="pedido.obsPedido">
            <b-col>
              <b-form-group label="Obs. Pedido">
                <b-form-textarea rows="4" readonly :value="pedido.obsPedido"></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>

          <br />
          <b-badge>
            <span class="title-badge">Livros descritos</span>
          </b-badge>
          <table class="table table-sm mt-1">
            <thead class="table-dark">
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
                <td>{{item.qtdLivroDescrito}}</td>
                <td>{{item.valorUnitLivroDescrito | currency}}</td>
                <td>{{item.valorTotalLivroDescrito | currency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Loading :loader="loader" />
    </b-card>
  </div>
</template>

<script>
import Pedido from "../../services/pedidos";
import PageTitle from "../template/PageTitle";
import Loading from "../shared/Loading";
import moment from "moment";
import { showError } from "@/global";
export default {
  name: "PedidoDetail",
  components: { PageTitle, Loading },
  data() {
    return {
      pedido: {},
      loader: false
    };
  },
  created() {
    this.getPedido(this.$route.params.id);
  },
  methods: {
    async getPedido(id) {
      this.loader = true;
      try {
        const res = await Pedido.getPedido(id);
        this.pedido = res.data;
      } catch (err) {
        showError(err);
      } finally {
        this.loader = false;
      }
    },
    formataData(value) {
      return moment(String(value)).format("DD/MM/YYYY HH:mm");
    }
  }
};
</script>

<style lang="scss">
.img-cart {
  width: 100px;
  height: 120px;
}

.card-info {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}

.box-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  span {
    padding: 0 40px 0 0;
  }

  span.title {
    font-weight: bold;
    font-size: 1rem;
  }

  .desc-pedido {
    width:120px;
    font-size:1rem;
    padding:4px 15px;
  }
}
</style>