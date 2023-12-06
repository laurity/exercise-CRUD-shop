export default class Inventory {
    #products; 

    // Constructor de la clase
    constructor() {
        this.#products = []; // Inicialización del array de productos una vez que se crea la instancia
    }

    addProduct(product) {
        this.products.push(product); // Agregar el producto al array de productos
        // Verificar y almacenar en el almacenamiento local (localStorage)
        if (product.name && product.quantity && product.price) {
            const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
            const productJson = JSON.stringify(plainProduct);
            localStorage.setItem(`Producto: ${product.id}`, productJson);
        }
        this.displayInventory(); // Actualizar la visualización del inventario
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id); // Filtrar y actualizar la lista de productos
        localStorage.removeItem(`Producto: ${id}`); // Eliminar el producto del almacenamiento local
        this.displayInventory(); // Actualizar la visualización del inventario
    }

    // Método para editar un producto en el inventario
    editProduct(id) {
        let product = this.products.find(product => product.id === id); // Encontrar el producto por id
        if (product) {
            // Crear un formulario para editar el producto
            let editForm = document.createElement('form');
            editForm.innerHTML = `
                <input type="text" id="editName" value="${product.name}">
                <input type="number" id="editQuantity" value="${product.quantity}">
                <input type="number" id="editPrice" value="${product.price}">
                <input type="hidden" id="editId" value="${product.id}">
                <button type="submit">Actualizar producto</button>
            `;
            // Evento de envío del formulario para actualizar el producto
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProduct(
                    document.getElementById('editId').value,
                    document.getElementById('editName').value,
                    document.getElementById('editQuantity').value,
                    document.getElementById('editPrice').value
                );
                editForm.remove(); // Elimina el formulario después de la actualización para que este no se quede en el DOM
            });
            document.body.appendChild(editForm); // Agregar el formulario al cuerpo del documento
        }
    }

    // Método para actualizar la información de un producto
    updateProduct(id, name, quantity, price) {
        let product = this.products.find(product => product.id == id); // Encuentra el producto por id
        localStorage.removeItem(`Producto: ${id}`); // Elimina1 la versión anterior del producto del almacenamiento local

        if (product) {
            // Actualizar la información del producto
            product.name = name;
            product.quantity = quantity;
            product.price = price;
            this.displayInventory(); // Actualizar la visualización del inventario
        }

        if (product.name && product.quantity && product.price) {
            const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
            const productJson = JSON.stringify(plainProduct);
            localStorage.setItem(`Producto: ${product.id}`, productJson);
        }
    }


    searchProduct(name) {
        // Filtrar productos que coincidan con el nombre proporcionado
        let filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
        this.displayInventory(filteredProducts); // Actualizar la visualización del inventario con los productos filtrados
    }

    // Método para visualizar el inventario
    displayInventory(products = this.products) {
        let tableBody = document.getElementById('add-rows'); 
        tableBody.innerHTML = ''; // Limpia el contenido actual de la tabla

        // Itera sobre los productos y agrega las filas a la tabla
        products.forEach(product => {
            let row = document.createElement('tr'); // Crear una nueva fila
            // Configura las celdas de la fila con la información del producto
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <button>Borrar</button>
                    <button>Editar</button>
                </td>
            `;
            // Configura los eventos de clic para los botones de borrar y editar
            row.querySelector('button:nth-child(1)').addEventListener('click', () => this.deleteProduct(product.id));
            row.querySelector('button:nth-child(2)').addEventListener('click', () => this.editProduct(product.id));

            tableBody.appendChild(row); // Agrega la fila a la tabla
        });
    }


    get products() {
        return this.#products;
    }

    set products(products) {
        this.#products = products;
    }
}