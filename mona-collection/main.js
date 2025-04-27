const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 499,
    image: "https://images.pexels.com/photos/1002644/pexels-photo-1002644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    price: 1299,
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
  },
  {
    id: 3,
    name: "Red Dress",
    price: 1999,
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
  },
  {
    id: 4,
    name: "Black Leather Jacket",
    price: 3499,
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300",
  },
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "bg-white rounded shadow p-4 flex flex-col";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="h-48 w-full object-cover rounded mb-4" />
      <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
      <p class="text-indigo-600 font-bold mb-4">₹${product.price}</p>
      <button class="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    productList.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItem = cart.find((item) => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.product.id !== productId);
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartSummary = document.getElementById("cart-summary");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
    cartSummary.classList.add("hidden");
    cartCount.textContent = "0";
    return;
  }

  cart.forEach(({ product, quantity }) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "flex justify-between items-center bg-white p-3 rounded shadow";

    itemDiv.innerHTML = `
      <div>
        <h4 class="font-semibold">${product.name}</h4>
        <p>₹${product.price} x ${quantity}</p>
      </div>
      <button class="text-red-600 hover:text-red-800" onclick="removeFromCart(${product.id})">
        <i class="fas fa-trash"></i>
      </button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
  cartSummary.classList.remove("hidden");
}

function initiatePhonePePayment() {
  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (totalAmount === 0) {
    alert("Your cart is empty. Please add items to cart before checkout.");
    return;
  }

  // PhonePe payment integration simulation
  // In real scenario, you would call your backend to generate payment request and redirect to PhonePe SDK or URL
  alert(`Redirecting to PhonePe for payment of ₹${totalAmount.toFixed(2)}...`);

  // Simulate payment success
  setTimeout(() => {
    alert("Payment successful! Thank you for shopping at Mona Collection.");
    cart = [];
    renderCart();
  }, 2000);
}

document.getElementById("checkout-btn").addEventListener("click", initiatePhonePePayment);

renderProducts();
renderCart();
