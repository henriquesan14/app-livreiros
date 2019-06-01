<template>
    <div class="edit-user">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Alteração usuário"/>
        <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">Voltar</router-link>
        <b-card header="Alterar usuário">
            <Loading :loader="loader"/>
            <FormEditUsuario v-if="!loader"  :user="user" @submit-user="editUser()"/>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';
import PageTitle from '../template/PageTitle'
import FormEditUsuario from './FormEditUsuario'
import Loading from '../shared/Loading'
export default {
    name: 'EdicaoUsuario',
    components: {PageTitle, FormEditUsuario, Loading},
    data(){
        return {
            user: {
                idUf: null,
                idCidade: null,
                cidade: {estado:{}},
                grupos: []
            }, 
            loader: false
        }
    },
    mounted(){
        this.getUser(this.$route.params.id);
    },
    methods:{
        async getUser(id){
            this.loader = true;
            const url = `${baseApiUrl}/usuarios/${id}`;
            try{
                const res = await axios.get(url);
                this.convertUser(res.data)
            }catch(err){
                showError(err)
            }finally{
                this.loader = false
            }
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
