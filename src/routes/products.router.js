import { Router } from "express";
const router = Router();

const ProductManager = require('./ProductManager.js');
const manager = new ProductManager('./products.json');

// Index Products
router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts(parseInt(req.query.limit));
    res.status(200).send(products);
  } catch (error) {
    console.log(`Error getting products: ${error}`);
    res.status(500).send('Error getting products');
  }
});

// Get Product
router.get("/:id", async (req, res) => {
  try {
    const product = await manager.getProductById(parseInt(req.params.id));
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(`Error getting product: ${error}`);
    res.status(500).send('Error getting product');
  }
});

// Create Product
router.post("/", async (req, res) => {
  try {
    let p = req.body;

    if (!p.title || !p.description || !p.price || !p.code || !p.stock || !p.category) {
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    }

    await manager.addProduct(p);
    res.status(200).send({ status: "success", message: "Product created" });
  } catch (error) {
    console.log(`Error creating product: ${error}`);
    res.status(500).send('Error creating product');
  }
});

// Update Product
router.put('/:id', async (req, res) => {  
  const { id } = req.params.id;
  const { title, description, price, thumbnail, code, stock, status } = req.body;
  
  try{
    await manager.updateProduct(id, title, description, price, thumbnail, code, stock, status);
    res.status(200).send({ status: "success", message: `Product with id ${id} has been updated`});
  } catch (error) {
    console.log(`Error updating product: ${error}`);
    res.status(500).send('Error updating product');
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    await manager.deleteProduct(req.params.id);
    res.status(200).send({ status: "success", message: `Product with id ${id} has been deleted` });
  } catch (error) {
    console.log(`Error deleting product: ${error}`);
    res.status(500).send('Error deleting product');
  }
});

export default router;
