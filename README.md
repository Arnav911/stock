# stock
Basic sign up-sign in website which further leads to crop-stock management

To run this Project, your machine should have mysql, node.js and other required modules.

Given below are the requiered dependencies which are requiered in your machine. These are specifically for windows. Run these in the cmd.

npm install express mysql2 bcryptjs jsonwebtoken cors

Make sure that your mysql database has these tables defined:

CREATE DATABASE crop_stock;
USE crop_stock;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE stocks (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    crop_name VARCHAR(100),
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

You also have to change the server.js file slightly depending upon the password of your MySql command line client and the database you are currently using.

To run the Entire code:
1. Start the Server first by giving the command node server.js
2. Now run the index.html file. 
