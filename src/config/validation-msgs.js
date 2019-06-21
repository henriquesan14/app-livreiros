function validationMsg(field) {
    if(field.required != undefined && !field.required){
        return 'Este campo é obrigatório';
    }
    else if(field.minLength != undefined && !field.minLength){
        return `Este campo deve ter no minimo ${field.$params.minLength.min} caracteres`;
    }
    else if(field.email != undefined && !field.email){
        return 'Este campo deve ter um email válido';
    }
    else if(field.sameAsPassword != undefined && !field.sameAsPassword){
        return 'Senha e confirmação de senha não conferem';
    }
}

export { validationMsg }