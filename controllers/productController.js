const fileHandler = require('../utils/fileHandler');

exports.getProducts = (req, res) => {
  const products = fileHandler.readJSONFile('products.json');
  res.render('products', { products });
};

exports.getProductDetails = (req, res) => {
  const productId = req.params.id;
  const products = fileHandler.readJSONFile('products.json');
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.render('productDetails', { product });
  } else {
    res.status(404).render('404', { pageTitle: 'Product Not Found' });
  }
};

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  let cart = fileHandler.readJSONFile('cart.json');
  const products = fileHandler.readJSONFile('products.json');
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Check if the product is in stock
    if (product.stock > 0) {
      // Check if the product is already in the cart
      const cartItem = cart.find((item) => item.productId === productId);
      if (cartItem) {
        // If already in cart, increment the quantity
        cartItem.quantity += 1;
        // Update the total price
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
      } else {
        // If not in cart, add a new item
        cart.push({
          productId,
          quantity: 1,
          price: product.price, // Store the product price
          totalPrice: product.price, // Set the total price initially
        });
      }

      // Update the product stock
      product.stock -= 1;
      fileHandler.writeJSONFile('products.json', products);
      fileHandler.writeJSONFile('cart.json', cart);
    } else {
      // If the product is out of stock, display an alert
      console.log(`Product with ID ${productId} out of stock.`);
    }
  } else {
    console.log(`Product with ID ${productId} not found.`);
  }

  res.redirect('/products#proSec');
};

exports.increseCart = (req, res) => {
  const productId = req.body.productId;
  let cart = fileHandler.readJSONFile('cart.json');
  const products = fileHandler.readJSONFile('products.json');
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Check if the product is in stock
    if (product.stock > 0) {
      // Check if the product is already in the cart
      const cartItem = cart.find((item) => item.productId === productId);
      if (cartItem) {
        // If already in cart, increment the quantity
        cartItem.quantity += 1;
        // Update the total price
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
      } else {
        // If not in cart, add a new item
        cart.push({
          productId,
          quantity: 1,
          price: product.price, // Store the product price
          totalPrice: product.price, // Set the total price initially
        });
      }

      // Update the product stock
      product.stock -= 1;
      fileHandler.writeJSONFile('products.json', products);
      fileHandler.writeJSONFile('cart.json', cart);
    } else {
      // If the product is out of stock, display an alert
      console.log(`Product with ID ${productId} out of stock.`);
    }
  } else {
    console.log(`Product with ID ${productId} not found.`);
  }

  res.redirect('/cart');
};



