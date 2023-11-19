import * as readline from 'readline';
import MenuManagement from './menuManagement.js';
import OrdersManagement from './ordersManagement.js';
import KitchenManagement from './kitchenManagement.js';
import WaitersManagement from './waitersManagement.js';
import BillsManagement from './billsManagement.js';

export default class RestaurantManagement {
    constructor() {
        this.menuManager = new MenuManagement();
        this.ordersManager = new OrdersManagement();
        this.kitchenManager = new KitchenManagement();
        this.waitersManager = new WaitersManagement();
        this.billsManager = new BillsManagement();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.actions = {
            'order': this.takeOrder.bind(this),
            'manage': this.manageRestaurant.bind(this)
        };
    }

    takeOrder() {
        console.log("Taking an Order:");

        console.log("Current Menu:");
        this.menuManager.displayMenu();

        this.rl.question("Enter table number: ", (tableNum) => {
            const parsedTableNum = parseInt(tableNum);
        if (isNaN(parsedTableNum) || !Number.isInteger(parsedTableNum) || parsedTableNum <= 0) {
            console.log("Invalid table number. Please enter a positive integer.\n");
            this.takeOrder();
            return;
        }
            this.rl.question("Enter dish names (comma-separated): ", (dishNamesString) => {
                const dishNamesArray = dishNamesString.split(",");
                const orderedDishes = this.menuManager.getDishesByNameArray(dishNamesArray);
                if (orderedDishes.length === 0) {
                    console.log("\n\n")
                    setTimeout(() => {
                        this.takeOrder();
                    }, 2000)
                    return;
                }

                const comments = this.rl.question("Any special comments: ");

                const newOrder = this.ordersManager.createOrder(orderedDishes, parseInt(tableNum), comments);

                this.kitchenManager.chefDishTreatment(this.kitchenManager.availableChef(), newOrder);

                this.waitersManager.waiterDishTreatment(this.waitersManager.availableWaiter(), newOrder);

                setTimeout(() => {
                    const totalBill = this.billsManager.calculatePrice(newOrder);
                    console.log("Total Bill:", totalBill);
                    console.log("\n\n");
                    this.start();
                }, 6000);
            });
        });
    }

    addDishToMenu() {
        this.rl.question("Enter dish name: ", (dishName) => {
            this.rl.question("Enter dish price: ", (dishPrice) => {
                this.rl.question("Enter dish preparation time: ", (preparationTime) => {
                    this.menuManager.addDish(dishName, dishPrice, preparationTime);
                    console.log(`Dish '${dishName}' added to the menu.`);
                    console.log("Current Menu:\n");
                    this.menuManager.displayMenu();
                    this.start();
                });
            });
        });
    }

    manageRestaurant() {
        const managementOptions = {
            'cash': this.displayCash.bind(this),
            'dish': this.addDishToMenu.bind(this),
            'menu': this.menuManager.displayMenu.bind(this)
        };

        const optionsNames = Object.keys(managementOptions);
        
        const displayNames = optionsNames.map((name) => `${name}`).join("/ ");
    
        this.rl.question(`Choose an option for management (${displayNames}): `, (managementOption) => {
            const selectedOption = managementOptions[managementOption.toLowerCase()];
            if (selectedOption) {
                selectedOption();
                this.start();
            } else {
                console.log(`Invalid management option. Please enter (${displayNames}).`);
                this.manageRestaurant();
            }
        });
    }

    displayCash() {
        console.log("Cash Flow:", this.billsManager.getCashFlow());
        this.start(); 
    }

    start() {
        this.rl.question("\nDo you want to start an order or manage the restaurant? (order/manage): ", (action) => {
            const selectedAction = this.actions[action.toLowerCase()];
            if (selectedAction) {
                selectedAction();
            } else {
                console.log("Invalid role. Please enter (order/manage).");
                this.start();
            }
        });
    }
}

