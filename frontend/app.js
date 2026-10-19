const API_URL = 'http://localhost:3000/api/products';

let editingId = null;

const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');
const message = document.getElementById('message');


// Display messages
function showMessage(text, success = true) {
    message.textContent = text;
    message.style.display = 'block';

    if (success) {
        message.style.backgroundColor = '#d1e7dd';
        message.style.color = '#0f5132';
    } else {
        message.style.backgroundColor = '#f8d7da';
        message.style.color = '#842029';
    }

    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}


// Load all products
async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Failed to load products');
        }

        const products = await response.json();

        tableBody.innerHTML = '';

        products.forEach(product => {

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.id}</td>

                <td>${product.product_name}</td>

                <td>${product.category}</td>

                <td>K${Number(product.price).toFixed(2)}</td>

                <td>${product.brand}</td>

                <td>${product.description || ''}</td>

                <td>${product.stock_quantity}</td>

                <td class="actions">

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>

                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        showMessage(error.message, false);
    }
}


// Create or update product
form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const product = {
        product_name: document.getElementById('product_name').value,
        category: document.getElementById('category').value,
        price: Number(document.getElementById('price').value),
        brand: document.getElementById('brand').value,
        description: document.getElementById('description').value,
        stock_quantity: Number(
            document.getElementById('stock_quantity').value
        )
    };

    try {

        let response;

        if (editingId === null) {

            // CREATE
            response = await fetch(API_URL, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(product)
            });

        } else {

            // UPDATE
            response = await fetch(`${API_URL}/${editingId}`, {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(product)
            });
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Operation failed');
        }

        if (editingId === null) {
            showMessage('Product created successfully!');
        } else {
            showMessage('Product updated successfully!');
        }

        resetForm();

        loadProducts();

    } catch (error) {

        showMessage(error.message, false);

    }
});


// Edit product
async function editProduct(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const product = await response.json();

        if (!response.ok) {
            throw new Error(product.error);
        }

        editingId = id;

        document.getElementById('product_name').value =
            product.product_name;

        document.getElementById('category').value =
            product.category;

        document.getElementById('price').value =
            product.price;

        document.getElementById('brand').value =
            product.brand;

        document.getElementById('description').value =
            product.description;

        document.getElementById('stock_quantity').value =
            product.stock_quantity;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    } catch (error) {

        showMessage(error.message, false);

    }
}


// Delete product
async function deleteProduct(id) {

    const confirmed = confirm(
        'Are you sure you want to delete this product?'
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        showMessage('Product deleted successfully!');

        loadProducts();

    } catch (error) {

        showMessage(error.message, false);

    }
}


// Reset form
function resetForm() {

    form.reset();

    editingId = null;

}


// Load products when page opens
loadProducts();