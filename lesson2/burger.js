
/*

3. * Некая сеть фастфуда предлагает несколько видов гамбургеров:
    a.Маленький(50 рублей, 20 калорий).
    b.Большой(100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок(обязательно):
    a.С сыром(+10 рублей, +20 калорий).
    b.С салатом(+20 рублей, +5 калорий).
    c.С картофелем(+15 рублей, +10 калорий).
Дополнительно гамбургер можно 
    посыпать приправой(+15 рублей, +0 калорий) и
    полить майонезом(+20 рублей, +5 калорий).
Напишите программу, рассчитывающую стоимость и калорийность гамбургера.Можно
использовать примерную архитектуру класса со следующей страницы, но можно использовать
и свою.*/


class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Burger {
    constructor(size, stuff, toppings) {
        this.size = new Param(this._select(size));
        this.stuff = new Param(this._select(stuff));
        this.toppings = this._getToppings(toppings);
    }
    addTopping(topping) { // Добавить добавку 
    }
    removeTopping(topping) { // Убрать добавку 
    }
    getToppings(topping) { // Получить список добавок 
    }
    getSize() { // Узнать размер гамбургера
    }
    getStuffing() { // Узнать начинку гамбургера 
    }
    calculatePrice() { // Узнать цену

    }
    calculateCalories() { // Узнать калорийность 
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(el => {
            let obj = new Param(el);
            result.push(obj);
        });
        return result
    }

    _select(name) {
        return document.querySelector(`input[name=${name}]:checked`);
    }
    _selectAll(name) {
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    }

    _sumPrice() {
        let result = this.size.price + this.stuff.price;
        this.toppings.forEach(el => result += el.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.stuff.calories;
        this.toppings.forEach(el => result += el.calories);
        return result;
    }

    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }

}