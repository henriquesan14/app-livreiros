<template>
  <div class="solicitacao-livro">
      <b-modal size="lg" id="modal-solicitacao" hide-footer>
      <template slot="modal-title">Solicitação Livro</template>
      <div class="d-block">
        <b-form>
          <b-row>
            <b-col>
              <b-form-group label="Qtd.: " label-for="qtdSolicitacao">
                <b-form-input
                  size="sm"
                  maxlength="100"
                  id="qtdSolicitacao"
                  placeholder="Informe a quantidade solicitada"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Obs.: " label-for="obsSolicitacao">
                <b-form-textarea
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
export default {
    name: 'SolicitacaoLivro'
}
</script>

<style>

</style>