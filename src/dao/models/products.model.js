const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:{
  type: String,
  required: true
},
  description:{
    type: String,
    required: true
  },
  img:{type:String
  },
  
  price: {
    type:Number,
  required:true
},
  thumbnail: {
    type:String
  },
  code:{
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: { type:Boolean,
    required:true
  }
});

const Product = mongoose.model( "products", productSchema);
module.exports = Product;
