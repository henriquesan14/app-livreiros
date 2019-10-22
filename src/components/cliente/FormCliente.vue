<template>
  <div class="form-cliente">
    <Loading :loader="loader" />
    <b-form @submit.prevent="submitCliente" v-if="!loader">
      <b-row>
        <b-col>
          <b-form-group label="Nome*" :invalid-feedback="invalidFeedBack($v.cliente.nomeCliente)">
            <b-form-input
              maxlength="100"
              placeholder="Informe o nome do cliente"
              :class="{'is-invalid': submitted && $v.cliente.nomeCliente.$invalid, 'is-valid': submitted && !$v.cliente.nomeCliente.$invalid}"
              v-model="cliente.nomeCliente"
              size="sm"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email*" :invalid-feedback="invalidFeedBack($v.cliente.emailCliente)">
            <b-form-input
              maxlength="100"
              placeholder="Informe o email do cliente"
              :class="{'is-invalid': submitted && $v.cliente.emailCliente.$invalid, 'is-valid': submitted && !$v.cliente.emailCliente.$invalid}"
              v-model="cliente.emailCliente"
              size="sm"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Tipo Pessoa*">
            <b-form-radio-group :disabled="!!cliente.idCliente" v-model="cliente.tipoPessoa">
              <b-form-radio size="sm" value="fisica">Física</b-form-radio>
              <b-form-radio size="sm" value="juridica">Jurídica</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" v-if="cliente.tipoPessoa === 'fisica'">
          <b-form-group
            label="CPF*"
            :invalid-feedback="invalidFeedBack($v.cliente.clientePf.cpfCliente)"
          >
            <the-mask
            :disabled="!!cliente.idCliente"
              placeholder="Informe o CPF do cliente"
              :class="{'is-invalid': submitted && $v.cliente.clientePf.cpfCliente.$invalid, 'is-valid': submitted && !$v.cliente.clientePf.cpfCliente.$invalid}"
              mask="###.###.###-##"
              class="form-control form-control-sm"
              v-model="cliente.clientePf.cpfCliente"
            ></the-mask>
          </b-form-group>
        </b-col>
        <b-col md="3" v-if="cliente.tipoPessoa === 'juridica'">
          <b-form-group
            label="CNPJ*"
            :invalid-feedback="invalidFeedBack($v.cliente.clientePj.cnpjCliente)"
          >
            <the-mask
            :disabled="!!cliente.idCliente"
              placeholder="Informe o CNPJ do cliente"
              :class="{'is-invalid': submitted && $v.cliente.clientePj.cnpjCliente.$invalid, 'is-valid': submitted && !$v.cliente.clientePj.cnpjCliente.$invalid}"
              mask="##.###.###/####-##"
              class="form-control form-control-sm"
              v-model="cliente.clientePj.cnpjCliente"
            ></the-mask>
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
      <b-row>
        <b-col>
          <b-form-group label="Telefones*">
            <span
              class="text-danger font-menor block"
              v-if="submitted && $v.cliente.telefones.$invalid"
            >Adicione pelo menos um telefone</span>

            <b-button
              type="button"
              @click="$bvModal.show('modal-form-telefone')"
              size="sm"
              variant="primary"
            >
              <i class="fa fa-plus-circle mr-1"></i>Adicionar novo telefone
            </b-button>
            <b-row class="mt-1">
              <b-col md="2" v-for="(telefone, index) in cliente.telefones" :key="index">
                <span>Telefone {{index + 1}}</span>
                <div class="mb-2 box-telefone">
                  <the-mask
                    mask="(##)#####-####"
                    class="form-control form-control-sm"
                    readonly
                    :value="telefone.telefoneCliente"
                  ></the-mask>
                  <button type="button" @click="removeTelefone(index)" class="ml-1 btn-remove">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group label="Endereços*">
            <span
              class="text-danger font-menor block"
              v-if="submitted && $v.cliente.enderecos.$invalid"
            >Adicione pelo menos um endereço</span>

            <b-button
              type="button"
              @click="$bvModal.show('modal-form-endereco')"
              size="sm"
              variant="primary"
            >
              <i class="fa fa-plus-circle mr-1"></i>Adicionar novo endereço
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        v-if="cliente.enderecos.length > 0"
        class="table-sm"
        :responsive="true"
        hover
        striped
        :items="cliente.enderecos"
        :fields="fields"
      >
        <template
          v-slot:cell(statusUsuario)="endereco"
        >{{`${data.item.rua}, Nº ${data.item.numero} ${data.item.complemento ? data.item.complemento : ''}, ${data.item.bairro}, ${data.item.nomeCidade}-${data.item.siglaUf} - ${data.item.cepCliente}`}}</template>
        <template v-slot:cell(statusUsuario)="actions">
          <b-button @click="removeEndereco(data.index)" variant="danger" size="sm">
            <i class="fas fa-trash"></i>
          </b-button>
        </template>
      </b-table>

      <b-button size="sm" type="submit" variant="success" class="mr-2">
        <i class="fa fa-save mr-1"></i>Salvar
      </b-button>
      <router-link tag="button" to="/dashboard/clientes" class="btn btn-dark btn-sm">
        <i class="fa fa-arrow-left mr-1"></i>Voltar
      </router-link>
    </b-form>
    <ModalFormTelefone @add-telefone="addTelefone" />
    <ModalFormEndereco @add-endereco="addEndereco" />
  </div>
