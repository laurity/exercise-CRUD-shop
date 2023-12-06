import Product from './Product.js';
import Inventory from './Inventory.js';

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

defaultProducts.forEach(product => inventory.addProduct(product));


const addForm = document.getElementById('form-add');
addForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const quantity = document.getElementById('stockInput').value;
  const price = document.getElementById('priceInput').value;
  const id = Date.now();

  const product = new Product(id, name, quantity, price);
  inventory.addProduct(product);
  this.reset();
});

const editForm = document.getElementById('form-edit');
editForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const quantity = document.getElementById('stockInput').value;
  const price = document.getElementById('priceInput').value;
  const id = document.getElementById('editId').value;

  inventory.updateProduct(id, name, quantity, price);
  this.reset();
});

const searchInput = document.getElementById('product-search');
searchInput.addEventListener('input', function(e) {
  const searchValue = e.target.value;
  inventory.searchProduct(searchValue);
});