const createOrClearCart = () => {
    let cart = { livrosDescritos: [] };
    setCart(cart);
    return cart;
}

const getCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = createOrClearCart();
    }
    return cart;
}

const setCart = (cartJson) => {
    localStorage.setItem('cart', JSON.stringify(cartJson));
}

const addLivro = (livro) => {
    let cart = getCart();
    let livroBuscado = cart.livrosDescritos.find(x => x.livro.idLivroDescrito == livro.idLivroDescrito);
    if (!livroBuscado) {
        cart.livrosDescritos.push({ qtdLivroDescrito: 1, idLivroDescrito: livro.idLivroDescrito, livro: livro });
    }else{
        livroBuscado.qtdLivroDescrito++;
    }
    setCart(cart);
    return cart;
}

const removeLivro = (item) => {
    let cart = getCart();
    let position = cart.livrosDescritos.findIndex(x => x.idLivroDescrito == item.idLivroDescrito);
    if (position != -1) {
        cart.livrosDescritos.splice(position, 1);
    }
    setCart(cart);
    return cart;
}

const increaseQuantity = (item) => {
    let cart = getCart();
    let position = cart.livrosDescritos.findIndex(x => x.idLivroDescrito == item.idLivroDescrito);
    if (position != -1) {
        cart.livrosDescritos[position].qtdLivroDescrito++;
    }
    setCart(cart);
    return cart;
}

const setQuantity = (item, qtd) => {
    let cart = getCart();
    let position = cart.livrosDescritos.findIndex(x => x.idLivroDescrito == item.idLivroDescrito);
    if (position != -1) {
        cart.livrosDescritos[position].qtdLivroDescrito = qtd;
    }
    setCart(cart);
    return cart;
}

const setPrice = (item, preco) => {
    let cart = getCart();
    let position = cart.livrosDescritos.findIndex(x => x.idLivroDescrito == item.idLivroDescrito);
    if (position != -1) {
        cart.livrosDescritos[position].livro.precoLivroDescrito = preco;
    }
    setCart(cart);
    return cart;
}

const decreaseQuantity = (item) => {
    let cart = getCart();
    let position = cart.livrosDescritos.findIndex(x => x.idLivroDescrito == item.idLivroDescrito);
    if (position != -1) {
        cart.livrosDescritos[position].qtdLivroDescrito--;
        if (cart.livrosDescritos[position].qtdLivroDescrito < 1) {
            cart = removeLivro(item);
        }
    }
    setCart(cart);
    return cart;
}


export { getCart, addLivro, removeLivro, increaseQuantity, decreaseQuantity, setQuantity, setPrice, setCart };

