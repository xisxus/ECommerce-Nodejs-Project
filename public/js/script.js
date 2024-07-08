
let cartItems = [];

// Function to add an item to the cart
function addToCart(plantName, price) {
  // Check if the item is already in the cart
  const existingItem = cartItems.find((item) => item.name === plantName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const item = { name: plantName, price: price, quantity: 1 };
    cartItems.push(item);
  }
  updateCartUI();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  // Clear the existing cart items
  cartItemsContainer.innerHTML = '';

  // Calculate the total price
  let total = 0;
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Create a new div for each cart item
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price.toFixed(2)} x ${item.quantity} = ${itemTotal.toFixed(2)}</span>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    // Append the cart item div to the cart items container
    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Update the total price in the UI
  cartTotalElement.textContent = `${total.toFixed(2)}`;
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    updateCartUI();
  } else {
    removeFromCart(index);
  }
}

// Function to increase the quantity of an item in the cart
function increaseQuantity(index) {
  cartItems[index].quantity++;
  updateCartUI();
}

// Function to handle the "Order Now" button click
function orderNow() {
  // Add your order processing logic here
  console.log('Order placed!');
}


function filterPlant() {
  // Get the user input
  var userInput = document.getElementById('plantSearch').value.toLowerCase();
  // Get all the food items
  var plantItems = document.getElementsByClassName('card-products')[0].getElementsByTagName('h3');

  // Loop through all the food items
  for (var i = 0; i < plantItems.length; i++) {
    var plantName = plantItems[i].innerText.toLowerCase();
    var plantCard = plantItems[i].parentNode.parentNode;

    // Check if the food name contains the user input
    if (plantName.includes(userInput)) {
      // If it matches, display the food item
      plantCard.style.display = "block";
    } else {
      // If it doesn't match, hide the food item
      plantCard.style.display = "none";
    }
  }
}


// Get references to the forms
const loginForm = document.querySelector('.log');
const registerForm = document.querySelector('.reg');

// Add event listener for login form submission
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Add your login logic here
  alert('Login:', email, password);
});

// Add event listener for registration form submission
registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  // Add your registration logic here
  alert('Register:', name, email, password, confirmPassword);
});

// Sticky navigation
window.addEventListener("scroll", function () {
  var navbar = this.document.querySelector("nav")
  navbar.classList.toggle("navsticky", window.scrollY > 0)
});

// Cart sidebar
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('show');
});

window.addEventListener('click', (e) => {
  if (e.target === cartSidebar) {
    cartSidebar.classList.remove('show');
  }
});

// Chef slider
const plantSlider = document.querySelector('.plant-slider');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let isDragging = false;
let currentPosition = 0;
let prevPosition = 0;

plantSlider.addEventListener('mousedown', dragStart);
plantSlider.addEventListener('mouseup', dragEnd);
plantSlider.addEventListener('mouseleave', dragEnd);
plantSlider.addEventListener('mousemove', drag);
plantSlider.addEventListener('touchstart', dragStart);
plantSlider.addEventListener('touchend', dragEnd);
plantSlider.addEventListener('touchmove', drag);

prevArrow.addEventListener('click', () => {
  plantSlider.scrollLeft -= plantSlider.offsetWidth;
});

nextArrow.addEventListener('click', () => {
  plantSlider.scrollLeft += plantSlider.offsetWidth;
});

function dragStart(e) {
  isDragging = true;
  prevPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function dragEnd() {
  isDragging = false;
}

function drag(e) {
  if (!isDragging) return;
  const currentPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const diff = prevPosition - currentPosition;
  plantSlider.scrollLeft += diff;
  prevPosition = currentPosition;
}