<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="logo">
            <hr>
            <div class="auth-title">Login</div>
            <b-form @submit.prevent="handleSubmit()">
                <b-form-input 
                :class="{'is-invalid': submitted && $v.user.loginUsuario.$invalid, 'is-valid': submitted && !$v.user.loginUsuario.$invalid}"
                  type="text" v-model="user.loginUsuario" placeholder="Login" />
                
                <b-form-input
                :class="{'is-invalid': submitted && $v.user.senhaUsuario.$invalid, 'is-valid': submitted && !$v.user.senhaUsuario.$invalid}"
                 type="password" v-model="user.senhaUsuario" placeholder="Senha" />

                <button type="submit">Entrar</button>
                <Loading :loader="loader" />
            </b-form>
        </div>
    </div>
</template>

<script>
import {showError} from '@/global'
import Loading from '../components/shared/Loading'
import { required, minLength } from "vuelidate/lib/validators";
export default {
    name: 'Login',
    components: {Loading},
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
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title{
        font-size: 1.2rem;
        font-weight: 100;
        margin-top:10px;
        margin-bottom: 15px;

    }

    .auth-modal input{
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
    }
    

    .auth-modal button {
        align-self:flex-end;
        background-color: #2460ae;
        color: #fff;
        padding: 5px 15px;
    }

    .auth-modal hr{
        border: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, rgba(120,120,120, 0), rgba(120,120,120,075),rgba(120,120,120,0))
    }

</style>
