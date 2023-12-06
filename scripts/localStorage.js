// Esta función almacena productos en el almacenamiento local del navegador.
export function storeProducts(defaultProducts) {
    defaultProducts.forEach(product => {
      if (product.name && product.quantity && product.price) {
        // Crea un nuevo objeto con los detalles del producto.
        const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
        // Convierte el objeto del producto a una cadena JSON.
        const productJson = JSON.stringify(plainProduct);
        // Almacena el producto en el almacenamiento local y lo manda.
        localStorage.setItem(`Producto: ${product.id}`, productJson);
      }
    });
  }