import Product from './Product.js';
import Inventory from './Inventory.js';
import { storeProducts } from './localStorage.js';

// Crear una nueva instancia de la clase Inventory
const inventory = new Inventory();

let defaultProducts = [
  new Product(1, 'Camiseta', 20, 15.00),
    new Product(2, 'Pantalón', 30, 25.99),
    new Product(3, 'Falda', 15, 20.15),
    new Product(4, 'Zapatos', 50, 45.99),
    new Product(5, 'Sombrero', 10, 10.75),
    new Product(6, 'Bufanda', 15, 7.99),
    new Product(7, 'Guantes', 25, 9.99),
    new Product(8, 'Cinturón', 35, 12.99),
    new Product(9, 'Calcetines', 45, 2.99),
    new Product(10, 'Corbata', 55, 19.99),
    new Product(11, 'Chaqueta', 30, 49.99),
    new Product(12, 'Jeans', 40, 39.99),
    new Product(13, 'Sudadera', 50, 29.99),
    new Product(14, 'Gorra', 60, 14.99),
    new Product(15, 'Zapatillas', 70, 59.99),
]

// Añadir los productos por defecto al inventario
defaultProducts.forEach(product => inventory.addProduct(product));
// Llamada a la función para almacenar los productos en el almacenamiento local
storeProducts(defaultProducts);

// Obtener el formulario de añadir
const addForm = document.getElementById('form-add');
// Añadir un evento de envío al formulario
addForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const quantity = document.getElementById('stockInput').value;
  const price = document.getElementById('priceInput').value;
  const id = Date.now(); // Usar la fecha actual como id

  // Crear un nuevo producto con los valores obtenidos
  const product = new Product(id, name, quantity, price);
  // Añadir el producto al inventario
  inventory.addProduct(product);
  this.reset(); // Limpiar el formulario
});

// Obtener el formulario de editar
const editForm = document.getElementById('form-edit');
// Añadir un evento de envío al formulario
editForm.addEventListener('submit', function(e) {
  e.preventDefault(); 
  const name = document.getElementById('nameInput').value;
  const quantity = document.getElementById('stockInput').value;
  const price = document.getElementById('priceInput').value;
  const id = document.getElementById('editId').value;

  // Actualizar el producto en el inventario con los nuevos valores
  inventory.updateProduct(id, name, quantity, price);
  this.reset(); 
});

// Obtener el campo de búsqueda
const searchInput = document.getElementById('product-search');
// Añadir un evento de entrada al campo de búsqueda
searchInput.addEventListener('input', function(e) {
  const searchValue = e.target.value; // Obtener el valor de búsqueda
  // Buscar el producto en el inventario
  inventory.searchProduct(searchValue);
});

// valor del inventario

let totalValue = inventory.calculateTotalValue();
let totalElement = document.getElementById('total');
totalElement.textContent = `Total del valor del inventario: ${totalValue.toFixed(2)}`;