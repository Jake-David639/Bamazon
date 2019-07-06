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

// chech user input for exit command "L"
checkExitSelect = input => {
    if (input.toLowerCase() === "l") {
        // display goodbye message and terminate node process
        console.log("Exiting product selection, please come see us again!");
        process.exit(0);
    }
}

showManagerUI = () => {
    // use inquirer to display the list of commands the mgmt can perform
    inquirer
      .prompt({
        type: "list",
        name: "operation",
        choices: ["Add New Product", "View Low Inventory", "Update Inventory", "View Products for Sale", "Quit"],
        message: "Select the desired option"
  
      }).then((input) => {
        switch (input.operation) {
        case "Add New Product":
        
        }
      });
}


