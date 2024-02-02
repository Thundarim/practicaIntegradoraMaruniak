const express = require('express');
const CartManager = require('../dao/db/cartManager.js');
const Product = require('../dao/models/products.model.js');
const router = express.Router();

const cartManager = new CartManager();

router.post("/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error("Error al crear un nuevo carrito:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener todos los carritos
router.get("/carts", async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        console.error("Error al obtener carritos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener los carritos por id
router.get("/carts/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener carrito por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Añadir producto al carrito
router.post("/carts/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
  
    try {
      const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
      res.json(updatedCart.products);
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  

module.exports = router;
