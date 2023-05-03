const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async readProducts() {
    try {
      return JSON.parse(await fs.readFile(this.path, 'utf-8'));
    } catch (error) {
      console.log(`Error reading products file: ${error}`);
      return [];
    }
  }

  async saveProducts(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products));
      console.log('Products file saved successfully');
    } catch (error) {
      console.log(`Error saving products file: ${error}`);
    }
  }

  async generateId() {
    const products = await this.readProducts();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  async addProduct(product) {
    try {
      const products = await this.readProducts();
      const newProduct = {...product, status: true, id: await this.generateId()};
      products.push(newProduct);
      await this.saveProducts(products);
      console.log(`\nProduct with id ${newProduct.id} has been added`);
    } catch (error) {
      console.log(`Error adding product: ${error}`);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.readProducts();
      products = products.filter((product) => product.id !== parseInt(id));
      await this.saveProducts(products);
      console.log(`\nProduct with id ${id} deleted`);
    } catch (error) {
      console.log(`Error deleting product: ${error}`);
    }
  }

  async modifyProduct(id, price) {
    try {
      let products = await this.readProducts();
      const index = products.findIndex((product) => product.id === parseInt(id));
      if (index === -1) {
        console.log(`\nProduct with id ${id} not found`);
      } else {
        products[index].price = parseFloat(price);
        await this.saveProducts(products);
        console.log(`\nProduct with id ${id} modified`);
      }
    } catch (error) {
      console.log(`Error modifying product: ${error}`);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock, status) {
    try {
      const products = await this.readProducts();
      const productIndex = products.findIndex((product) => product.id === parseInt(id));
    
      if (productIndex === -1) {
        console.log(`Product with id ${id} not found`);
        return;
      }
    
      const updatedProduct = {
        id: parseInt(id),
        title,
        description,
        price: parseFloat(price),
        thumbnail,
        status: (status === 'true'),
        category,
        code,
        stock: parseInt(stock),
      };
    
      products[productIndex] = updatedProduct;
      await this.saveProducts(products);
    
      console.log(`Product with id ${id} has been updated`);
    } catch (error) {
      console.log(`Error updating product: ${error}`);
    }
  }

  async getProducts(limit) {
    try {
      const products = await this.readProducts();
      if (limit) {
        return products.slice(0, limit);
      } else {
        return products;
      }
    } catch (error) {
      console.error(`Error getting products: ${error}`);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.readProducts();
      return products.find((product) => product.id === parseInt(id));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = ProductManager;
