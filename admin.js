const addProductForm = document.getElementById('add-product-form');
const productListDiv = document.getElementById('product-list');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;
    const category = document.getElementById('product-category').value;

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        image: image,
        category: category
    };

    products.push(newProduct);
    renderProducts(products); // Update product list
    renderAdminProducts(); // update admin product list
});

function renderAdminProducts(){
    productListDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)} - ${product.category}
            <button class="remove-product" data-id="${product.id}">Remove</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

productListDiv.addEventListener('click',(event)=>{
    if(event.target.classList.contains('remove-product')){
        const productId = parseInt(event.target.dataset.id);
        products = products.filter(product => product.id !== productId);
        renderProducts(products);
        renderAdminProducts();
    }
})

renderAdminProducts();