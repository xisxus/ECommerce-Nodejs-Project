const fileHandler = require('../utils/fileHandler');

exports.getCart = (req, res) => {
  const cart = fileHandler.readJSONFile('cart.json');
  const products = fileHandler.readJSONFile('products.json');
  res.render('cart', { cart, products });
};

exports.removeFromCart2 = (req, res) => {
  const productId = req.body.productId;
  let cart = fileHandler.readJSONFile('cart.json');
  const products = fileHandler.readJSONFile('products.json');

  // Find the cart item and the corresponding product
  const cartItemIndex = cart.findIndex((item) => item.productId === productId);
  const product = products.find((p) => p.id === productId);

  if (cartItemIndex !== -1 && product) {
    const cartItem = cart[cartItemIndex];

    // Decrement the quantity or remove the item from the cart
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cartItem.totalPrice = cartItem.price * cartItem.quantity; // Update totalPrice
    } else {
      const removedItemTotalPrice = cartItem.totalPrice; // Store the totalPrice before removing
      cart.splice(cartItemIndex, 1);

      // Update the totalPrice for all remaining cart items
      cart.forEach(item => {
        item.totalPrice = item.price * item.quantity;
      });
    }

    // Update the product stock
    product.stock += 1;
    fileHandler.writeJSONFile('products.json', products);
    fileHandler.writeJSONFile('cart.json', cart);
  }

  res.redirect('/cart');
};

exports.completeCheckout = (req, res) => {
  // Clear the cart data
  fileHandler.writeJSONFile('cart.json', []);

  // Send a success message
  res.send('Thank you for your purchase!');
};

exports.checkout = (req, res) => {
  let cart = fileHandler.readJSONFile('cart.json');

  // Show a confirm message using a modal or an alert
  res.render('checkout', { cart, totalPrice: calculateTotalPrice(cart) });
};

function calculateTotalPrice(cart) {
  return cart.reduce((total, item) => total + item.totalPrice, 0);
}