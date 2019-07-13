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
    // function that displayes the manager options
    showManagerUI();
});

getInvertoryData = () => {
    // selects all data from products table in MySQL database
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        // render table in the console using the db query response
        console.table(res);
        // prompt the user for the desired product
        getUserInput(res);
    });
}

//function to add units to an existing invertory item
updateItemQuantity = inventory => {
    console.table(inventory);
    // TODO
  }
  

showManagerUI = () => {
    // use inquirer to display the list of operations the mgmt can perform
    inquirer
      .prompt({
        type: "list",
        name: "operation",
        choices: ["Add New Product", "View Low Inventory", "Update Inventory", "View Products for Sale", "Quit"],
        message: "Select the desired option"
  
      }).then((input) => {
        switch (input.operation) {
        case "Add New Product":
        // TODO
        }
      });
}

displayLowInventory = () => {
  // displays a table with all product listings with 5 or less units in stock
  connection.query("SELECT * FROM products WHERE stock_quantity <= 5",(err, res) => {
    if (err) throw err;
    console.table(res);
    // show the manager menu again
    showManagerUI();
  });

}

getSelectionQuantity = product => {
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
                    pocessRequest(product, quantity);
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
