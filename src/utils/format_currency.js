const formatCurrency = (value) => {
    if(value){
        return 'R$ ' + value.toFixed(2).replace('.',',');
    }
    return 'R$ 0,00';
}

export { formatCurrency };