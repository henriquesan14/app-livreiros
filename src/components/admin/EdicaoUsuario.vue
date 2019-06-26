<template>
    <div class="edit-user">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Alteração usuário"/>
        <b-card>
            <template slot="header">
                <div class="header-card" >
                    <h5 class="title-card">Alteração usuário</h5>
                    <span>Os campos marcados com (*) são obrigatórios.</span>
                    <router-link tag="b-button" class="btn-dark btn-sm mb-1" to="/dashboard/usuarios">
                        <i class="fa fa-arrow-left mr-1"></i>Voltar
                    </router-link>
                </div>
            </template>
            <Loading :loader="loader"/>
            <FormUsuario v-if="!loader" @submit-user="editUser"/>
        </b-card>
    </div>
</template>

<script>
import {showError} from '@/global';
import PageTitle from '../template/PageTitle'
import FormUsuario from './FormUsuario'
import Loading from '../shared/Loading';
import Usuario from '../../services/usuarios';
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
            try{
                const res = await Usuario.getUsuario(id);
                this.$store.dispatch('SET_USER', {user: res.data});
            }catch(err){
                showError(err)
            }finally{
                this.loader = false
            }
        },
        async editUser(user){
            try{
                await Usuario.editUsuario(user.idUsuario, user);
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
