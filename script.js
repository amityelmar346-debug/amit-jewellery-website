const products = [
  {
    id: 1,
    name: "Golden Elegance Necklace",
    category: "Necklaces",
    price: 2499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    tag: "BESTSELLER"
  },
  {
    id: 2,
    name: "Classic Gold Ring",
    category: "Rings",
    price: 1299,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    tag: "POPULAR"
  },
  {
    id: 3,
    name: "Elegant Pearl Earrings",
    category: "Earrings",
    price: 999,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    tag: "NEW"
  },
  {
    id: 4,
    name: "Luxury Gold Bracelet",
    category: "Bracelets",
    price: 1799,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    tag: "TRENDING"
  },
  {
    id: 5,
    name: "Modern Pendant Necklace",
    category: "Necklaces",
    price: 1599,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80",
    tag: "NEW"
  },
  {
    id: 6,
    name: "Timeless Statement Ring",
    category: "Rings",
    price: 1499,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    tag: "POPULAR"
  },
  {
    id: 7,
    name: "Golden Drop Earrings",
    category: "Earrings",
    price: 1199,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
    tag: "BESTSELLER"
  },
  {
    id: 8,
    name: "Premium Charm Bracelet",
    category: "Bracelets",
    price: 1999,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80",
    tag: "EXCLUSIVE"
  }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function displayProducts() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="no-products">No jewellery found. Try another search.</p>';
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/500x600/f8f5ef/8a6b3d?text=Jewellery'"
        >
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button
          class="add-to-cart"
          onclick="addToCart(${product.id})">
          Add to Bag +
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  cart.push(product);
  updateCartCount();

  alert(product.name + " added to your bag!");
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function viewCart() {
  if (cart.length === 0) {
    alert("Your shopping bag is empty!");
    return;
  }

  let message = "YOUR SHOPPING BAG\n\n";
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${formatPrice(item.price)}\n`;
    total += item.price;
  });

  message += `\nTotal: ${formatPrice(total)}`;
  message += "\n\nClick OK to clear your bag.";

  if (confirm(message)) {
    cart = [];
    updateCartCount();
  }
}

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);
cartButton.addEventListener("click", viewCart);

document.getElementById("year").textContent =
  new Date().getFullYear();

displayProducts();