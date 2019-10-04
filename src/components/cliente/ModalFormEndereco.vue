<template>
  <div class="add-endereco">
    <b-modal size="lg" id="modal-form-endereco" hide-footer>
      <template slot="modal-title">Novo Endereço</template>
      <div class="d-block">
        <b-form @submit.prevent="submitEndereco">
          <b-badge class="mb-2">
            <span class="title-badge">Endereço</span>
          </b-badge>
          <b-row>
            <b-col md="4">
              <b-form-group
                label="CEP: *"
                label-for="cep"
                :invalid-feedback="invalidFeedBack($v.endereco.cepCliente)"
              >
                <the-mask
                  :class="{'is-invalid': submitted && $v.endereco.cepCliente.$invalid, 'is-valid': submitted && !$v.endereco.cepCliente.$invalid}"
                  v-model="endereco.cepCliente"
                  class="form-control form-control-sm mr-1"
                  :mask="'#####-###'"
                  :masked="false"
                  type="text"
                  id="cep"
                  placeholder="Informe o CEP"
                />
                <b-button
                  class="mt-1"
                  type="button"
                  @click="consumerCep"
                  size="sm"
                  variant="primary"
                >
                  <i class="fa fa-search mr-1"></i>Pesquisar CEP
                </b-button>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Destinatário*"
                :invalid-feedback="invalidFeedBack($v.endereco.destinatario)"
              >
                <b-form-input
                  placeholder="Informe o destinatário"
                  maxlength="100"
                  :class="{'is-invalid': submitted && $v.endereco.destinatario.$invalid, 'is-valid': submitted && !$v.endereco.destinatario.$invalid}"
                  size="sm"
                  v-model="endereco.destinatario"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                :invalid-feedback="invalidFeedBack($v.endereco.rua)"
                label="Logradouro*"
              >
                <b-form-input
                  maxlength="100"
                  placeholder="Informe o logradouro"
                  :class="{'is-invalid': submitted && $v.endereco.rua.$invalid, 'is-valid': submitted && !$v.endereco.rua.$invalid}"
                  v-model="endereco.rua"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Nº" :invalid-feedback="invalidFeedBack($v.endereco.numero)">
                <b-form-input
                  placeholder="Informe o número"
                  :class="{'is-invalid': submitted && $v.endereco.numero.$invalid, 'is-valid': submitted && !$v.endereco.numero.$invalid}"
                  maxlength="5"
                  v-model="endereco.numero"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Bairro*" :invalid-feedback="invalidFeedBack($v.endereco.bairro)">
                <b-form-input
                  maxlength="100"
                  placeholder="Informe o bairro"
                  :class="{'is-invalid': submitted && $v.endereco.bairro.$invalid, 'is-valid': submitted && !$v.endereco.bairro.$invalid}"
                  v-model="endereco.bairro"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Complemento">
                <b-form-input
                  maxlength="100"
                  placeholder="Informe o complemento"
                  v-model="endereco.complemento"
                  size="sm"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6" sm="12">
              <b-form-group
                label="Estado: *"
                label-for="estado"
                :invalid-feedback="invalidFeedBack($v.endereco.idUf)"
              >
                <b-form-select
                  :class="{'is-invalid': submitted && $v.endereco.idUf.$invalid, 'is-valid': submitted && !$v.endereco.idUf.$invalid}"
                  size="sm"
                  v-model="endereco.idUf"
                  @change="loadCidades(endereco.idUf)"
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
            <b-col md="6" sm="12">
              <b-form-group
                label="Cidade: *"
                label-for="cidade"
                :invalid-feedback="invalidFeedBack($v.endereco.idCidade)"
              >
                <b-form-select
                  size="sm"
                  v-model="endereco.idCidade"
                  :class="{'is-invalid': submitted && $v.endereco.idCidade.$invalid, 'is-valid': submitted && !$v.endereco.idCidade.$invalid}"
                >
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
          <b-button variant="success" size="sm" class="mr-2" type="submit">
            <i class="fa fa-plus-circle mr-1"></i>Adicionar
          </b-button>
          <b-button
            @click="$bvModal.hide('modal-form-endereco')"
            variant="dark"
            size="sm"
            type="button"
          >
            <i class="fa fa-arrow-left mr-1"></i>Fechar
          </b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { validationMsg } from "../../config/validation-msgs";
import { showError } from "@/global";
import Estado from "../../services/estados";
import WsCep from "../../services/ws-cep";
import { mapGetters } from "vuex";
export default {
  name: "ModalFormEndereco",
  data() {
    return {
      submitted: false,
      cidades: [],
      estados: []
    };
  },
  validations() {
    return {
      endereco: {
        destinatario: { required, minLength: minLength(4) },
        rua: { required },
        cepCliente: { required, minLength: minLength(8) },
        numero: { required },
        bairro: { required },
        idUf: {
          required
        },
        idCidade: {
          required
        }
      }
    };
  },
  computed: mapGetters(["endereco"]),
  mounted() {
    this.loadEstados();
  },
  methods: {
    addEndereco() {
      this.$emit("add-endereco", this.endereco);
      this.$store.dispatch("RESET_ENDERECO");
      this.$bvModal.hide("modal-form-endereco");
    },
    async loadCidades(idUf) {
      this.endereco.idCidade = null;
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
    submitEndereco() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.addEndereco(this.telefone);
    },
    async consumerCep() {
      if (this.cepValido()) {
        let loader = this.$loading.show();
        try {
          const res = await WsCep.buscaCep(this.endereco.cepCliente);
          if (res.data.erro) {
            showError("CEP não encontrado");
            return;
          }
          this.exportDadosWsCep(res.data);
        } catch (err) {
          showError(err);
        } finally {
          loader.hide();
        }
      }
    },
    async exportDadosWsCep(data) {
      let loader = this.$loading.show();
      let endereco = { ...this.endereco };
      data.logradouro ? (endereco.rua = data.logradouro) : (endereco.rua = "");
      data.bairro ? (endereco.bairro = data.bairro) : (endereco.bairro = "");
      this.estados
        .filter(e => e.siglaUf.toUpperCase() === data.uf)
        .forEach(e => {
          endereco.idUf = e.idUf;
          endereco.siglaUf = e.siglaUf;
        });
      try {
        await this.loadCidades(endereco.idUf);
      } catch (err) {
        showError(err);
      } finally {
        loader.hide();
      }
      this.cidades
        .filter(c => c.idIbge == data.ibge)
        .forEach(c => {
          endereco.idCidade = c.idCidade;
          endereco.nomeCidade = c.nomeCidade;
        });
      this.$store.dispatch("SET_ENDERECO", { endereco: endereco });
    },
    cepValido() {
      if (this.endereco.cepCliente != "") {
        let validacep = /^[0-9]{8}$/;
        if (validacep.test(this.endereco.cepCliente)) {
          return true;
        }
      }
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    }
  }
};
</script>

<style>
.flex {
  display: flex;
}
</style>