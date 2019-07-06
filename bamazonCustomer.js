// initializing required npm packages and dependencies
var mysql = require("MySQL");
var inquirer = require("inquirer");
require('dotenv').config();
require('console.table');

// initialize the database connection variable, load arguments from .env file
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: null,
    database: process.env.DB_DATA
});
// create the connection to the database and display the invertory table 
connection.connect((err) => {
    // throw error if encountered
    if (err) {
        throw err;
        return;
    }
    // function that displayes the inventory table
    displayInventory();
});

// loads the products table from the database and print results to the console
displayInventory = () => {
    // selects all data from products table in MySQL database
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        // render table in the console using the db query response
        console.table(res);
        // prompt the user for the desired product
        getUserInput(res);
    });
}

// prompt the user for an item ID from the product table
getUserInput = inventory => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "selection",
                message: "Enter the ID number of the product you would like to purchase or press 'L' to leave the purchase menu.",
            }
        ])
        .then((input) => {
            //validate input
            if (input > 0 || input.toLowerCase() === 'l') {
                // check for exit condition
                checkExitSelect(input.choice);
                var selectionID = parseInt(input.choice);
                var product = checkInventory(selectionID, inventory);
                // if the entered ID exists in the table, prompt the user for the desired quantity
                if (product) {
                    // getSelectionQuantity
                    getSelectionQuantity(product);
                }
                else {
                    // inform user the entered ID is not valid then display the product table again
                    console.log("\nThe provided product ID is not in our system, please check your selection and try again.");
                    displayInventory();
                }
            }
            else {
                // inform user input is invalid and display inventory table again
                console.log("\nThe entered product ID or command is not valid, please try again.");
                displayInventory();
            }
        });
}

// chech user input for exit command "L"
checkExitSelect = (input) => {
    if (input.toLowerCase() === "l") {
        // display goodbye message and terminate node process
        console.log("Exiting product selection, please come see us again!");
        process.exit(0);
    }
}

// prompt the user for the desired quantity of the selected product
getSelectionQuantity = (product) => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "Please enter the desired quantity of the product selected or press 'L' to leave the purchase menu.",
            }
        ])
        .then((input) => {
            // validate input
            if (input > 0 || input.toLowerCase() === 'l'){
                // check if user input was the exit command 'L'
                checkExitSelect(input.quantity);
                var quantity = parseInt(input.quantity);
                // check if sufficient stock is present of the selected item to fulfill the user request
                if (quantity > product.stock_quantity) {
                    console.log("\nWe do not have enough of this item in stock to fulfill your request, apologies.");
                    displayInventory();
                }
                else {
                    // Otherwise run pocessTransaction, give it the product information and desired quantity to purchase
                    pocessTransaction(product, quantity);
                }
            }
            else {
                // if input is invalid, run getSelectionQuantity again.
                console.log('The entered quantity is invalid, please try again.');
                getSelectionQuantity(product);
            }
        });
}

// chech if the user's selection exists in the inventory table
checkInventory = (selectionID, inventory) => {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === selectionID) {
            // if a match is found, return it
            return inventory[i];
        }
    }
    // else return null
    return null;
}
// process the users purchase request
pocessTransaction = (product, quantity) => {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        (err, res) => {
            // print success message to console, display products table again
            console.log(`\nPurchase of ${quantity} ${product.product_name}'s was successful!`);
            displayInventory();
        }
    );
}

