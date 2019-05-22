<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="logo">
            <hr>
            <b-form @submit.prevent="handleSubmit()" class="login-form">
                <b-row class="mb-2">
                    <b-col>
                        <b-input-group>
                            <b-input-group-prepend is-text><i class="fa fa-user"></i></b-input-group-prepend>
                         <b-form-input 
                            :class="{'is-invalid': submitted && $v.user.loginUsuario.$invalid, 'is-valid': submitted && !$v.user.loginUsuario.$invalid}"
                            type="text" v-model="user.loginUsuario" placeholder="Login" />
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row class="mb-2">
                    <b-col>
                        <b-input-group>
                            <b-input-group-prepend is-text><i class="fa fa-lock"></i></b-input-group-prepend>
                            <b-form-input
                            :class="{'is-invalid': submitted && $v.user.senhaUsuario.$invalid, 'is-valid': submitted && !$v.user.senhaUsuario.$invalid}"
                            type="password" v-model="user.senhaUsuario" placeholder="Senha"
                             />
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-button block type="submit" variant="primary">Entrar
                    <b-spinner v-if="loader" small class="ml-1"></b-spinner>
                    <span class="sr-only">Loading...</span>
                </b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
import {showError} from '@/global'
import { required, minLength } from "vuelidate/lib/validators";
export default {
    name: 'Login',
    data(){
        return {
            user: {},
            loader: false,
            submitted: false,
        }
    },
    methods: {
        signIn(){
            this.loader = true;
            this.$store.dispatch('LOGIN', this.user)
            .then(() => {
                this.$router.push('/dashboard/home')
            })
            .catch(showError)
            .finally(() => this.loader = false)
        },
        handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.submitted = false;
                this.signIn();
        }
    },
    validations: {
        user: {
            loginUsuario: {required},
            senhaUsuario: {required, minLength: minLength(6)}
        }
    }
}
</script>

<style>
    .auth-content{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .auth-modal{
        background-color: #fff;
        width: 400px;
        padding: 50px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login-form{
        width: 100%;
    }
   
    .auth-modal hr{
        border: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, rgba(120,120,120, 0), rgba(120,120,120,075),rgba(120,120,120,0))
    }

</style>
