<template>
    <div class="user-admin">

        <b-row>
            <b-col md="10" sm="12" class="mb-3">
                <b-input-group>
                    <b-form-input v-model="nome" @keydown.enter="loadUsers()" type="text" placeholder="Pesquise o nome do usuário..." />
                    <b-input-group-append>
                        <b-button @click="loadUsers()" variant="primary"><i class="fa fa-search"></i></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-table hover striped :items="pageUsers.rows" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-arrow-circle-up"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="pageUsers.count" :per-page="10"></b-pagination>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UserAdmin',
    data(){
        return {
            user: {},
            pageUsers: {},
            page: 1,
            nome: '',
            fields: [
                {key: 'idUsuario', label: 'Cód.', sortable: true},
                {key: 'nomeUsuario', label: 'Nome', sortable: true},
                {key: 'loginUsuario', label: 'Login', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    watch:{
        page(){
            this.loadUsers()
        }
    },
    mounted(){
        this.loadUsers();
    },
    methods:{
        loadUsers(){
            const url = `http://localhost:3000/usuarios?pagina=${this.page -1}&nome=${this.nome}`;
            axios.get(url).then(res => {
                this.pageUsers = res.data;
                }).catch(err => console.log(err))
        },
        loadUser(user){
            this.user = {...user};
        }
    }
}
</script>

<style>

</style>
