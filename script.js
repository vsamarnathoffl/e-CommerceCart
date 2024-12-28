document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  const productContainer = document.getElementById("product-container");
  const cartContainer = document.getElementById("cart-container");
  const emptyMessage = document.getElementById("empty-message");
  const totalCheckout = document.getElementById("total-checkout");
  const total = document.getElementById("total-amount");
  const checkout = document.getElementById("checkout");
  renderCart();
  products.forEach((product) => {
    let div = document.createElement("div");
    div.setAttribute("product-id", product.id);
    div.innerHTML = `
    <p>${product.name} - $${product.price}</p>
    <button>Add to Cart</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      addToCart(product);
    });

    productContainer.appendChild(div);
  });

  function addToCart(product) {
    carts.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartContainer.innerText = " ";
    let totalPrice = 0;
    if (carts.length > 0) {
      emptyMessage.classList.add("hidden");
      cartContainer.classList.remove("hidden");
      carts.forEach((cart) => {
        totalPrice += cart.price;
        let div = document.createElement("div");
        div.setAttribute("product-id", cart.id);
        div.innerHTML = `
        <p>${cart.name} - $${cart.price}</p>
        <button>Remove</button>
        `;
        div.querySelector('button').addEventListener('click',()=>{
            const index = carts.findIndex(c=>c.id===cart.id);
            carts.splice(index,1);
            saveCart()
            renderCart();
        })
        cartContainer.appendChild(div);
      });
    }
    if (totalPrice > 0) {
      totalCheckout.classList.remove("hidden");
      total.textContent = `Total: ${totalPrice.toFixed(2)}`;
    } else {
      totalCheckout.classList.add("hidden");
      cartContainer.classList.add("hidden");
      emptyMessage.classList.remove("hidden");
    }
  }
  function saveCart() {
    localStorage.setItem("carts", JSON.stringify(carts));
  }
  checkout.addEventListener("click", () => {
    alert("Checkout Successfully");
    carts.length = 0;
    saveCart();
    renderCart();
  });
});
