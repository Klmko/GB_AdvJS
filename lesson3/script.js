const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div
class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

/* Вторым классом будет список товаров GoodsList.В качестве свойства добавим массив со списком
товаров, но изначально сделаем его пустым*/

class GoodsList {
    constructor() {
        this.goods = [];
    }

    /*метод fetchGoods для заполнения списка из json файла по ссылке */
    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`).then(
            (goods) => {
                this.goods = JSON.parse(goods);
            });
    }
    // метод для создания HTML разметки для списка
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    priceGoods() {
        const sumGoods = (acc, good) => acc + good.price;
        this.goods.reduce(sumGoods, 0);
        return
    }

}

/*Теперь, чтобы вывести список, нужно создать экземпляр класса GoodsList, вызвать для него метод
fetchGoods, чтобы записать список товаров в свойство goods, и вызвать render().*/

const list = new GoodsList();
list.fetchGoods().then(
    () => {
        list.render();
    });


class Basket {
    addGood(good) {
        this.goods.push(good);
    }

    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    changeGood() {
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this._getBasketItem();
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }
    _clickBasket() {
        document.querySelector(".cart-button").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}

class ElemBasket {
    constructor() {
    }

}

/*Чтобы получить содержимое корзины, воспользуемся функцией makeGETRequest и заменим
фейковые данные в методе fetchGoods на настоящие:

завернём
XMLHttpRequest в функцию

1 Переделайте makeGETRequest() так, чтобы она использовала промисы.
2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из
корзины и получения списка товаров корзины.
3. * Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в
обработчике этого промиса.

*/

function makeGETRequest(url) {

    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.onerror = function (err) {
            reject(err);
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
}







