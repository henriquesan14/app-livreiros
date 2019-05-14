<template>
    <div class="cadastro-user">
        <b-form @submit.prevent="handleSubmit">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome: " label-for="nome">
                        <b-form-input 
                        :class="{'is-invalid': submitted && $v.user.nomeUsuario.$invalid, 'is-valid': submitted && !$v.user.nomeUsuario.$invalid}"  
                         id="nome" v-model="user.nomeUsuario" placeholder="Informe o nome do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Login: " label-for="login">
                        <b-form-input id="login" 
                        :class="{'is-invalid': submitted && $v.user.loginUsuario.$invalid, 'is-valid': submitted && !$v.user.loginUsuario.$invalid}" 
                        v-model="user.loginUsuario"  placeholder="Informe o login do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Senha: " label-for="senha">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.senhaUsuario.$invalid, 'is-valid': submitted && !$v.user.senhaUsuario.$invalid}"
                         type="password" id="senha" v-model="user.senhaUsuario"  placeholder="Informe a senha do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de senha: " label-for="confirmSenha">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.confirmSenha.$invalid, 'is-valid': submitted && !$v.user.confirmSenha.$invalid}"
                         v-model="user.confirmSenha" type="password" id="confirmSenha"   placeholder="Confirme a senha do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="RG: " label-for="rg">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.rgUsuario.$invalid, 'is-valid': submitted && !$v.user.rgUsuario.$invalid}"
                         type="text" id="rg" v-model="user.rgUsuario"  placeholder="Informe o RG do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CPF: " label-for="cpf">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.cpfUsuario.$invalid, 'is-valid': submitted && !$v.user.cpfUsuario.$invalid}"
                         type="text" id="cpf" v-model="user.cpfUsuario"   placeholder="Informe o CPF do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail: " label-for="email">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.emailUsuario.$invalid, 'is-valid': submitted && !$v.user.emailUsuario.$invalid}"
                         type="email" id="email" v-model="user.emailUsuario"  placeholder="Informe o e-mail do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CEP: " label-for="cep">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.cepUsuario.$invalid, 'is-valid': submitted && !$v.user.cepUsuario.$invalid}"
                         type="text" id="cep" v-model="user.cepUsuario"   placeholder="Informe o CEP do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="9" sm="9">
                    <b-form-group label="Logradouro: " label-for="logradouro">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.ruaUsuario.$invalid, 'is-valid': submitted && !$v.user.ruaUsuario.$invalid}" type="text" id="logradouro" v-model="user.ruaUsuario"  placeholder="Informe o logradouro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="3">
                    <b-form-group label="Número: " label-for="numero">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.numeroUsuario.$invalid, 'is-valid': submitted && !$v.user.numeroUsuario.$invalid}"
                         type="number" id="numero" v-model.number="user.numeroUsuario"   placeholder="Número" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Bairro: " label-for="bairro">
                        <b-form-input
                        :class="{'is-invalid': submitted && $v.user.bairroUsuario.$invalid, 'is-valid': submitted && !$v.user.bairroUsuario.$invalid}"
                         type="text" id="bairro" v-model="user.bairroUsuario"  placeholder="Informe o bairro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Complemento: " label-for="complemento">
                        <b-form-input
                         type="text" id="complemento" v-model="user.complementoUsuario"   placeholder="Informe o complemento do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Estado: " label-for="estado">
                        <b-form-select v-model="user.estadoUsuario" @change="loadCidades(user.estadoUsuario)" :class="{'is-invalid': submitted && $v.user.estadoUsuario.$invalid, 'is-valid': submitted && !$v.user.estadoUsuario.$invalid}">
                            <option :value="null" disabled>Selecione o estado</option>
                            <option v-for="estado in estados" :value="estado.idUf" :key="estado.idUf">{{estado.nomeUf}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Cidade: " label-for="cidade">
                        <b-form-select v-model="user.cidadeUsuario" :class="{'is-invalid': submitted && $v.user.cidadeUsuario.$invalid, 'is-valid': submitted && !$v.user.cidadeUsuario.$invalid}">
                            <option :value="null" disabled>Selecione a cidade</option>
                            <option v-for="cidade in cidades" :value="cidade.idCidade" :key="cidade.idCidade">{{cidade.nomeCidade}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button type="submit" variant="success mr-2">Cadastrar</b-button>
            <b-button variant="danger mr-2" @click="reset()">Limpar</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';
import {showError, baseApiUrl} from '@/global';
import {mapGetters} from 'vuex'
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
export default {
    name: 'CadastroUsuario',
    data(){
        return {
            user: {},
            confirmSenha: '',
            submitted: false,
        }
    },
    computed: mapGetters(['estados', 'cidades']),
    validations: {
        user: {
            nomeUsuario: {
                required,
                maxLength: maxLength(50)
            },
            loginUsuario: {
                required,
                maxLength: maxLength(50)
            },
            senhaUsuario: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(50)
            },
            confirmSenha: {required, maxLength: maxLength(50), sameAsPassword: sameAs('senhaUsuario')},
            rgUsuario: {
                required,
                maxLength: maxLength(15)
            },
            cpfUsuario: {
                required,
                maxLength: maxLength(14),
                minLength: minLength(14)
            },
            emailUsuario: {
                required,
                email
            },
            cepUsuario: {
                required,
                maxLength: maxLength(9),
                minLength: minLength(9)
            },
            ruaUsuario: {
                required
            },
            numeroUsuario: {
                required
            },
            bairroUsuario: {
                required
            },
            estadoUsuario: {
                required
            },
            cidadeUsuario: {
                required
            }
        },
        
        
    },
    mounted(){
        this.$store.dispatch('GET_ESTADOS')
        .then(() => {})
            .catch(() => {})
    },
    methods:{
        loadCidades(){
            this.$store.dispatch('GET_CIDADES', {id: this.user.estadoUsuario})
            .then(() => {})
            .catch(() => {})
        },
        save(){
            const url = `${baseApiUrl}/usuarios`;
            axios.post(url, this.user).then(() => {
                this.reset();
                this.$toasted.global.defaultSuccess();
            }).catch(showError)
        },
        reset(){
            this.user = {};
            this.submitted = false;
            this.$store.dispatch('RESET_CIDADES')
        },
        handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.submitted = false;
                delete this.user.estadoUsuario
                delete this.user.confirmSenha
                this.save();
        }
    }
}
</script>

<style>

</style>
