const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Показать или скрыть содержимое корзины

document.querySelector('.cart__button').addEventListener('click', () => {
    document.querySelector('.cart__box').classList.toggle('invisible')
})



document.querySelector('.goods__list').addEventListener('click', event => {
    if (!event.target.classList.contains('cart_item')) {
        return;
    }
    productsEl.innerHTML = products[event.target.dataset.type]
        .map(product => product.getProductMarkup()).join('');
});


// класс Корзина
class CartBox {
    constructor(el) {
        this.goods = [];
        this.targetElement = el;
    }
    // добавить товар в корзину
    addProduct(product) {
        let cartitem = getProduct(product.id);
        if (!cartitem) {
            this.goods.push(new CartBoxItem(product))
        } else {
            cartitem.quantity++
        }
    }

    // удалить товар из корзины
    removeProduct() {
        let cartitem = getProduct(product.id);
        if (!cartitem) {
            this.goods.pop(new CartBoxItem(product))
        } else {
            cartitem.quantity--
        }
    }

    // получить указанный товар в корзине
    getProduct(id_product) {
        return this.goods.find((element) => { element.product.id == id_product });
    }

    // создать html разметку корзины
    render() {
        return
        `   <div class="cart_item">
            <div class="cart_item_name">${this.name}</div>
            <div class="cart_item_price">${this.price}</div>
            <span>x</span>
            <div class="cart_item_quant">${this.quantity}</div>
            <div class="cart_item_price_total">${this.total_price}</div>
            <div class="cart_item_del">x</div>
        </div>`
    }
}


class CartBoxItem {
    constructor(product) {
        this.product = product;
        this.quantity = 1;
        this.total_price = product.price * this.quantity;
    }
}


// класс Товар
class Product {
    constructor(id_product, product_name, price) {
        this.id = id_product;
        this.name = product_name;
        this.price = price;
    }

    render() {
        return `<div class="goods__item"
                  data-id="${this.id}" 
                  data-name="${this.name}" 
                  data-price="${this.price}">
                  <h3>${this.name}</h3>
                  <p>${this.price} $</p>
                </div>`
    }
}

// класс список товаров
class ProductsList {
    constructor(url, el) {
        this.goods = [];
        this.targetElement = el;
        this.sourceUrl = url;
        this.fetchGoods().then(() => this.render());
    }

    // получить список товаров по ссылке
    fetchGoods() {
        return new Promise((res, rej) => {
            fetch(this.sourceUrl).then((resp) => {
                resp.json().then((data) => {
                    this.goods = data.map(element => {
                        return new Product(element.id_product, element.product_name, element.price)
                    });
                    res();
                })
            });
        });
    }

    // отобразить список товаров на странице
    render() {
        this.targetElement.innerHTML = this.goods.map(el => el.render()).join('');
    }

}

let products = new ProductsList(`${API}/catalogData.json`, document.querySelector('.goods__list'));
let cartbox = new CartBox(document.querySelector('.cart__box'));


