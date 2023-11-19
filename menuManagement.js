import Dish from "./dish.js";

export default class MenuManagement {
    constructor() {
        this.dishes = [];
        const pizzaDish = new Dish("pizza", 100, 12);
        const cakeDish = new Dish("cake", 50, 8);
        this.dishes.push(pizzaDish);
        this.dishes.push(cakeDish);
    }

    addDish(name, price, preparationTime) {
       const dish = new Dish(name, parseInt(price), preparationTime);
        this.dishes.push(dish);
    }

    displayMenu() {
        for (let dish of this.dishes) {
            console.log("dish name:", dish.name);
            console.log("dish price:", dish.price);
            console.log("-------------------------")
        }
    }

    getDishesByNameArray(dishNamesArray) {
        let orderedDishes = [];
        for (let dishName of dishNamesArray) {
            const foundDish = this.getDishByName(dishName);
            if (foundDish) {
                orderedDishes.push(foundDish);
            } else {
                console.log(`Dish '${dishName}' not found in the menu.`);
                orderedDishes.length = 0;
            }
        }
        return orderedDishes;
    }

    getDishByName(dishName) {
        return this.dishes.find(dish => dish.name === dishName);
    }
}
