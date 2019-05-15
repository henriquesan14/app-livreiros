<template>
    <div class="user-admin">

        <b-row>
            <b-col md="12" sm="12" class="mb-3">
                <b-input-group>
                    <b-form-input v-model="nome" @keydown.enter="getUsers()" type="text" placeholder="Pesquise o nome do usuário..." />
                    <b-input-group-append>
                        <b-button @click="getUsers()" variant="primary"><i class="fa fa-search"></i></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-table v-if="!loader && pageUsers.rows.length > 0" hover striped :items="pageUsers.rows" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="dark" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-users"></i>
                </b-button>
                <b-button :variant="data.item.statusUsuario == true ? 'danger': 'success'" @click="showMsgBoxTwo(data.item);" class="mr-2">
                    <i class="fas":class="data.item.statusUsuario == true ? 'fa-lock':'fa-lock-open'" ></i>
                </b-button>
            </template>
        </b-table>
        <div v-if="!loader && pageUsers.rows.length < 1" class="mb-2">
            <span>Nenhum resultado...</span>
        </div>
        <Loading :loader="loader" />
        <b-pagination size="md" v-model="page" :total-rows="pageUsers.count" :per-page="10"></b-pagination>
    </div>
</template>

<script>
import { mapGetters}  from 'vuex'
import Loading from '../shared/Loading'
import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    name: 'UserAdmin',
    components: {Loading},
    data(){
        return {
            user: {},
            page: 1,
            nome: '',
            loader: false,
            fields: [
                {key: 'idUsuario', label: 'Cód.', sortable: true},
                {key: 'nomeUsuario', label: 'Nome', sortable: true},
                {key: 'loginUsuario', label: 'Login', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            boxTwo: ''
        }
    },

    watch:{
        page(){
            this.getUsers()
        }
    },
    computed: mapGetters(['pageUsers']),
    mounted(){
        this.getUsers();
    },
    methods:{
        async getUsers(){
            this.loader = true;
        try{
            await this.$store.dispatch('GET_USERS', {nome: this.nome, page: this.page -1});
        }catch(err){
            () => {}
        }finally{
            this.loader = false;
        }     
        },
        loadUser(user){
            this.user = {...user};
        },
        showMsgBoxTwo(user) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm(`Tem certeza que deseja ativar/desativar o usuário ${user.idUsuario}?` , {
          title: 'Por favor confirme',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then((res) => {
              if(res){
                  this.statusUser(user.idUsuario);
              }
          })
          .catch(err => {
            
          })
      },
      statusUser(idUsuario){
          const url = `${baseApiUrl}/usuarios/${idUsuario}/status`;
          axios.put(url).then(res => {
              this.getUsers();
              this.$toasted.global.defaultSuccess();
          }).catch(showError)
      }
    }
}
</script>

<style>

</style>
