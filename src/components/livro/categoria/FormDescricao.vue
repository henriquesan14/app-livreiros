<template>
  <div class="form-descricao">
    <b-form @submit.prevent="handleSubmit()">
      <b-row>
        <b-col>
          <b-form-group
            label="Nome"
            :invalid-feedback="invalidFeedBack($v.descricao.nomeDescricao)"
          >
            <b-form-input
              size="sm"
              :class="{'is-invalid': submitted && $v.descricao.nomeDescricao.$invalid, 'is-valid': submitted && !$v.descricao.nomeDescricao.$invalid}"
              v-model="descricao.nomeDescricao"
              maxlength="100"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="( - ) R$">
            <b-form-input
              size="sm"
              :class="{'is-invalid': submitted && $v.descricao.reducaoPreco.$invalid, 'is-valid': submitted && !$v.descricao.reducaoPreco.$invalid}"
              v-model="descricao.reducaoPreco"
              v-money="money"
              maxlength="6"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button size="sm" type="submit" class="mb-3 mr-2" variant="success">
        <i class="fa fa-save mr-1"></i>Salvar
      </b-button>
      <b-button
        v-if="descricao.idDescricao"
        size="sm"
        class="mb-3"
        @click="$bvModal.hide('modal-edit-descricoes')"
      >
        <i class="fa fa-arrow-left mr-1"></i>Fechar
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { VMoney } from "v-money";
import { required } from "vuelidate/lib/validators";
import { validationMsg } from "../../../config/validation-msgs";
export default {
  name: "FormDescricao",
  directives: { money: VMoney },
  data() {
    return {
      submitted: false,
      money: {
        decimal: ".",
        thousands: "",
        precision: 2,
        masked: false
      }
    };
  },
  props: {
    descricao: {
      type: Object
    }
  },
  validations: {
    descricao: {
      nomeDescricao: { required },
      reducaoPreco: { required }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.descricao.$touch();
      if (this.$v.descricao.$invalid) {
        return;
      }
      this.submitted = false;
      this.$emit("submit-descricao", this.descricao);
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    }
  }
};
</script>

<style>
</style>