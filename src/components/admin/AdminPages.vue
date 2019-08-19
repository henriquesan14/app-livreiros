<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Gerenciar Usuários"/>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab active title="Usuários">
                        <UserAdmin />
                    </b-tab>
                    <b-tab @click="getGrupos" title="Grupos">
                        <GrupoAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'
import GrupoAdmin from './GrupoAdmin'

export default {
    name: 'AdminPages',
    components: {PageTitle, UserAdmin, GrupoAdmin},
    methods: {
        async getGrupos(){
            try{
                await this.$store.dispatch('GET_GRUPOS');
            }catch(e){
                () => {}
            }
        }
    }
}
</script>

<style>

</style>
