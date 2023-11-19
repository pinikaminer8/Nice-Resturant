export default class Order {
    constructor(id, dishes, tableNum, comments) {
        this.id = id;
        this.dishes = dishes;
        this.tableNum = tableNum;
        this.comments = comments;
        this.status = "invited";
        this.preparationTime = this._calculatePreparationTime();
    }

    _calculatePreparationTime() {
        let preparationTime = 0;
        for (let i = 0; i < this.dishes.length; i++) {
            preparationTime += this.dishes[i].preparationTime;
        }
        return preparationTime;
    }
}
