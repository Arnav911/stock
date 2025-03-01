Basic Sign-Up/Sign-In Website Leading to Crop-Stock Management

To run this project, your machine should have MySQL, Node.js, and other required modules.

Below are the required dependencies for Windows. Run these in the command prompt (cmd):
npm install express mysql2 bcryptjs jsonwebtoken cors

Make sure your MySQL database has the following tables defined:

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

You may need to modify the server.js file based on your MySQL command-line client password and the database you are using.
Steps to Run the Project:

Start the server by running the following command:

node server.js

Open the index.html file in a browser.
