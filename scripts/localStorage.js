export function storeProducts(defaultProducts) {
    defaultProducts.forEach(product => {
      if (product.name && product.quantity && product.price) {
        const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
        const productJson = JSON.stringify(plainProduct);
        localStorage.setItem(`Producto: ${product.id}`, productJson);
      }
    });
  }

