const cart = [];

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(subtotal);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)" style="width: 60px" />
      </td>
      <td>R$ ${subtotal}</td>
      <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">🗑️</button></td>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(index, value) {
  cart[index].quantity = parseInt(value);
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartDisplay();
}

function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const summary = cart.map(item => `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n');

  const message = `Resumo do pedido:\n\n${summary}\n\nTotal: R$ ${total.toFixed(2)}\n\nEscolha a forma de pagamento:\n\n✅ PIX: https://seupix.com\n💳 Cartão: https://seucartao.com`;

  alert(message);
  // Para produção: redirecionar para o meio de pagamento real
  // window.location.href = "https://seupagamento.com";
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
      };
      addToCart(product);
    });
  });
});
