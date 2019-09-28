<template>
  <div class="form-autor">
    <b-modal size="lg" id="modal-autor" hide-footer>
      <template slot="modal-title">{{autor.idAutor == null ? 'Novo autor' : 'Edição autor'}}</template>
      <div class="d-block">
        <b-form @submit.prevent="submitAutor()">
          <b-row>
            <b-col>
              <b-form-group
                label="Nome: "
                label-for="nomeAutor"
                :invalid-feedback="invalidFeedBack($v.autor.nomeAutor)"
              >
                <b-form-input
                  size="sm"
                  :class="{'is-invalid': submitted && $v.autor.nomeAutor.$invalid, 'is-valid': submitted && !$v.autor.nomeAutor.$invalid}"
                  maxlength="100"
                  id="nomeAutor"
                  v-model="autor.nomeAutor"
                  placeholder="Informe o nome do autor"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button size="sm" class="mr-2" type="submit" variant="success">
            <i class="fa fa-save mr-1"></i>Salvar
          </b-button>
          <b-button size="sm" type="button" @click="$bvModal.hide('modal-autor')">
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
import Autor from "../../../services/autores";
import { validationMsg } from "../../../config/validation-msgs";
export default {
  name: "FormAutor",
  data() {
    return {
      submitted: false
    };
  },
  props: {
    autor: {
      type: Object,
      required: true
    }
  },
  validations: {
    autor: {
      nomeAutor: { required }
    }
  },
  methods: {
    async saveAutor() {
      try {
        await Autor.saveAutor(this.autor);
        this.reset();
        this.$bvModal.hide("modal-autor");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-autor");
      } catch (err) {
        showError(err);
      }
    },
    async editAutor() {
      try {
        await Autor.editAutor(this.autor.idAutor, this.autor);
        this.$bvModal.hide("modal-autor");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-autor");
      } catch (err) {
        showError(err);
      }
    },
    submitAutor() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      if (this.autor.idAutor) {
        this.editAutor();
      } else {
        this.saveAutor();
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
