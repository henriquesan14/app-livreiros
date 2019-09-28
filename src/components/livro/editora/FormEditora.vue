<template>
  <div class="form-editora">
    <b-modal size="lg" id="modal-editora" hide-footer>
      <template slot="modal-title">{{editora.idEditora == null ? 'Nova editora' : 'Edição editora'}}</template>
      <div class="d-block">
        <b-form @submit.prevent="submitEditora()">
          <b-row>
            <b-col>
              <b-form-group
                label="Nome: "
                label-for="nomeEditora"
                :invalid-feedback="invalidFeedBack($v.editora.nomeEditora)"
              >
                <b-form-input
                  size="sm"
                  :class="{'is-invalid': submitted && $v.editora.nomeEditora.$invalid, 'is-valid': submitted && !$v.editora.nomeEditora.$invalid}"
                  maxlength="100"
                  id="nomeEditora"
                  v-model="editora.nomeEditora"
                  placeholder="Informe o nome da editora"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button size="sm" class="mr-2" type="submit" variant="success">
            <i class="fa fa-save mr-1"></i>Salvar
          </b-button>
          <b-button size="sm" type="button" @click="$bvModal.hide('modal-editora')">
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
import Editora from "../../../services/editoras";
import { validationMsg } from "../../../config/validation-msgs";
export default {
  name: "FormEditora",
  data() {
    return {
      submitted: false
    };
  },
  props: {
    editora: {
      type: Object,
      required: true
    }
  },
  validations: {
    editora: {
      nomeEditora: { required }
    }
  },
  methods: {
    async saveEditora() {
      try {
        await Editora.saveEditora(this.editora);
        this.reset();
        this.$bvModal.hide("modal-editora");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-editora");
      } catch (err) {
        showError(err);
      }
    },
    async editEditora() {
      try {
        await Editora.editEditora(this.editora.idEditora, this.editora);
        this.$bvModal.hide("modal-editora");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-editora");
      } catch (err) {
        showError(err);
      }
    },
    submitEditora() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      if (this.editora.idEditora) {
        this.editEditora();
      } else {
        this.saveEditora();
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
