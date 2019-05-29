import Vue from 'vue'
export const userKey = '__sgsl_user'
export const baseApiUrl = 'http://3.218.79.22/sgsl-api'

export function showError(e){
    if(e && e.response && e.response.data){
        Vue.toasted.global.defaultError({msg: e.response.data.message})
    }else if(typeof e === 'string'){
        Vue.toasted.global.defaultError({msg: e})
    }else{
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }