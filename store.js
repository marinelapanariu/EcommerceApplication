if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var button of removeCartItemButtons){
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var input of quantityInputs){
        input.addEventListener('click', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var button of addToCartButtons){
        button.addEventListener('click', addToCartCliked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 1){
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartCliked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row') //face elementu din cos sa fie sezat inline
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title'); //verific daca item-ul este deja in cos
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            return 
        }
    }
    var cartRowContents = `
        <div class = "cart-item cart-column">
            <img class = "cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class = "cart-item-title">${title}</span>
        </div>
        <span class = "cart-price cart-column">${price}</span>
        <div class = "cart-quantity cart-column">
            <input class = "cart-quantity-input" type = "number" value = "1">
            <button class = "btn btn-danger" type = "button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)//sterge produsele noi adaugate
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged ) //schimba cantitate evelentelor noi

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var cartRow of cartRows){
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', '')); //nu mai apare semnul $ cand calculez totalul
        var quantity = quantityElement.value;
        total = total + (price*quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

function purchaseClicked(){
    alert('Thank you for yout purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){ //goleste cosul dupa ce comanda a fost trimisa
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal(0);
}


