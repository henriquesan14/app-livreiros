<template>
    <div class="cadastro-user">
        <b-form>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome: " label-for="nome">
                        <b-form-input  name="nomeUsuario"
                         id="nome" :state="!$v.user.nomeUsuario.invalid && !$v.user.nomeUsuario.dirty ? null : false" v-model="user.nomeUsuario" placeholder="Informe o nome do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Login: " label-for="login">
                        <b-form-input id="login" v-model="user.loginUsuario" required placeholder="Informe o login do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Senha: " label-for="senha">
                        <b-form-input type="password" id="senha" v-model="user.senhaUsuario" required placeholder="Informe a senha do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de senha: " label-for="confirmSenha">
                        <b-form-input v-model="confirmSenha" type="password" id="confirmSenha"  required placeholder="Confirme a senha do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="RG: " label-for="rg">
                        <b-form-input type="text" id="rg" v-model="user.rgUsuario" required placeholder="Informe o RG do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CPF: " label-for="cpf">
                        <b-form-input type="text" id="cpf" v-model="user.cpfUsuario"  required placeholder="Informe o CPF do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail: " label-for="email">
                        <b-form-input type="email" id="email" v-model="user.emailUsuario" required placeholder="Informe o e-mail do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CEP: " label-for="cep">
                        <b-form-input type="text" id="cep" v-model="user.cepUsuario"  required placeholder="Informe o CEP do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="9" sm="9">
                    <b-form-group label="Logradouro: " label-for="logradouro">
                        <b-form-input type="text" id="logradouro" v-model="user.ruaUsuario" required placeholder="Informe o logradouro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="3">
                    <b-form-group label="Nº: " label-for="numero">
                        <b-form-input type="number" id="numero" v-model.number="user.numeroUsuario"  required placeholder="Nº" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Bairro: " label-for="bairro">
                        <b-form-input type="text" id="bairro" v-model="user.bairroUsuario" required placeholder="Informe o bairro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Complemento: " label-for="complemento">
                        <b-form-input type="text" id="complemento" v-model="user.complementoUsuario"  required placeholder="Informe o complemento do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Estado: " label-for="estado">
                        <b-form-select v-model="estadoSelecionado" @change="loadCidades(estadoSelecionado)">
                            <option :value="null" disabled>Selecione o estado</option>
                            <option v-for="estado in estados" :value="estado.idUf" :key="estado.idUf">{{estado.nomeUf}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Cidade: " label-for="cidade">
                        <b-form-select v-model="user.cidadeUsuario">
                            <option :value="null" disabled>Selecione a cidade</option>
                            <option v-for="cidade in cidades" :value="cidade.idCidade" :key="cidade.idCidade">{{cidade.nomeCidade}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button  @click="save()" variant="success mr-2">Cadastrar</b-button>
            <b-button variant="danger mr-2" @click="reset()">Limpar</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';
import {mapGetters} from 'vuex'
import { required} from "vuelidate/lib/validators";
export default {
    name: 'CadastroUsuario',
    data(){
        return {
            user: {},
            confirmSenha: '',
            estadoSelecionado: null
        }
    },
    computed: mapGetters(['estados', 'cidades']),
    validations: {
        user: {
            nomeUsuario: {
                required
            }
        }
    },
    mounted(){
        this.$store.dispatch('GET_ESTADOS')
        .then(() => {})
            .catch(() => {})
    },
    methods:{
        loadCidades(){
            this.$store.dispatch('GET_CIDADES', {id: this.estadoSelecionado})
            .then(() => {})
            .catch(() => {})
        },
        save(){
            console.log(this.$v.user.nomeUsuario)
            const url = `${baseApiUrl}/usuarios`;
            axios.post(url, this.user).then(() => {
                this.reset();
                this.$toasted.global.defaultSuccess();
            }).catch(showError)
        },
        reset(){
            this.user = {};
            this.estadoSelecionado = null;
            this.confirmSenha=  '';
            this.$store.dispatch('RESET_CIDADES')
        }
        
    }
}
</script>

<style>

</style>
