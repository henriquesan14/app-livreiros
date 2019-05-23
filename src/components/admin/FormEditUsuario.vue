<template>
    <div class="cadastro-user">
        <b-form @submit.prevent="submitUser()">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome: " label-for="nome">
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.user.nomeUsuario.$invalid, 'is-valid': submitted && !$v.user.nomeUsuario.$invalid}"  
                         id="nome" v-model="user.nomeUsuario" placeholder="Informe o nome do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Login: " label-for="login">
                        <b-form-input id="login" maxlength="30" 
                        :class="{'is-invalid': submitted && $v.user.loginUsuario.$invalid, 'is-valid': submitted && !$v.user.loginUsuario.$invalid}" 
                        v-model="user.loginUsuario"  placeholder="Informe o login do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row >
                <b-col md="6" sm="12">
                    <b-form-group label="Nova Senha: " label-for="senha">
                        <b-form-input maxlength="100"
                         type="password" id="senha" v-model="user.senhaUsuario"  placeholder="Informe a senha do usuário" />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Telefone: " label-for="telefone">
                        <the-mask maxlength="100"
                         type="text" class="form-control" :mask="'(##)#####-####'" id="telefone" v-model="user.telefoneUsuario"  placeholder="Informe o telefone do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="RG: " label-for="rg">
                        <the-mask maxlength="25" class="form-control"
                        :class="{'is-invalid': submitted && $v.user.rgUsuario.$invalid, 'is-valid': submitted && !$v.user.rgUsuario.$invalid}"
                         :mask="'###############'" id="rg" v-model="user.rgUsuario"  placeholder="Informe o RG do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CPF: " label-for="cpf">
                        <the-mask class="form-control" :mask="'###.###.###-##'" :masked="false"
                        :class="{'is-invalid': submitted && $v.user.cpfUsuario.$invalid, 'is-valid': submitted && !$v.user.cpfUsuario.$invalid}"
                         type="text" id="cpf" v-model="user.cpfUsuario"   placeholder="Informe o CPF do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail: " label-for="email">
                        <b-form-input maxlength="100" 
                        :class="{'is-invalid': submitted && $v.user.emailUsuario.$invalid, 'is-valid': submitted && !$v.user.emailUsuario.$invalid}"
                         type="email" id="email" v-model="user.emailUsuario"  placeholder="Informe o e-mail do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CEP: " label-for="cep">
                        <the-mask class="form-control" :mask="'#####-###'" :masked="false"
                        :class="{'is-invalid': submitted && $v.user.cepUsuario.$invalid, 'is-valid': submitted && !$v.user.cepUsuario.$invalid}"
                         type="text" id="cep" v-model="user.cepUsuario"   placeholder="Informe o CEP do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="9" sm="9">
                    <b-form-group label="Logradouro: " label-for="logradouro">
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.user.ruaUsuario.$invalid, 'is-valid': submitted && !$v.user.ruaUsuario.$invalid}" type="text" id="logradouro" v-model="user.ruaUsuario"  placeholder="Informe o logradouro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="3">
                    <b-form-group label="Número: " label-for="numero">
                        <the-mask 
                        :class="{'is-invalid': submitted && $v.user.numeroUsuario.$invalid, 'is-valid': submitted && !$v.user.numeroUsuario.$invalid}"
                         class="form-control" :mask="'######'" id="numero" v-model="user.numeroUsuario"   placeholder="Número" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Bairro: " label-for="bairro">
                        <b-form-input maxlength="50"
                        :class="{'is-invalid': submitted && $v.user.bairroUsuario.$invalid, 'is-valid': submitted && !$v.user.bairroUsuario.$invalid}"
                         type="text" id="bairro" v-model="user.bairroUsuario"  placeholder="Informe o bairro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Complemento: " label-for="complemento">
                        <b-form-input maxlength="50"
                         type="text" id="complemento" v-model="user.complementoUsuario"   placeholder="Informe o complemento do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Estado: " label-for="estado">
                        <b-form-select v-model="user.idUf" @change="loadCidades(user.idUf)" >
                            <option :value="null" disabled>Selecione o estado</option>
                            <option v-for="estado in estados" :value="estado.idUf" :key="estado.idUf">{{estado.nomeUf}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Cidade: " label-for="cidade">
                        <b-form-select v-model="user.idCidade" >
                            <option :value="null" disabled>Selecione a cidade</option>
                            <option v-for="cidade in cidades" :value="cidade.idCidade" :key="cidade.idCidade">{{cidade.nomeCidade}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Grupos">
                        <span class="text-danger" v-if="submitted && $v.user.grupos.$invalid">Selecione pelo menos um grupo</span>
                        <b-form-checkbox-group class="is-invalid" v-model="user.grupos" name="grupos">
                            <b-form-checkbox v-for="grupo in grupos" :key="grupo.idGrupo" :value="grupo.idGrupo">{{grupo.nomeGrupo}}</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button type="submit" variant="success mr-2">Cadastrar</b-button>
            <router-link @click="zeraUser()" tag="b-button" class="btn-dark" to="/dashboard/usuarios" type="button" variant="light">Voltar</router-link>
        </b-form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
    name: 'FormEditUsuario',
    data(){
        return {
            submitted: false
        }
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    computed: mapGetters(['estados', 'cidades', 'grupos']),
    validations: {
        user: {
            nomeUsuario: {
                required,
            },
            loginUsuario: {
                required,
            },
            rgUsuario: {
                required,
            },
            cpfUsuario: {
                required,
                minLength: minLength(11)
            },
            emailUsuario: {
                required,
                email
            },
            cepUsuario: {
                required,
                minLength: minLength(8)
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
            grupos: {required}
        },
        
    },
    mounted(){
        this.$store.dispatch('GET_ESTADOS')
        .then(() => {})
            .catch(() => {});
        this.$store.dispatch('GET_GRUPOS')
        .then(() => {})
        .catch(() => {});  
    },
    created(){
        this.$store.dispatch('GET_CIDADES', {id: this.user.idUf})
            .then(() => {})
            .catch(() => {})
    },
    methods:{
        loadCidades(){
            this.$store.dispatch('GET_CIDADES', {id: this.user.idUf})
            .then(() => {})
            .catch(() => {})
        },
        zeraUser(){
            this.user = {grupos: [], idUf: null, idCidade: null};
            this.submitted = false;
            this.$store.dispatch('RESET_CIDADES')
        },
        submitUser() {
                this.submitted = true;
                this.$v.$touch();
                if(this.$v.$invalid){
                    return;
                }
                this.submitted = false;
                this.$emit('submit-user')
        }
    }
}
</script>

<style>

</style>
