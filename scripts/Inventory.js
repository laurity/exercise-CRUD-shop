import Product from './Product.js';


class Inventory {
    #products;
    constructor() {
        this.#products = [
            
        ];
    }

    addProduct(product) {
        this.products.push(product);
        this.displayInventory();
    }


    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.displayInventory();
    }

    editProduct(id) {
        let product = this.products.find(product => product.id === id);
        if (product) {
            let editForm = document.createElement('form');
            editForm.innerHTML = `
                <input type="text" id="editName" value="${product.name}">
                <input type="number" id="editQuantity" value="${product.quantity}">
                <input type="number" id="editPrice" value="${product.price}">
                <input type="hidden" id="editId" value="${product.id}">
                <button type="submit">Actualizar producto</button>
            `;
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProduct(
                    document.getElementById('editId').value,
                    document.getElementById('editName').value,
                    document.getElementById('editQuantity').value,
                    document.getElementById('editPrice').value
                );
                editForm.remove();
            });
            document.body.appendChild(editForm);
        }
    }

    updateProduct(id, name, quantity, price) {
        let product = this.products.find(product => product.id == id);
        if (product) {
            product.name = name;
            product.quantity = quantity;
            product.price = price;
            this.displayInventory();
        }
    }

    searchProduct(name) {
        let filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
        this.displayInventory(filteredProducts);
    }

    displayInventory(products = this.products) {
        let tableBody = document.getElementById('add-rows');
        tableBody.innerHTML = '';
        products.forEach(product => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <button>Borrar</button>
                    <button>Editar</button>
                </td>
            `;
            row.querySelector('button:nth-child(1)').addEventListener('click', () => this.deleteProduct(product.id));
            row.querySelector('button:nth-child(2)').addEventListener('click', () => this.editProduct(product.id));
            tableBody.appendChild(row);
        });
    }

    get products() {
        return this.#products;
    }
    set products(products) {
        this.#products = products;
    }
}

export default Inventory;