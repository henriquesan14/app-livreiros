<template>
    <div class="edit-user">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Alteração usuário"/>
        <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios"><i class="fa fa-arrow-left mr-1"></i>Voltar</router-link>
        <b-card header="Alterar usuário">
            <Loading :loader="loader"/>
            <FormUsuario v-if="!loader" @submit-user="editUser"/>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';
import PageTitle from '../template/PageTitle'
import FormUsuario from './FormUsuario'
import Loading from '../shared/Loading'
export default {
    name: 'EdicaoUsuario',
    components: {PageTitle, FormUsuario, Loading},
    data(){
        return {
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
                this.$store.dispatch('SET_USER', {user: res.data});
            }catch(err){
                showError(err)
            }finally{
                this.loader = false
            }
        },
        editUser(user){
            const url = `${baseApiUrl}/usuarios/${user.idUsuario}`;
            axios.put(url, user).then(() => {
                this.$toasted.global.defaultSuccess();
                this.$router.push('/dashboard/usuarios');
            }).catch(showError)
        }
    }
}
</script>

<style>

</style>
