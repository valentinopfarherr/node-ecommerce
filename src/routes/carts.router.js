import { Router } from "express";
const router = Router();

const CartManager = require('./CartManager.js');
const manager = new CartManager('./carts.json');

// Create Cart
router.post("/", async (req, res) => {
  try {
    await manager.addCart();
    res.status(200).send({ status: "success", message: "Cart created" });
  } catch (error) {
    console.log(`Error creating a cart: ${error}`);
    res.status(500).send('Error creating a cart');
  }
});

// Get Cart
router.get("/:id", async (req, res) => {
  try {
    const cart = await manager.getCartById(parseInt(req.params.id));
    if (!cart) {
      return res.status(404).send({ error: "Cart not found" });
    }
    res.status(200).send(cart.products);
  } catch (error) {
    console.log(`Error getting cart: ${error}`);
    res.status(500).send('Error getting cart');
  }
});

// Add Product to Cart
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    await manager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).send({ status: "success", message: "Product added to cart" });
  } catch (error) {
    console.log(`Error adding product to cart: ${error}`);
    res.status(500).send('Error adding product to cart');
  }
});

export default router;
