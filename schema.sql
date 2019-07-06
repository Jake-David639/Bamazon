DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    list_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, list_price, stock_quantity)
VALUES
('The Matrix', 'Media', 12.50, 15),
('Trainspotting', 'Media', 15.00, 25),
('Unfreedom of the Press', 'Media', 26.00, 60),
('Detective Pikachu', 'Media', 25.99, 40),
('2 TB HDD', 'Electronics', 49.50, 50),
('DDR4 RMA 16 GB', 'Electronics', 180.00, 30),
('Cannon DSLR - Body Only', 'Electronics', 899.99, 20),
('Mass Effect 3 - Digital Deluxe Edition', 'Games', 39.99, 20),
('Farcry 5', 'Games', 35.99, 45),
('Magic the Gathering - Booster pack', 'Games', 4.25, 100);
 

CREATE TABLE departments(
    department_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL
);

SELECT * FROM departments;

INSERT INTO departments( department_name, over_head_costs) 
VALUES ('Media', 200),
       ('Electronics', 300),
       ('Games', 250);