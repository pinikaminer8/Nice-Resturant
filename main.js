import * as readline from 'readline';
import MenuManagement from './menuManagement.js';
import OrdersManagement from './ordersManagement.js';
import KitchenManagement from './kitchenManagement.js';
import WaitersManagement from './waitersManagement.js';
import BillsManagement from './billsManagement.js';

const menuManager = new MenuManagement();
const ordersManager = new OrdersManagement();
const kitchenManager = new KitchenManagement();
const waitersManager = new WaitersManagement();
const billsManager = new BillsManagement();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function takeOrder() {
    console.log("Taking an Order:");

    console.log("Current Menu:");
    menuManager.displayMenu();

    rl.question("Enter table number: ", function (tableNum) {
        rl.question("Enter dish names (comma-separated): ", function (dishNamesString) {
            const dishNamesArray = dishNamesString.split(",");
            const orderedDishes = menuManager.getDishesByNameArray(dishNamesArray);

            const comments = rl.question("Any special comments: ");

            const newOrder = ordersManager.createOrder(orderedDishes, parseInt(tableNum), comments);

            kitchenManager.chefDishTreatment(kitchenManager.availableChef(), newOrder);

            waitersManager.waiterDishTreatment(waitersManager.availableWaiter(), newOrder);

            setTimeout(() => {
                const totalBill = billsManager.calculatePrice(newOrder);
                console.log("Total Bill:", totalBill);
                console.log("\n");
                console.log("Order closed");
                console.log("\n");
                main();
            }, 6000);
        });
    });
}

function addDishToMenu() {
    rl.question("Enter dish name: ", function (dishName) {
        rl.question("Enter dish price: ", function (dishPrice) {
            rl.question("Enter dish preparation time: ", function (preparationTime) {
                menuManager.addDish(dishName, dishPrice, preparationTime);
                console.log(`Dish '${dishName}' added to the menu.`);
                console.log("Current Menu:\n");
                menuManager.displayMenu();
                console.log("\n");
                main();
                
            });
        });
    });
}

function displayCash(){
    console.log("Cash Flow:", billsManager.getCashFlow());
    main();
}

function main() {
    rl.question("Do you want to start an order or manage the restaurant? (order/manage): ", function (action) {
        if (action.toLowerCase() === 'order') {
            takeOrder();
        } else if (action.toLowerCase() === 'manage') {
            rl.question("Choose an option for management (cash/dish/menu): ", function (managementOption) {
                if (managementOption.toLowerCase() === 'cash') {
                    displayCash();
                } else if (managementOption.toLowerCase() === 'dish') {
                    addDishToMenu();
                
                }else if (managementOption.toLowerCase() === 'menu') {
                    menuManager.displayMenu();
                    main();
                }
                else {
                    console.log("Invalid management option. Please enter (cash/dish).");
                }
            });
        } else {
            console.log("Invalid role. Please enter (order/manage).");
        }
    });
}


main();