import Order from './order.js';

export default class OrderManagement {
    constructor() {
        this.activeOrders = [];
    }

    createOrder(dishes, tableNum, comments) {
        const orderId = this.activeOrders.length + 1;
        const newOrder = new Order(orderId, dishes, tableNum, comments);
        this.activeOrders.push(newOrder);
        return newOrder;
    }

    calculatePreparationTime(order) {
        let preparationTime = 0;
        for (let i = 0; i < order.dishes.length; i++) {
            preparationTime += order.dishes[i].preparationTime;
        }
        return preparationTime;
    }
}