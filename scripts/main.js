const searchProduct = document.getElementById('product-search');
const buttonSearch = document.getElementById('search');
const newProduct = document.getElementById('new');
const updateProduct = document.getElementById('update');
const deleteProduct = document.getElementById('delete');
const actionButtons = document.getElementById('action-inputs');
const tbody = document.getElementById("add-rows");

document.addEventListener('DOMContentLoaded', () => {
    let inventario = [
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
    const mostrarInventario = () => {
        tbody.innerHTML = "";

        inventario.forEach((product) => {
            const row = tbody.insertRow();
            const cellId = row.insertCell(0);
            const cellNombre = row.insertCell(1);
            const cellCantidad = row.insertCell(2);
            const cellPrecio = row.insertCell(3);
            
            cellId.textContent = product.id;
            cellNombre.textContent = product.nombre;
            cellCantidad.textContent = product.cantidad;
            cellPrecio.textContent = product.precio;
          });
    };
    
    const buscarProducto = (name) => {
        let findProduct = false;
        name = name.toLowerCase(); 
        for (let i = 0; i < inventario.length; i++) {
            if (inventario[i].nombre.toLowerCase() === name) {
                mostrarInventario(i);
                findProduct = true;
                break;
        }
        
    }
}

mostrarInventario();



buttonSearch.addEventListener('click', () => {
    const productName = searchProduct.value;
    buscarProducto(productName);
});

});
