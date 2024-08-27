const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true,
        maxlength:[100,"Productname can not exceed 100 charactors"]
    },
    price:{
        type:Number,
        required:true,
        default:0.0,
    },
    description:{
        type:String,
        required:[true, "Please enter product descriptions"]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
          image:{
            type:String,
            required:true
          }
        }
    ],
    category:{
        type:String,
        required:[true, "Plesae enter product category!"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: "Please select correct category!"
        }
    },
    seller:{
        type:String,
        required:[true, "Please enter product seller"]
    },
    stock:{
        type:Number,
        required:[true ,"Please enter product stocks"],
        maxlength:[20, "Product stock can not exceed 20"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
           user:mongoose.Schema.Types.ObjectId,
            rating:{
                type:String,
                required:true
            },
            Comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    user:{
        type : mongoose.Schema.Types.ObjectId ///////////////////////////////////////////////////////////////////////////////////////////
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }

})

let schema = mongoose.model('Product',productSchema)
module.exports = schema;