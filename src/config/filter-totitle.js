import Vue from 'vue';

Vue.filter('toTitle', function(valor) {
    return valor.toLowerCase().replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
})