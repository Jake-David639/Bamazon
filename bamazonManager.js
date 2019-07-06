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


