// JOIN US button fade and redirect
document.getElementById('joinUsBtn')?.addEventListener('click', function () {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'JoinUsForm.html';
  }, 500);
});

// Load from localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save to localStorage
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Show toast
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  document.getElementById('toast-container').appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Add to Favorites
function addToFavorites(itemName) {
  if (!favorites.includes(itemName)) {
    favorites.push(itemName);
    saveFavorites();
    showToast(`✔ ${itemName} added to favorites!`);
  } else {
    showToast(`⚠ ${itemName} is already in favorites.`);
  }
}

// Add to Cart
function addToCart(itemName) {
  if (!cart.includes(itemName)) {
    cart.push(itemName);
    saveCart();
    showToast(`✔ ${itemName} added to cart!`);
  } else {
    showToast(`⚠ ${itemName} is already in your cart.`);
  }
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Favorites buttons
  document.querySelectorAll('.favorite-btn').forEach(button => {
    const nameElem = button.nextElementSibling;
    const itemName = nameElem ? nameElem.textContent.trim() : "Unknown Item";

    button.addEventListener('click', () => {
      addToFavorites(itemName);
    });
  });

  // Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    const nameElem = button.previousElementSibling?.previousElementSibling;
    const itemName = nameElem ? nameElem.textContent.trim() : "Unknown Item";

    button.addEventListener('click', () => {
      addToCart(itemName);
    });
  });

  // Optional: Join form submission logic
  const form = document.getElementById('joinForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      try {
        const res = await fetch('http://localhost:3000/api/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });

        if (res.ok) {
          alert('Successfully joined!');
          form.reset();
        } else {
          alert('Error saving your info.');
        }
      } catch (err) {
        console.error("Join error:", err);
        alert("Could not connect to the server.");
      }
    });
  }
});