</template>

<script>
import ModalFormTelefone from "./ModalFormTelefone";
import ModalFormEndereco from "./ModalFormEndereco";
import { showError } from "@/global";
import { validationMsg } from "../../utils/validation-msgs";
import { validaCpf } from "../../utils/cpf_validator";
import { validaCnpj } from "../../utils/cnpj_validator";
import Cliente from '../../services/clientes';
import Loading from '../shared/Loading'
import {
  required,
  minLength,
  email,
  requiredIf
} from "vuelidate/lib/validators";
export default {
  name: "FormCliente",
  components: { ModalFormTelefone, ModalFormEndereco, Loading },
  data() {
    return {
      fields: [
        { key: "endereco", label: "Rua" },
        { key: "actions", label: "Ações" }
      ],
      submitted: false,
      cliente: {
        telefones: [],
        tipoPessoa: "fisica",
        clientePj: {},
        clientePf: {},
        enderecos: [],
      },
      loader: false
    };
  },
  mounted(){
    const param = parseInt(this.$route.params.id);
    if(Number.isInteger(param)){
      this.getCliente(param);
    }
  },
  validations() {
    return {
      cliente: {
        nomeCliente: { required, minLength: minLength(6) },
        emailCliente: { required, email },
        clientePj: {
          cnpjCliente: {
            requiredIf: requiredIf(() => {
              if (this.cliente.tipoPessoa === "juridica") {
                return true;
              }
            }),
            minLength: minLength(14),
            validaCnpj
          }
        },
        clientePf: {
          cpfCliente: {
            requiredIf: requiredIf(() => {
              if (this.cliente.tipoPessoa === "fisica") {
                return true;
              }
            }),
            minLength: minLength(11),
            validaCpf
          }
        },
        telefones: { required },
        enderecos: { required }
      }
    };
  },
  methods: {
    submitCliente() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$emit("submit-cliente", this.cliente);
      this.submitted = false;
    },
    addTelefone(telefone) {
      this.cliente.telefones.push(telefone);
    },
    addEndereco(endereco) {
      this.cliente.enderecos.push(endereco);
    },
    removeTelefone(index) {
      this.cliente.telefones.splice(index, 1);
    },
    removeEndereco(index){
      this.cliente.enderecos.splice(index, 1);
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    },
    async getCliente(id){
      this.loader = true;
      try{
        const res = await Cliente.getCliente(id);
        this.cliente = res.data;
      }catch(err){
        showError(err);
      }finally{
        this.loader = false;
      }
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

.font-menor {
  font-size: 0.785rem;
}

.block {
  display: block;
}
</style>