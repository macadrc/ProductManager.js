const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.currentId = 1; 
    this.loadProducts(); 
  }

  
  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        
        const lastProduct = this.products[this.products.length - 1];
        this.currentId = lastProduct.id + 1;
      }
    } catch (err) {
      this.products = [];
    }
  }

 
  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

 
  addProduct(product) {
    product.id = this.currentId++; 
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  
  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

 
  getAllProducts() {
    return this.products;
  }

  
  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }


  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}


const productManager = new ProductManager('products.json');

const product1 = {
  title: 'Manzana',
  description: 'Manzanas rojas frescas',
  price: 10.99,
  thumbnail: 'manzanasrojas.jpg',
  code: 'P001',
  stock: 10,
};


productManager.addProduct(product1);
console.log(productManager.getAllProducts());

const updatedProduct1 = {
  price: 24.99,
  stock: 15,
};

productManager.updateProduct(1, updatedProduct1);
console.log(productManager.getAllProducts());

const deletedProduct = productManager.deleteProduct(1);
console.log(deletedProduct);
console.log(productManager.getAllProducts());
