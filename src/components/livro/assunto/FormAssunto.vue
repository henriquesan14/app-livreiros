<template>
    <div class="form-assunto">
        <b-modal size="lg" id="modal-assunto" hide-footer>
            <template slot="modal-title">
                {{assunto.idAssunto == null ? 'Novo assunto' : 'Edição assunto'}}
            </template>
            <div class="d-block">
            <b-form @submit.prevent="submitAssunto()">
                <b-row>
                    <b-col>
                        <b-form-group label="Nome: " label-for="nomeAssunto">
                            <b-form-input
                            :class="{'is-invalid': submitted && $v.assunto.nomeAssunto.$invalid, 'is-valid': submitted && !$v.assunto.nomeAssunto.$invalid}"
                             maxlength="100"
                            id="nomeAssunto" v-model="assunto.nomeAssunto" placeholder="Informe o nome do assunto" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button class="mr-2" type="submit" variant="success">Salvar</b-button>
                <b-button type="button"   @click="$bvModal.hide('modal-assunto')">Fechar</b-button>
            </b-form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { baseApiUrl, showError} from '@/global';
import axios from 'axios';
export default {
    name: 'FormAssunto',
    data(){
        return {
            submitted: false
        }
    },
    props: {
        assunto: {
            type: Object,
            required: true
        }
    },
    validations: {
        assunto: {
            nomeAssunto: {required}
        }
    },
    methods: {
        async saveAssunto(){
            const url = `${baseApiUrl}/assuntos`;
            try{
                await axios.post(url, this.assunto);
                this.reset();
                this.$bvModal.hide('modal-assunto');
                this.$toasted.global.defaultSuccess();
                this.$emit('zera-assunto');
            }catch(err){
                showError(err);
            } 
        },
        async editAssunto(){
            const url = `${baseApiUrl}/assuntos/${this.assunto.idAssunto}`;
            try{
                await axios.put(url, this.assunto);
                this.$bvModal.hide('modal-assunto');
                this.$toasted.global.defaultSuccess();
                this.$emit('zera-assunto');
            }catch(err){
                showError(err)
            }
        },
        submitAssunto() {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                
                if (this.$v.$invalid) {
                    return;
                }
                this.submitted = false;
                if(this.assunto.idAssunto){
                    this.editAssunto();
                }else{
                    this.saveAssunto();
                }
                
        },
        reset(){
            this.submitted = false; 
        }
    }
}
</script>

<style>

</style>
