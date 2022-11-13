const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
const renderGoodsItem = (title = 'product', price = '0') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList(goods);

/* У нас есть товар, создадим для него класс GoodsItem. У него будет
два свойства – title и price – и один метод render, который будет возвращать html-разметку. Этот
метод мы уже описали на прошлом уроке.*/

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
    }
}

/* Вторым классом будет список товаров GoodsList.В качестве свойства добавим массив со списком
товаров, но изначально сделаем его пустым*/
/*Теперь нам нужно сделать метод для заполнения списка. Позже мы будем получать данные с
сервера, поэтому создадим метод fetchGoods, но пока запишем в массив goods статичный список
товаров: */

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
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
list.fetchGoods();
list.render();

class Basket {
    constructor() {
    }
    addGood() {
    }

    removeGood() {
    }

    changeGood() {
    }

    render() {
    }
}

class ElemBasket {
    constructor() {
    }

    render() {
    }

}
