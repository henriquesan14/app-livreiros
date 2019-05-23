<template>
    <div class="form-autor">
        <b-modal size="lg" id="modal-autor" hide-footer>
            <template slot="modal-title">
                {{autor.idAutor == null ? 'Novo autor' : 'Edição autor'}}
            </template>
            <div class="d-block">
            <b-form @submit.prevent="submitAutor()">
                <b-row>
                    <b-col>
                        <b-form-group label="Nome: " label-for="nomeAutor">
                            <b-form-input
                            :class="{'is-invalid': submitted && $v.autor.nomeAutor.$invalid, 'is-valid': submitted && !$v.autor.nomeAutor.$invalid}"
                             maxlength="100"
                            id="nomeAutor" v-model="autor.nomeAutor" placeholder="Informe o nome do autor" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button class="mr-2" type="submit" variant="success">Salvar</b-button>
                <b-button type="button"   @click="$bvModal.hide('modal-autor')">Fechar</b-button>
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
    name: 'FormAutor',
    data(){
        return {
            submitted: false
        }
    },
    props: {
        autor: {
            type: Object,
            required: true
        }
    },
    validations: {
        autor: {
            nomeAutor: {required}
        }
    },
    methods: {
        async saveAutor(){
            const url = `${baseApiUrl}/autores`;
            try{
                await axios.post(url, this.autor);
                this.reset();
                this.$bvModal.hide('modal-autor');
                this.$toasted.global.defaultSuccess();
                this.$emit('zera-autor');
            }catch(err){
                showError(err);
            } 
        },
         async editAutor(){
            const url = `${baseApiUrl}/autores/${this.autor.idAutor}`;
            try{
                await axios.put(url, this.autor);
                this.$bvModal.hide('modal-autor');
                this.$toasted.global.defaultSuccess();
                this.$emit('zera-autor');
            }catch(err){
                showError(err)
            }
        },
        submitAutor() {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                
                if (this.$v.$invalid) {
                    return;
                }
                this.submitted = false;
                if(this.autor.idAutor){
                    this.editAutor();
                }else{
                    this.saveAutor();
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
