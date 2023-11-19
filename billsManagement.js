export default class BillsManagement {
    constructor() {
        this.cashFlow = 0;
    }

    calculatePrice(order) {
        let totalPrice = 0;
        for (let i = 0; i < order.dishes.length; i++) {
            totalPrice += order.dishes[i].price;
        }
        this._updateFlow(totalPrice);
        return totalPrice;
    }

    _updateFlow(totalPrice) {
        this.cashFlow += totalPrice;
    }

    getCashFlow() {
        return this.cashFlow;
    }
}
