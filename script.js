const products = [
    { id: 1, name: 'Tomatoes', price: 40, image: 'tomato.jpg', category: 'Vegetables' },
    { id: 2, name: 'Apples', price: 120, image: 'apple.jfif', category: 'Fruits' },
    { id: 3, name: 'Carrots', price: 35, image: 'carrots.jfif', category: 'Vegetables' },
    { id: 4, name: 'Bananas', price: 30, image: 'bananas.jfif', category: 'Fruits' },
    { id: 5, name: 'Oranges', price: 50, image: 'oranges.jfif', category: 'Fruits' },
    { id: 6, name: 'Potatoes', price: 30, image: 'potatoes.jfif', category: 'Vegetables' },
    { id: 7, name: 'Onions', price: 25, image: 'onions.jfif', category: 'Vegetables' },
    { id: 8, name: 'Grapes', price: 90, image: 'grapes.jfif', category: 'Fruits' },
    { id: 9, name: 'Strawberries', price: 120, image: 'strawberries.jfif', category: 'Fruits' },
    { id: 10, name: 'Broccoli', price: 60, image: 'broccoli.jfif', category: 'Vegetables' },
    { id: 11, name: 'Cucumbers', price: 20, image: 'cucumbers.jfif', category: 'Vegetables' },
    { id: 12, name: 'Lemons', price: 10, image: 'lemons.jfif', category: 'Fruits' },
    { id: 13, name: 'Mangoes', price: 70, image: 'mangoes.jfif', category: 'Fruits' },
    { id: 14, name: 'Pineapples', price: 30, image: 'pineapples.jfif', category: 'Fruits' },
    { id: 15, name: 'Watermelons', price: 25, image: 'watermelons.jfif', category: 'Fruits' },
    { id: 16, name: 'Guava', price: 40, image: 'guava.jfif', category: 'Fruits' },
    { id: 17, name: 'Ladiesfinger', price: 35, image: 'ladiesfinger.jfif', category: 'Vegetables' },
    { id: 18, name: 'Coriander', price: 10, image: 'coriander.jfif', category: 'Vegetables' },
];

const productGrid = document.querySelector('.product-grid');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutButton = document.querySelector('.checkout-button');
const cartPage = document.querySelector('.cart-page');
const cartIcon = document.querySelector('.cart-icon');
const backToProducts = document.querySelector('.back-to-products');
const paymentContainer = document.querySelector('.payment-container');
const backToProductsPayment = document.querySelector('.back-to-products-payment');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.getElementById('search-input');
const cartSection = document.getElementById('cart-section');
const homeSection = document.getElementById('home-section');
const paymentSection = document.getElementById('payment-section');
const paymentStatus = document.getElementById('payment-status');

let cart = [];

function renderProducts(productList) {
    productGrid.innerHTML = '';
    const categories = [...new Set(productList.map(product => product.category))];

    categories.forEach(category => {
        const categoryProducts = productList.filter(product => product.category === category);
        if (categoryProducts.length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `<h2>${category}</h2><div class="category-grid"></div>`;
            productGrid.appendChild(categoryDiv);

            const categoryGrid = categoryDiv.querySelector('.category-grid');

            categoryProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₹${product.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-minus" data-id="${product.id}">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                `;
                categoryGrid.appendChild(productDiv);
            });
        }
    });
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemLi = document.createElement('li');
        itemLi.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
            <span>${item.name} x ${item.quantity} kg</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(itemLi);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function updateCartCount() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

productGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.dataset.id);
        const product = products.find(p => p.id === productId);
        const quantity = parseInt(event.target.parentElement.querySelector('.quantity').textContent);
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        renderCart();
    } else if (event.target.classList.contains('quantity-plus')) {
        const quantitySpan = event.target.parentElement.querySelector('.quantity');
        quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
    } else if (event.target.classList.contains('quantity-minus')) {
        const quantitySpan = event.target.parentElement.querySelector('.quantity');
        const currentQuantity = parseInt(quantitySpan.textContent);
        if (currentQuantity > 1) {
            quantitySpan.textContent = currentQuantity - 1;
        }
    }
});

cartIcon.addEventListener('click', () => {
    cartSection.style.display = 'block';
    homeSection.style.display = 'none';
});

backToProducts.addEventListener('click', () => {
    cartSection.style.display = 'none';
    homeSection.style.display = 'block';
});

checkoutButton.addEventListener('click', () => {
    cartSection.style.display = 'none';
    paymentSection.style.display = 'block';
});

backToProductsPayment.addEventListener('click', () => {
    paymentSection.style.display = 'none';
    homeSection.style.display = 'block';
});

paymentSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('payment-option')) {
        const paymentMethod = event.target.textContent;
        paymentStatus.textContent = `Processing payment via ${paymentMethod}...`;
        setTimeout(() => {
            paymentStatus.textContent = 'Payment successful!';
        }, 2000);
    }
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
});

cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = parseInt(event.target.dataset.index);
        cart.splice(index, 1);
        renderCart();
    }
});

let deliveryAddress = {};

checkoutButton.addEventListener('click', () => {
    cartSection.style.display = 'none';
    paymentSection.style.display = 'block';
    deliveryAddress = {
        name: document.getElementById('delivery-name').value,
        addressLine1: document.getElementById('delivery-address-line1').value,
        addressLine2: document.getElementById('delivery-address-line2').value,
        city: document.getElementById('delivery-city').value,
        state: document.getElementById('delivery-state').value,
        pincode: document.getElementById('delivery-pincode').value,
        phone: document.getElementById('delivery-phone').value,
    };
});

paymentSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('payment-option')) {
        let paymentMethod;
        if (event.target.classList.contains('upi-option')){
            paymentMethod = event.target.dataset.payment;
        } else {
            paymentMethod = event.target.textContent;
        }
        paymentStatus.textContent = `Processing payment via ${paymentMethod}...`;
        setTimeout(() => {
            paymentStatus.textContent = 'Payment successful!';
            console.log('Delivery Address:', deliveryAddress); // Log the delivery address
        }, 2000);
    }
});
renderProducts(products);
renderCart();
updateCartCount();