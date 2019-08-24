<template>
  <div class="form-editora">
    <b-modal size="lg" id="modal-editora" hide-footer>
      <template slot="modal-title">{{editora.idEditora == null ? 'Nova editora' : 'Edição editora'}}</template>
      <div class="d-block">
        <b-form @submit.prevent="submitEditora()">
          <b-row>
            <b-col>
              <b-form-group label="Nome: " label-for="nomeEditora">
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
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
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
      const url = `${baseApiUrl}/editoras`;
      try {
        await axios.post(url, this.editora);
        this.reset();
        this.$bvModal.hide("modal-editora");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-editora");
      } catch (err) {
        showError(err);
      }
    },
    async editEditora() {
      const url = `${baseApiUrl}/editoras/${this.editora.idEditora}`;
      try {
        await axios.put(url, this.editora);
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
    }
  }
};
</script>

<style>
</style>
