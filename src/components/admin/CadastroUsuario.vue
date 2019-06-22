<template>
    <div class="cadastro-user">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro usuário"/>
        <b-card >
            <template slot="header">
                <div class="header-card" >
                    <h5 class="title-card">Novo usuário</h5>
                    <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">
                        <i class="fa fa-arrow-left mr-1"></i>Voltar
                    </router-link>
                </div>
            </template>
            <FormUsuario :user="user" @submit-user="saveUser"/>
        </b-card>
    </div>
</template>

<script>
import Usuario from '../../services/usuarios';
import {showError} from '@/global';
import PageTitle from '../template/PageTitle'
import FormUsuario from './FormUsuario';
export default {
    name: 'CadastroUsuario',
    components: {PageTitle, FormUsuario},
    data(){
        return {
            user: {
                idUf: null,
                idCidade: null,
                grupos: []
            }
        }
    },
    methods:{
        async saveUser(user){
            try{
                await Usuario.saveUsuario(user);
                this.$toasted.global.defaultSuccess();
                this.$router.push('/dashboard/usuarios');
            }catch(err){
                showError(err);   
            }
        }
    }
}
</script>

<style scoped>
.header-card{
    display:flex;
    justify-content:space-between;
    align-items: center;
}
    
</style>
