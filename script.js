const products = [
  { id: 1, name: "Hot Pant", category: "APPAREL", price: 249000, image: "images/hot.jpg" },
  { id: 2, name: "TON Cap", category: "ACCESSORIES", price: 99000, image: "images/cap.svg" },
  { id: 3, name: "TON T-Shirt", category: "APPAREL", price: 149000, image: "images/tshirt.svg" },
  { id: 4, name: "TON Bottle", category: "LIFESTYLE", price: 119000, image: "images/bottle.svg" },
  { id: 5, name: "TON Hoodie", category: "APPAREL", price: 299000, image: "images/hoodie.svg" },
  { id: 6, name: "TON Jacket", category: "APPAREL", price: 399000, image: "images/jacket.svg" },
  { id: 7, name: "TON Tote Bag", category: "ACCESSORIES", price: 129000, image: "images/totebag.svg" },
  { id: 8, name: "TON Wallet", category: "ACCESSORIES", price: 159000, image: "images/wallet.svg" },
  { id: 9, name: "TON Mug", category: "LIFESTYLE", price: 89000, image: "images/mug.svg" },
  { id: 10, name: "TON Sneakers", category: "FOOTWEAR", price: 499000, image: "images/sneakers.svg" }
];

let cart = [];

const rupiah = n => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(n);

const grid = document.getElementById("productsGrid");
grid.innerHTML = products.map(p => `
  <article class="card">
    <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
    <div class="product-info">
      <small>${p.category}</small>
      <h3>${p.name}</h3>
      <div class="product-row">
        <strong class="price">${rupiah(p.price)}</strong>
        <button class="add" onclick="addToCart(${p.id})">+</button>
      </div>
    </div>
  </article>
`).join("");

function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);
  if (existing) existing.qty++;
  else cart.push({...item, qty: 1});
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cartItems");
  const count = cart.reduce((sum, p) => sum + p.qty, 0);
  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = rupiah(total);

  if (!cart.length) {
    items.innerHTML = `<p class="empty">Keranjang masih kosong.</p>`;
    return;
  }

  items.innerHTML = cart.map(p => `
    <div class="cart-item">
      <div><h4>${p.name} × ${p.qty}</h4><p>${rupiah(p.price * p.qty)}</p></div>
      <button class="remove" onclick="removeFromCart(${p.id})">REMOVE</button>
    </div>
  `).join("");
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}
function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

document.getElementById("cartBtn").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("overlay").onclick = closeCart;

document.getElementById("checkoutBtn").onclick = () => {
  if (!cart.length) return alert("Keranjang masih kosong.");
  const lines = cart.map(p => `• ${p.name} x${p.qty} = ${rupiah(p.price * p.qty)}`);
  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const message = `Halo TON Shop, saya ingin order:%0A%0A${lines.join("%0A")}%0A%0ATotal: ${rupiah(total)}%0A%0ANama:%0AAlamat:`;
  // GANTI nomor berikut dengan nomor WhatsApp toko.
  window.open(`https://wa.me/628567645605?text=${message}`, "_blank");
};

renderCart();
  
