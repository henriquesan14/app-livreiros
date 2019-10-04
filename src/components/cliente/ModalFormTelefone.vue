<template>
  <div class="add-telefone">
    <b-modal size="md" id="modal-form-telefone" hide-footer>
      <template slot="modal-title">Novo Telefone</template>
      <div class="d-block">
        <b-form @submit.prevent="submitTelefone">
          <b-row>
            <b-col>
              <b-form-group
                :invalid-feedback="invalidFeedBack($v.telefone.telefoneCliente)"
                label="Telefone"
              >
                <the-mask
                  placeholder="Informe um número de telefone"
                  :class="{'is-invalid': submitted && $v.telefone.telefoneCliente.$invalid, 'is-valid': submitted && !$v.telefone.telefoneCliente.$invalid}"
                  v-model="telefone.telefoneCliente"
                  :mask="['(##)#####-####', '(##)####-####']"
                  class="form-control form-control-sm"
                ></the-mask>
              </b-form-group>
            </b-col>
          </b-row>
          <b-button variant="success" size="sm" class="mr-2" type="submit">
            <i class="fa fa-plus-circle mr-1"></i>Adicionar
          </b-button>
          <b-button
            @click="$bvModal.hide('modal-form-telefone')"
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
import { validationMsg } from "../../utils/validation-msgs";
export default {
  name: "ModalFormTelefone",
  data() {
    return {
      submitted: false,
      telefone: {}
    };
  },
  validations() {
    return {
      telefone: {
        telefoneCliente: { required, minLength: minLength(10) }
      }
    };
  },
  methods: {
    addTelefone() {
      this.$emit("add-telefone", this.telefone);
      this.telefone = {};
      this.$bvModal.hide("modal-form-telefone");
    },
    submitTelefone() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.addTelefone(this.telefone);
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    }
  }
};
</script>

<style>
</style>