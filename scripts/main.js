const searchProduct = document.getElementById('product-search');
const buttonSearch = document.getElementById('search-button');
const newProduct = document.getElementById('new');
const updateProduct = document.getElementById('update');
const deleteProduct = document.getElementById('delete');
const actionButtons = document.getElementById('action-inputs');
const tbody = document.getElementById("add-rows");

document.addEventListener('DOMContentLoaded', (actualizarInventario) => {
    const inventario = [
        { id: 1, nombre: "Camisetas", cantidad: 50, precio: 15 },
        { id: 2, nombre: "Pantalones", cantidad: 30, precio: 30 },
        { id: 3, nombre: "Zapatos", cantidad: 20, precio: 50 },
    ];

    // PARTE 1

    // Añadimos nueva sección
    inventario.push({ id: 4, nombre: "Gorras", cantidad: 40, precio: 18 });

    // Actualizar Camisetas
    const tShirts = inventario.find((item) => item.nombre === "Camisetas");
    if (tShirts) {
        tShirts.cantidad = 40;
        tShirts.precio = 18;
    }

    console.log(inventario);
    console.log(tShirts);

    // Variable para sumar inventario
    let totalInventario = 0;

    // Mostrar suma del inventario final
    for (const item of inventario) {
        totalInventario += item.cantidad * item.precio;
    }
    console.log("El valor total del inventario es " + totalInventario);

    //------------------------------------------------------------------------------

    
});
