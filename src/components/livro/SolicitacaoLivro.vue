<template>
  <div class="solicitacao-livro">
    <b-modal size="md" id="modal-solicitacao" hide-footer>
      <template slot="modal-title">Solicitação Livro</template>
      <div class="d-block">
        <b-form @submit.prevent="submitSolicitacao">
          <b-row>
            <b-col md="4">
              <b-form-group label="Qtd.: " label-for="qtdSolicitacao" 
              :invalid-feedback="invalidFeedBack($v.solicitacao.qtdSolicitada)">
                <the-mask 
                  :class="{'is-invalid': submitted && $v.solicitacao.qtdSolicitada.$invalid, 'is-valid': submitted && !$v.solicitacao.qtdSolicitada.$invalid}"
                  v-model="solicitacao.qtdSolicitada"
                  placeholder="Qtd."
                  mask="#####"
                  class="form-control form-control-sm"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Obs.: " label-for="obsSolicitacao">
                <b-form-textarea
                  v-model="solicitacao.obsSolicitacao"
                  size="sm"
                  maxlength="100"
                  id="obsSolicitacao"
                  placeholder="Informe a quantidade solicitada"
                  cols="100"
                  rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-button size="sm" class="mr-2" type="submit" variant="success">
            <i class="fa fa-save mr-1"></i>Salvar
          </b-button>
          <b-button size="sm" type="button" @click="$bvModal.hide('modal-solicitacao')">
            <i class="fa fa-arrow-left mr-1"></i>Fechar
          </b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Solicitacao from "../../services/solicitacoes";
import { showError } from "@/global";
import { mapGetters } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";
import { validationMsg } from "../../config/validation-msgs";
export default {
  name: "SolicitacaoLivro",
  computed: mapGetters(["livroDescrito"]),
  data() {
    return {
      solicitacao: {},
      submitted: false
    };
  },
  validations() {
    return {
      solicitacao: {
        qtdSolicitada: { required, minValue: minValue(1) }
      }
    };
  },
  methods: {
    submitSolicitacao() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = false;
      this.saveSolicitacao();
    },
    async saveSolicitacao() {
      this.solicitacao.idLivroDescrito = this.livroDescrito.idLivroDescrito;
      try {
        await Solicitacao.saveSolicitacao(this.solicitacao);
        this.$toasted.global.defaultSuccess();
        this.$bvModal.hide('modal-solicitacao');
        this.reset();
      } catch (err) {
        showError(err);
      }
    },
    reset(){
      this.solicitacao = {};
      this.submitted = false;
    },
    invalidFeedBack(field) {
      return validationMsg(field);
    },
  }
};
</script>

<style>
</style>