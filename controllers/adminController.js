const fileHandler = require('../utils/fileHandler');

exports.getAdmin = (req, res) => {
  const products = fileHandler.readJSONFile('products.json');
  res.render('admin', { products });
};

exports.addProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  const photo = req.file ? req.file.filename : null;
  const products = fileHandler.readJSONFile('products.json');

  // Generate a new product ID
  const newProductId = products.length + 1;

  // Create the new product object
  const newProduct = {
    id: `${Date.now()}`,
    name,
    description,
    price,
    stock,
    photo,
  };

  // Add the new product to the products array
  products.push(newProduct);

  // Write the updated products array to the JSON file
  fileHandler.writeJSONFile('products.json', products);

  res.redirect('/admin');
};

exports.updateProduct = (req, res) => {
  const { id, name, description, price, stock } = req.body;
  const photo = req.file ? req.file.filename : null;
  const products = fileHandler.readJSONFile('products.json');

  // Find the product by its ID and update its properties
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products[productIndex].name = name;
    products[productIndex].description = description;
    products[productIndex].price = price;
    products[productIndex].stock = stock;
    if (photo) {
      products[productIndex].photo = photo;
    }

    // Write the updated products array to the JSON file
    fileHandler.writeJSONFile('products.json', products);
  }

  res.redirect('/admin');
};

exports.deleteProduct = (req, res) => {
  const productId = req.body.productId;
  let products = fileHandler.readJSONFile('products.json');

  // Remove the product from the products array
  products = products.filter((p) => p.id !== productId);

  // Write the updated products array to the JSON file
  fileHandler.writeJSONFile('products.json', products);

  res.redirect('/admin');
};