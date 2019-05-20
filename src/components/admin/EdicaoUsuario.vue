<template>
    <div class="edit-user">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Alteração usuário"/>
        <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">Voltar</router-link>
        <b-card header="Alterar usuário">
            <FormEditUsuario  :user="user" @submit-user="editUser()"/>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';
import PageTitle from '../template/PageTitle'
import FormEditUsuario from './FormEditUsuario'
export default {
    name: 'EdicaoUsuario',
    components: {PageTitle, FormEditUsuario},
    data(){
        return {
            user: {
                idUf: null,
                idCidade: null,
                grupos: []
            }, 
            loader: false
        }
    },
    mounted(){
        this.getUser(this.$route.params.id);
    },
    methods:{
        getUser(id){
            this.loader = true;
            const url = `${baseApiUrl}/usuarios/${id}`;
            axios.get(url).then(res => this.convertUser(res.data))
            .catch(() => {}).finally( this.loader = false);
        },
        convertUser(user){
            this.user = user;
            this.user.grupos = user.grupos.map(x => x.idGrupo);
        },
        editUser(){
            const url = `${baseApiUrl}/usuarios/${this.user.idUsuario}`;
            axios.put(url, this.user).then(() => {
                this.$toasted.global.defaultSuccess();
                this.$router.push('/dashboard/usuarios');
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
