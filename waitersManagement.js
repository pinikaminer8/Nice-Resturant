import Waiter from "./waiter.js";

export default class WaitersManagement {
    constructor() {
        this.waiters = [];
        const newWaiter = new Waiter("Miri");
        this.waiters.push(newWaiter);
        const newWaiter2 = new Waiter("riki");
        this.waiters.push(newWaiter2);
        this.waitersQueue = this.waiters;
    }

    availableWaiter() {
        let waiter = this.waitersQueue.shift();
        return waiter;
    }

    waiterDishTreatment(waiter, order) {
        waiter.activeOrder = order.id;
        order.status = "sent to the table";
        setTimeout(() => this.orderProvided(waiter, order), 4000);
    }

    orderProvided(waiter, order) {
        order.status = "Order provided";
        console.log(order.status);
        waiter.activeOrder = null;
        this.waitersQueue.push(waiter);
    }
}
