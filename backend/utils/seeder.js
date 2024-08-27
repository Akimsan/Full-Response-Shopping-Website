//  seeder.js does not depend on server.js or app.js it is a uniqe file

const products = require('../data/products.json');
const Product = require('../models/productModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

dotenv.config({path:'backend/config/.env'});

// database connection
connectDatabase();

const seedProducts = async () =>{

    try {
        await Product.deleteMany();
        console.log("All Products are deleted!");
    
        await Product.insertMany(products);
        console.log("All Products are added!");
        
    } catch (error) {
        console.log(error.message);
        
    }
    process.exit();
     
}

seedProducts()
module.exports = seedProducts;

