const fs = require('fs').promises;
import products from "../products.json" assert { type: "json", integrity: "sha384-ABC123" };

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async readCarts() {
    try {
      return JSON.parse(await fs.readFile(this.path, 'utf-8'));
    } catch (error) {
      console.log(`Error reading carts file: ${error}`);
      return [];
    }
  }

  async saveCarts(carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts));
      console.log('Carts file saved successfully');
    } catch (error) {
      console.log(`Error saving carts file: ${error}`);
    }
  }
  
  async generateId() {
    const carts = await this.readCarts();
    const lastCart = carts[carts.length - 1];
    return lastCart ? lastCart.id + 1 : 1;
  }

  async addCart() {
    try {
      const carts = await this.readCarts();
      const newCart = { id: await this.generateId(), products: [] };
      carts.push(newCart);
      await this.saveCarts(carts);
      console.log(`\nCart with id ${newCart.id} has been added`);
    } catch (error) {
      console.log(`Error adding cart: ${error}`);
    }
  }

  async addProductToCart(id, productId) {
    const cart = this.getCartById(id)
   
    // Search for the product in the products array
    const productIndex = products.findIndex((p) => p.id === parseInt(productId));
    if (productIndex === -1) {
      res.status(404).send("product not found.");
      return;
    }
    products[productIndex].quantity--;
  
    const existingProduct = cart.products.find(
      (e) => e.product === parseInt(productId)
    );
    if (existingProduct) {
      // If there is a product, increase the quantity
      existingProduct.quantity++;
    } else {
      // If the product does not exist, it is added to the array.
      cart.products.push({ product: parseInt(productId), quantity: 1 });
    }
  
    this.saveCarts(cart);
  };

  async getCartById(id) {
    try {
      const carts = await this.readCarts();
      return carts.find((cart) => cart.id === parseInt(id));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = CartManager;
