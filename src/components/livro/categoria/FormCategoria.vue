<template>
  <div class="form-categoria">
    <b-modal size="lg" id="modal-categoria" hide-footer>
      <template
        slot="modal-title"
      >{{categoria.idCategoriaDescricao == null ? 'Nova categoria' : 'Edição categoria'}}</template>
      <div class="d-block">
        <b-form @submit.prevent="submitCategoria()">
          <b-row>
            <b-col>
              <b-form-group
                label="Nome: "
                label-for="nomeCategoriaDescricao"
                :invalid-feedback="invalidFeedBack($v.categoria.nomeCategoriaDescricao)"
              >
                <b-form-input
                  size="sm"
                  :class="{'is-invalid': submitted && $v.categoria.nomeCategoriaDescricao.$invalid, 'is-valid': submitted && !$v.categoria.nomeCategoriaDescricao.$invalid}"
                  maxlength="100"
                  id="nomeCategoriaDescricao"
                  v-model="categoria.nomeCategoriaDescricao"
                  placeholder="Informe o nome da categoria"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button size="sm" class="mr-2" type="submit" variant="success">
            <i class="fa fa-save mr-1"></i>Salvar
          </b-button>
          <b-button size="sm" type="button" @click="$bvModal.hide('modal-categoria')">
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
import { validationMsg } from "../../../utils/validation-msgs";
import Categoria from "../../../services/categorias";
export default {
  name: "FormCategoria",
  data() {
    return {
      submitted: false
    };
  },
  props: {
    categoria: {
      type: Object,
      required: true
    }
  },
  validations: {
    categoria: {
      nomeCategoriaDescricao: { required }
    }
  },
  methods: {
    async saveCategoria() {
      try {
        await Categoria.saveCategoria(this.categoria);
        this.reset();
        this.$bvModal.hide("modal-categoria");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-categoria");
      } catch (err) {
        showError(err);
      }
    },
    async editCategoria() {
      try {
        await Categoria.editCategoria(
          this.categoria.idCategoriaDescricao,
          this.categoria
        );
        this.$bvModal.hide("modal-categoria");
        this.$toasted.global.defaultSuccess();
        this.$emit("zera-categoria");
      } catch (err) {
        showError(err);
      }
    },
    submitCategoria() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      if (this.categoria.idCategoriaDescricao) {
        this.editCategoria();
      } else {
        this.saveCategoria();
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
