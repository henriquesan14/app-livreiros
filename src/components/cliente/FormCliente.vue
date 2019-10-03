<template>
  <div class="form-cliente">
    <b-form @submit.prevent="submitCliente">
      <b-row>
        <b-col>
          <b-form-group label="Nome*">
            <b-form-input v-model="cliente.nomeCliente" size="sm"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email*">
            <b-form-input v-model="cliente.emailCliente" size="sm"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Tipo Pessoa">
            <b-form-radio-group v-model="cliente.tipoPessoa">
              <b-form-radio size="sm" value="fisica">Física</b-form-radio>
              <b-form-radio size="sm" value="juridica">Jurídica</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col v-if="cliente.tipoPessoa === 'fisica'">
          <b-form-group label="CPF*">
            <the-mask
              mask="###.###.###-##"
              class="form-control form-control-sm"
              v-model="cliente.clientePf.cpfCliente"
            ></the-mask>
          </b-form-group>
        </b-col>
        <b-col v-if="cliente.tipoPessoa === 'juridica'">
          <b-form-group label="CNPJ*">
            <the-mask
              mask="###.###.###/####-##"
              class="form-control form-control-sm"
              v-model="cliente.clientePj.cnpjCliente"
            ></the-mask>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Telefones*">
            <b-row>
              <b-col md="2" v-for="(telefone, index) in cliente.telefones" :key="index">
                <div class="mb-2 box-telefone">
                  <the-mask
                    mask="(##)#####-####"
                    class="form-control form-control-sm"
                    readonly
                    :value="telefone"
                  ></the-mask>
                  <button @click="removeTelefone(index)" class="ml-1 btn-remove">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </b-col>
            </b-row>
            <b-button @click="$bvModal.show('modal-form-telefone')" size="sm" variant="primary">
              <i class="fa fa-plus-circle mr-1"></i>Adicionar telefone
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Obs.">
            <b-textarea></b-textarea>
          </b-form-group>
        </b-col>
      </b-row>

      <b-badge class="mb-2">
        <span class="title-badge">Endereço</span>
      </b-badge>
      <b-row>
        <b-col md="2">
          <b-form-group
            label="CEP: *"
            label-for="cep"
          >
            <the-mask
              class="form-control form-control-sm"
              :mask="'#####-###'"
              :masked="false"
              type="text"
              id="cep"
              placeholder="Informe o CEP"
            />
          </b-form-group>
        </b-col>
        <b-col >
            <b-form-group label="Logradouro*">
                <b-form-input size="sm"></b-form-input>
            </b-form-group>
        </b-col>
        <b-col md="2">
            <b-form-group label="Nº">
                <b-form-input size="sm"></b-form-input>
            </b-form-group>
        </b-col>
      </b-row>
      <b-row>
          <b-col>
              <b-form-group label="Bairro">
                  <b-form-input size="sm"></b-form-input>
              </b-form-group>
          </b-col>
          <b-col>
              <b-form-group label="Complemento">
                  <b-form-input size="sm"></b-form-input>
              </b-form-group>
          </b-col>
      </b-row>

      
      <b-button size="sm" type="submit" variant="success" class="mr-2">
        <i class="fa fa-save mr-1"></i>Salvar
      </b-button>
      <b-button variant="dark" size="sm">
        <i class="fa fa-arrow-left mr-1"></i>Fechar
      </b-button>
    </b-form>
    <ModalFormTelefone @add-telefone="addTelefone" />
  </div>
</template>

<script>
import ModalFormTelefone from "./ModalFormTelefone";
export default {
  name: "FormCliente",
  components: { ModalFormTelefone },
  data() {
    return {
      cliente: {
        telefones: [],
        tipoPessoa: "fisica",
        clientePj: {},
        clientePf: {}
      }
    };
  },
  methods: {
    submitCliente() {
      console.log(this.cliente);
    },
    addTelefone(telefone) {
      this.cliente.telefones.push(telefone);
    },
    removeTelefone(index) {
      this.cliente.telefones.splice(index, 1);
    }
  }
};
</script>

<style>
.box-telefone {
  display: flex;
  align-items: center;
}

.btn-remove {
  display: flex;
  align-items: center;
  padding: 5px 6px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>