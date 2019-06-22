<template>
    <div class="cadastro-user">
        <b-form @submit.prevent="submitUser()">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.nomeUsuario)"
                     label="Nome: " label-for="nome">
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.user.nomeUsuario.$invalid, 'is-valid': submitted && !$v.user.nomeUsuario.$invalid}"  
                         id="nome" v-model="user.nomeUsuario" placeholder="Informe o nome do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.loginUsuario)"
                     label="Login: " label-for="login">
                        <b-form-input id="login" maxlength="30" 
                        :class="{'is-invalid': submitted && $v.user.loginUsuario.$invalid, 'is-valid': submitted && !$v.user.loginUsuario.$invalid}" 
                        v-model="user.loginUsuario"  placeholder="Informe o login do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row >
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.senhaUsuario)"
                     label="Senha: " label-for="senha">
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.user.senhaUsuario.$invalid, 'is-valid': submitted && !$v.user.senhaUsuario.$invalid}"
                         type="password" id="senha" v-model="user.senhaUsuario"  placeholder="Informe a senha do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.confirmSenha)"
                    label="Confirmação de senha: " label-for="confirmSenha">
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.user.confirmSenha.$invalid, 'is-valid': submitted && !$v.user.confirmSenha.$invalid}"
                         v-model="user.confirmSenha" type="password" id="confirmSenha"   placeholder="Confirme a senha do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.telefoneUsuario)"
                     label="Telefone: " label-for="telefone">
                        <the-mask :class="{'is-invalid': submitted && $v.user.telefoneUsuario.$invalid, 'is-valid': submitted && !$v.user.telefoneUsuario.$invalid}"
                         type="text" class="form-control" :mask="'(##)#####-####'" id="telefone" v-model="user.telefoneUsuario"  placeholder="Informe o telefone do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.rgUsuario)"
                     label="RG: " label-for="rg">
                        <the-mask maxlength="25" class="form-control"
                        :class="{'is-invalid': submitted && $v.user.rgUsuario.$invalid, 'is-valid': submitted && !$v.user.rgUsuario.$invalid}"
                         :mask="'###############'" id="rg" v-model="user.rgUsuario"  placeholder="Informe o RG do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.cpfUsuario)"
                     label="CPF: " label-for="cpf">
                        <the-mask class="form-control" :mask="'###.###.###-##'" :masked="false"
                        :class="{'is-invalid': submitted && $v.user.cpfUsuario.$invalid, 'is-valid': submitted && !$v.user.cpfUsuario.$invalid}"
                         type="text" id="cpf" v-model="user.cpfUsuario"   placeholder="Informe o CPF do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.emailUsuario)"
                     label="E-mail: " label-for="email">
                        <b-form-input maxlength="100" 
                        :class="{'is-invalid': submitted && $v.user.emailUsuario.$invalid, 'is-valid': submitted && !$v.user.emailUsuario.$invalid}"
                         type="email" id="email" v-model="user.emailUsuario"  placeholder="Informe o e-mail do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group 
                     :invalid-feedback="invalidFeedBack($v.user.cepUsuario)"
                     label="CEP: " label-for="cep">
                        <the-mask @blur.native="consumerCep()"  class="form-control" :mask="'#####-###'" :masked="false" 
                        :class="{'is-invalid': submitted && $v.user.cepUsuario.$invalid, 'is-valid': submitted && !$v.user.cepUsuario.$invalid}"
                         type="text" id="cep" v-model="user.cepUsuario"   placeholder="Informe o CEP do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="9" sm="9">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.ruaUsuario)"
                     label="Logradouro: " label-for="logradouro">
                        <b-form-input maxlength="100"
                        :class="{'is-invalid': submitted && $v.user.ruaUsuario.$invalid, 'is-valid': submitted && !$v.user.ruaUsuario.$invalid}" type="text" id="logradouro" v-model="user.ruaUsuario"  placeholder="Informe o logradouro do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="3">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.numeroUsuario)"
                     label="Número: " label-for="numero">
                        <the-mask 
                        :class="{'is-invalid': submitted && $v.user.numeroUsuario.$invalid, 'is-valid': submitted && !$v.user.numeroUsuario.$invalid}"
                         class="form-control" :mask="'######'" id="numero" v-model="user.numeroUsuario"   placeholder="Número" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.bairroUsuario)"
                     label="Bairro: " label-for="bairro">
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
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.idUf)"
                     label="Estado: " label-for="estado">
                        <b-form-select v-model="user.idUf" @change="loadCidades(user.idUf)" :class="{'is-invalid': submitted && $v.user.idUf.$invalid, 'is-valid': submitted && !$v.user.idUf.$invalid}">
                            <option :value="null" disabled>Selecione o estado</option>
                            <option v-for="estado in estados" :value="estado.idUf" :key="estado.idUf">{{estado.nomeUf}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group :invalid-feedback="invalidFeedBack($v.user.idCidade)"
                     label="Cidade: " label-for="cidade">
                        <b-form-select v-model="user.idCidade" :class="{'is-invalid': submitted && $v.user.idCidade.$invalid, 'is-valid': submitted && !$v.user.idCidade.$invalid}">
                            <option :value="null" disabled>Selecione a cidade</option>
                            <option v-for="cidade in cidades" :value="cidade.idCidade" :key="cidade.idCidade">{{cidade.nomeCidade}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Grupos" :invalid-feedback="invalidFeedBack($v.user.grupos)">
                        
                        <b-form-checkbox-group class="is-invalid" v-model="user.grupos" name="grupos">
                            <b-form-checkbox v-for="grupo in grupos" :key="grupo.idGrupo" :value="grupo.idGrupo">{{grupo.nomeGrupo}}</b-form-checkbox>
                        </b-form-checkbox-group>
                        <span class="text-danger text-xs" v-if="submitted && $v.user.grupos.$invalid">Selecione pelo menos um grupo</span>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button size="sm" type="submit" variant="success mr-2"><i class="fa fa-save mr-1"></i>Cadastrar</b-button>
            <router-link tag="b-button" class="btn-dark btn-sm" to="/dashboard/usuarios" type="button" variant="light"><i class="fa fa-arrow-left mr-1"></i>Voltar</router-link>
        </b-form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import Estado from '../../services/estados';
import {showError} from '@/global';
import { validationMsg } from '../../config/validation-msgs';
import WsCep from '../../services/ws-cep';
export default {
    name: 'FormUsuario',
    data(){
        return {
            submitted: false, 
            estados: [],
            cidades: []
        }
    },
    props: {
        user: {
            type: Object,
            required: true
        }, 
    },
    computed: mapGetters(['grupos']),
    validations: {
        user: {
            nomeUsuario: {
                required,
            },
            loginUsuario: {
                required,
            },
            senhaUsuario: {
                required,
                minLength: minLength(6)
            },
            confirmSenha: {required, sameAsPassword: sameAs('senhaUsuario')},
            telefoneUsuario: {required, minLength: minLength(11)},
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
            idUf: {
                required
            },
            idCidade: {
                required
            },
            grupos: {required}
        },
        
    },
    mounted(){
        this.loadEstados();
        this.$store.dispatch('GET_GRUPOS')
        .then(() => {})
        .catch(() => {});
    },
    methods:{
        async loadCidades(){
            try{
                const res = await Estado.getCidades(this.user.idUf);
                this.cidades = res.data;
            }catch(err){
                showError(err);
            }
        },
        async loadEstados(){
            try{
                const res = await Estado.getEstados();
                this.estados = res.data;
            }catch(err){
                showError(err);
            }
        },
        submitUser() {
            this.submitted = true;
            this.$v.$touch();
            if(this.$v.$invalid){
                return;
            }
            this.submitted = false;
            this.$emit('submit-user', this.user);
        },
        async consumerCep(){
            try{
                const res = await WsCep.buscaCep(this.user.cepUsuario);
                this.user.ruaUsuario = res.data.logradouro;
            }catch(err){
                showError(err);
            }
        },
        invalidFeedBack(field){
            return validationMsg(field);
        }
        
    }
}
</script>

<style scoped>
    input{
     font-size: .875rem;
    }

    select{
        font-size: .875rem;
    }

    form{
        font-size: .875rem;
    }

    .text-danger{
        font-size:80%;
    }
</style>
