<template>
  <div class="form-assunto">
    <b-modal size="lg" id="modal-assunto" hide-footer>
      <template slot="modal-title">{{assunto.idAssunto == null ? 'Novo assunto' : 'Edição assunto'}}</template>
      <div class="d-block">
        <b-form @submit.prevent="submitAssunto()">
          <b-row>
            <b-col>
              <b-form-group label="Nome: " label-for="nomeAssunto" :invalid-feedback="invalidFeedBack($v.assunto.nomeAssunto)">
                <b-form-input
                  size="sm"
                  :class="{'is-invalid': submitted && $v.assunto.nomeAssunto.$invalid, 'is-valid': submitted && !$v.assunto.nomeAssunto.$invalid}"
                  maxlength="100"
                  id="nomeAssunto"
                  v-model="assunto.nomeAssunto"
                  placeholder="Informe o nome do assunto"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button size="sm" class="mr-2" type="submit" variant="success">
            <i class="fa fa-save mr-1"></i>Salvar
          </b-button>
          <b-button size="sm" type="button" @click="$bvModal.hide('modal-assunto')">
            <i class="fa fa-arrow-left mr-1"></i>Fechar
          </b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { showError } from "@/global";
import Assunto from '../../../services/assuntos';
import {validationMsg} from '../../../config/validation-msgs';
export default {
  name: "FormAssunto",
  data() {
    return {
      submitted: false
    };
  },
  props: {
    assunto: {
      type: Object,
      required: true
    }
  },
  validations: {
    assunto: {
      nomeAssunto: { required }
    }
  },
  methods: {
    async saveAssunto() {
      try {
        await Assunto.saveAssunto(this.assunto);
        this.reset();
        this.$bvModal.hide("modal-assunto");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-assunto");
      } catch (err) {
        showError(err);
      }
    },
    async editAssunto() {
      try {
        await Assunto.editAssunto(this.assunto.idAssunto, this.assunto);
        this.$bvModal.hide("modal-assunto");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-assunto");
      } catch (err) {
        showError(err);
      }
    },
    submitAssunto() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      if (this.assunto.idAssunto) {
        this.editAssunto();
      } else {
        this.saveAssunto();
      }
    },
    reset() {
      this.submitted = false;
    },
    invalidFeedBack(field) {
     return validationMsg(field);
    }
  }
};
</script>

<style>
</style>
