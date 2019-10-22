import Vue from 'vue'
import { userKey } from '@/global'

Vue.directive('hasRole', function (el, binding) {
    let roles = JSON.parse(localStorage.getItem(userKey)).user.permissoes;
    if (!roles.includes(binding.value)) {
        el.style.display = 'none';
        el.remove();
    }
})