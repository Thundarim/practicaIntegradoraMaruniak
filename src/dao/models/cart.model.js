const mongoose = require('mongoose');

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
      {
        
          product: {
              type: mongoose.Schema.Types.ObjectId,
              ref:'products',
              required: true
          },
          title:{
            type:String
          },
          quantity: {
              type: Number, 
              required: true
          }
      }
  ]
})



const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;
