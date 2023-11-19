import Chef from "./chef.js";

export default class KitchenManagement {
    constructor() {
        this.chefs = [];
        const newChef = new Chef("Pini");
        this.chefs.push(newChef);
        const newChef2 = new Chef("Bini");
        this.chefs.push(newChef2);
        this.chefsQueue = this.chefs;
    }

    availableChef() {
        let chef = this.chefsQueue.shift();
        return chef;
    }

    chefDishTreatment(chef, order) {
        chef.activeOrder = order.id;
        order.status = "in-progress";
        console.log("order in progress");
        
        setTimeout(() => this.orderReady(chef, order), 3000);
    }

    orderReady(chef, order) {
        console.log("order ready");
        chef.activeOrder = null;
        this.chefsQueue.push(chef);
        order.status = "ready";
    }
}
