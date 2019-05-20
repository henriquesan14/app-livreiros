<template>
    <div class="cadastro-user">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro usuário"/>
        <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">Voltar</router-link>
        <b-card header="Novo usuário">
            <FormUsuario :user="user" @submit-user="saveUser()"/>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';
import PageTitle from '../template/PageTitle'
import FormUsuario from './FormUsuario'
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
        saveUser(){
            const url = `${baseApiUrl}/usuarios`;
            axios.post(url, this.user).then(() => {
                this.$toasted.global.defaultSuccess();
                this.zeraUser();
            }).catch(showError)
        },
        zeraUser(){
            this.user = {grupos: [], idUf: null, idCidade: null};
            this.$store.dispatch('RESET_CIDADES')
        }
    }
}
</script>

<style>

</style>
