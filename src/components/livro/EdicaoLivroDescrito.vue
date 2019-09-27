<template>
  <div class="cadastro-livro-descrito">
    <PageTitle icon="fas fa-book" main="Administração de livros descritos" sub="Gerenciar livros descritos" />
      <b-card>
      <Loading :loader="loader" />
      <FormLivroDescrito v-if="!loader" :livroDescrito="livroDescrito" />
      <template slot="header">
        <div class="header-card">
          <h5 class="title-card">Alteração livro descrito</h5>
          <span>Os campos marcados com (*) são obrigatórios.</span>
          <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/livros">
            <i class="fa fa-arrow-left mr-1"></i>Voltar
          </router-link>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import FormLivroDescrito from './FormLivroDescrito';
import PageTitle from '../template/PageTitle';
import LivroDescrito from '../../services/livro-descrito';
import Descricoes from '../../services/descricoes';
import Loading from '../shared/Loading';
export default {
    name: 'EdicaoLivroDescrito',
    components: {FormLivroDescrito, PageTitle, Loading},
    data(){
      return {
        loader: false,
        livroDescrito: {descricoes: [], livro: {}}
      }
    },
    mounted(){
      this.getLivroDescrito(this.$route.params.idlivrodescrito);
    },
    methods:{
      async getLivroDescrito(id){
        this.loader = true;
        try{
          const res = await LivroDescrito.getLivroDescrito(id);
          this.livroDescrito = res.data;
          console.log(res.data);
        }catch(err){
          console.log(err);
        }finally{
          this.loader = false;
        }
      },
    }
}
</script>

<style>

</style>