// --- Produits de démonstration ---
const products = {
  "chaussures-hommes": [
    { id: 1, name: "Baskets Nike", price: 25000, img: "images/nike.jpg" },
    { id: 2, name: "Mocassins Cuir", price: 30000, img: "images/mocassins.jpg" }
  ],
  "vetements-femmes": [
    { id: 3, name: "Robe élégante", price: 20000, img: "images/robe.jpg" },
    { id: 4, name: "Jean slim", price: 15000, img: "images/jean.jpg" }
  ]
};

// --- Récupérer la catégorie depuis l’URL ---
const params = new URLSearchParams(window.location.search);
const category = params.get("cat");

// --- Charger les produits ---
if (category && products[category]) {
  document.getElementById("category-title").innerText = category.replace("-", " ").toUpperCase();
  const container = document.getElementById("product-list");

  products[category].forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p class="price">${p.price} FCFA</p>
      <button class="btn-add" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Ajouter 🛒</button>
      <button class="btn-add" style="background:#fca311;" onclick="addToFavorites(${p.id}, '${p.name}')">❤️ Favori</button>
    `;
    container.appendChild(card);
  });
}

// --- Panier ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " ajouté au panier !");
}

// --- Favoris ---
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function addToFavorites(id, name) {
  favorites.push({ id, name });
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert(name + " ajouté aux favoris ❤️");
      }
// --- Notifications simples ---
const lastSeenIdKey = "lastSeenProductId_" + category;
let lastSeenId = parseInt(localStorage.getItem(lastSeenIdKey)) || 0;

// Vérifier si un nouveau produit est disponible
const newestProduct = products[category]?.[products[category].length - 1];
if(newestProduct && newestProduct.id > lastSeenId){
  showNotification("🎉 Nouveau produit disponible : " + newestProduct.name);
  localStorage.setItem(lastSeenIdKey, newestProduct.id);
}

// Fonction pour afficher notification
function showNotification(message){
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.innerText = message;
  document.body.appendChild(notif);

  // Style simple
  notif.style.position = "fixed";
  notif.style.bottom = "20px";
  notif.style.right = "20px";
  notif.style.background = "#fca311";
  notif.style.color = "#fff";
  notif.style.padding = "10px 20px";
  notif.style.borderRadius = "10px";
  notif.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
  notif.style.zIndex = "1000";

  setTimeout(() => {
    notif.remove();
  }, 5000); // disparaît après 5 secondes
    }
