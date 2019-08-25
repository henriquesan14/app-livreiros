<template>
  <div>
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Alteração grupo"/>
        <b-card >
            <template slot="header">
                <div class="header-card" >
                    <h5 class="title-card">Alteração grupo</h5>
                    <span>Os campos marcados com (*) são obrigatórios.</span>
                    <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">
                        <i class="fa fa-arrow-left mr-1"></i>Voltar
                    </router-link>
                </div>
            </template>
            <FormGrupo/>
        </b-card>
  </div>
</template>

<script>
import FormGrupo from './FormGrupo';
import PageTitle from '../template/PageTitle';
export default {
  name: "EdicaoGrupo",
  components: {FormGrupo, PageTitle},
  data() {
    return {
      
    };
  }
};
</script>
    
<style>

</style>
