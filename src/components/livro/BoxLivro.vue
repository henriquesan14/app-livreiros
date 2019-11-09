<template>
  <div class="card-livro">
    <div class="box-livro mb-2">
      <div class="img-livro">
        <img
          :src="'https://imagens-capas-1.s3.amazonaws.com/'+ (livro.imagemLivro == null ? '1570218265559': livro.imagemLivro)"
          alt="capa-livro"
        />
      </div>
      <div class="info-livro">
        <div class="title-livro">
          <h4>
            <strong>{{livro.tituloLivro | toTitle}}</strong>
          </h4>
          <h4>{{livro.autor.nomeAutor | toTitle}}</h4>
        </div>
        <div class="desc-livro">
          <div class="desc1">
            <span>
              <strong>Ano:</strong>
              {{livro.anoLivro}}
            </span>
            <span>
              <strong>Tipo:</strong>
              {{livro.condicaoLivro}}
            </span>
            <span>
              <strong>Qtd.:</strong>
              {{livro.qtdTotal}}
            </span>
          </div>
          <div class="desc2">
            <span>
              <strong>Editora:</strong>
              {{livro.editora.nomeEditora}}
            </span>
            <span>
              <strong>Assunto:</strong>
              {{livro.assunto.nomeAssunto}}
            </span>
            <span>
              <strong>Cód.:</strong>
              {{livro.idLivro}}
            </span>
          </div>
        </div>
      </div>
      <!--info-->

      <div class="info2-livro">
        <h4>{{livro.precoLivro | currency}}</h4>
        <div class="btns-livro">
          <b-button
            v-b-tooltip.hover
            title="Adicionar"
            size="sm"
            v-hasRole="'ESCREVER_LIVRO'"
            @click="navigateNovoLivroDescrito(livro.idLivro);"
            variant="primary"
            class="mr-2"
          >
            <i class="fa fa-plus"></i>
          </b-button>
          <b-button
            v-b-tooltip.hover
            title="Editar"
            size="sm"
            v-hasRole="'ESCREVER_LIVRO'"
            @click="navigateEditLivro(livro.idLivro);"
            variant="warning"
            class="mr-2"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button
            v-b-tooltip.hover
            title="Visualizar"
            class="btn-plus"
            size="sm"
            @click="navigateLivroDetail(livro.idLivro)"
            variant="dark"
          >
            <i class="fa fa-search-plus"></i>
          </b-button>
        </div>

        <b-button
          size="sm"
          :disabled="livro.livrosDescritos.length < 1"
          @click="loadLivro(livro.idLivro);livro.showCollapse = !livro.showCollapse"
          class="mt-2"
          variant="secondary"
        >
          Descrição
          <i class="fa fa-caret-down ml-2"></i>
        </b-button>
      </div>
      <!--btn-->
    </div>
    <!--box-->
    <div v-if="livro.livrosDescritos.length > 0">
      <b-collapse id="collapse-livro" class="mb-3" v-model="livro.showCollapse">
        <h4 class="text-center mt-1">Livros Descritos</h4>
        <b-table
          class="table-sm"
          :responsive="true"
          :items="livro.livrosDescritos"
          :fields="fields"
          hover
          striped
        >
          <template
            v-slot:cell(precoLivroDescrito)="data"
          >{{data.item.precoLivroDescrito | currency}}</template>
          <template v-slot:cell(actions)="data">
            <b-button
              v-b-tooltip.hover
              title="Editar"
              class="mr-2"
              size="sm"
              v-hasRole="'ESCREVER_LIVRO'"
              @click="loadLivroDesc(data.item);navigateEditLivroDescrito(livro.idLivro,data.item.idLivroDescrito)"
              variant="warning"
            >
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button
              class="mr-2"
              v-b-tooltip.hover
              title="Solicitar"
              size="sm"
              v-hasRole="'ESCREVER_LIVRO'"
              variant="success"
              @click="loadLivroDesc(data.item);$bvModal.show('modal-solicitacao')"
            >
              <i class="fas fa-list-alt"></i>
            </b-button>

            <b-button
              :disabled="data.item.qtdLivro < 1"
              v-b-tooltip.hover
              title="Adicionar"
              size="sm"
              v-hasRole="'ESCREVER_LIVRO'"
              variant="primary"
              @click="addLivroToCart(data.item)"
            >
              <i class="fas fa-plus-circle"></i>
            </b-button>
          </template>
        </b-table>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { addLivro } from '../../utils/storage';
export default {
  name: "BoxLivro",
  data() {
    return {
      fields: [
        { key: "subIdLivro", label: "SubCód.", sortable: true },
        {
          key: "textLivroDescrito",
          label: "Desc.",
          sortable: true,
          formatter: value => (value != null ? value : "N/A")
        },
        { key: "qtdLivro", label: "Qtd.", sortable: true },
        {
          key: "precoLivroDescrito",
          label: "Preço",
          sortable: true,
          formatter: value => {
            return "R$" + value;
          }
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  props: {
    livro: {
      type: Object
    }
  },
  methods: {
    loadLivro(idLivro) {
      this.$store.dispatch("SET_LIVRO_SELECIONADO", { idLivro: idLivro });
    },
    loadLivroDesc(livroDesc) {
      this.livroDescrito = livroDesc;
      this.livroDescrito.movimento = "adicionar";
      this.livroDescrito.descricoes = [];
      this.$store.dispatch("SET_LIVRO_DESCRITO", {
        livroDescrito: this.livroDescrito
      });
    },
    zeraLivroDesc() {
      this.$store.dispatch("RESET_LIVRO_DESCRITO");
    },
    navigateLivroDetail(id) {
      this.$router.push({ name: "livro-detalhes", params: { id } });
    },
    navigateEditLivro(id) {
      this.$router.push({ name: "edit-livro", params: { id } });
    },
    navigateNovoLivroDescrito(idlivro) {
      this.$router.push({
        name: "cadastro-livro-descrito",
        params: { idlivro }
      });
    },
    navigateEditLivroDescrito(idlivro, idlivrodescrito) {
      this.$router.push({
        name: "edicao-livro-descrito",
        params: { idlivro: idlivro, idlivrodescrito: idlivrodescrito }
      });
    },
    addLivroToCart(livro) {
      livro.tituloLivro = this.livro.tituloLivro;
      livro.imagemLivro = this.livro.imagemLivro;

      addLivro(livro);
      livro.qtdLivro -= 1;
      this.$store.dispatch('SET_CART');
      this.$toasted.global.livroAdicionado();
    }
  }
};
</script>

<style lang="scss">
h4 {
  font-size: 1.2rem;
}
.box-livro {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  height: auto;
  padding: 5px;
}
.img-livro {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin-right: 5px;

  img {
    width: 120px;
    height: 140px;
  }
}

.info-livro {
  display: flex;
  padding: 5px;
  flex-direction: column;
  flex: 5;
  margin-right: 5px;
}

.desc-livro {
  display: flex;

  span {
    margin-right: 10px;
  }
}

.desc1 {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}

.desc2 {
  display: flex;
  flex-direction: column;
}

.info2-livro {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btns-livros {
  display: flex;
}

#collapse-livro {
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media (max-width: 500px) {
  .scroll-table {
    overflow-x: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .box-livro {
    border: none;
  }

  .btn-plus {
    margin-top: 8px;
  }
}
</style>