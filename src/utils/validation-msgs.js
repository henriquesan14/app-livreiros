function validationMsg(field) {
    if (field.required != undefined && !field.required) {
        return 'Este campo é obrigatório';
    }
    else if (field.requiredIf != undefined && !field.requiredIf) {
        return 'Este campo é obrigatório';
    }
    else if (field.minLength != undefined && !field.minLength) {
        return `Este campo deve ter no minimo ${field.$params.minLength.min} caracteres`;
    }
    else if (field.email != undefined && !field.email) {
        return 'Este campo deve ter um email válido';
    }
    else if (field.sameAsPassword != undefined && !field.sameAsPassword) {
        return 'Senha e confirmação de senha não conferem';
    } else if (field.minValue != undefined && !field.minValue) {
        return `Este campo deve ter o valor minimo de ${field.$params.minValue.min}`
    } else if(field.validaCpf != undefined && !field.validaCpf){
        return 'CPF inválido';
    } else if(field.validaCnpj != undefined && !field.validaCnpj){
        return 'CNPJ inválido';
    }
}

export { validationMsg }