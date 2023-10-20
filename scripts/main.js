const searchProduct = document.getElementById('product-search');
const buttonSearch = document.getElementById('search-button');
const newProduct = document.getElementById('new');
const updateProduct = document.getElementById('update');
const deleteProduct = document.getElementById('delete');
const actionButtons = document.getElementById('action-inputs');
const addProduct = document.getElementById('add-rows');

document.addEventListener('DOMContentLoaded', () =>{
    const inventario =[
        { id: 1, nombre: "Camisetas", cantidad: 50, precio: 15},
        { id: 2, nombre: "Pantalones", cantidad: 30, precio: 30},
        { id: 3, nombre: "Zapatos", cantidad: 20, precio: 50},
        ];
        
        /**
         * PARTE 1
         */
        
        //Añadimos nueva sección
        inventario.push({ id: 4, nombre: "Gorras", cantidad: 40, precio: 18 });
        
        //Actualizar Camisetas
        const tShirts = inventario.find(inventario => inventario.nombre === "Camisetas");
        if (tShirts){
            tShirts.cantidad = 40;
            tShirts.precio = 18;
        }
        console.log(inventario);
        console.log(tShirts);    

//Variable para sumar inventario
let totalInventario = 0;

/**
 * PARTE 2  
 */

//En caso de que no lo encuentre, que salga no encontrado


const buscarProducto = (product) =>{
}


//Agregar inventario o si no actualizarlo
const actualizarInventario = () =>{
}


//Eliminar el producto
const eliminarProducto = () =>{};


//Mostrar suma inventario final
    for (const item of inventario) {
        totalInventario += item.cantidad * item.precio;
    }
    console.log("Es " + totalInventario);
});

function mostrarInventario() {
    addProduct.innerHTML = "";

    inventario.forEach(producto => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = producto.id;
        row.appendChild(idCell);

        const nombreCell = document.createElement("td");
        nombreCell.textContent = producto.nombre;
        row.appendChild(nombreCell);

        const cantidadCell = document.createElement("td");
        cantidadCell.textContent = producto.cantidad;
        row.appendChild(cantidadCell);

        const precioCell = document.createElement("td");
        precioCell.textContent = producto.precio;
        row.appendChild(precioCell);

        addProduct.appendChild(row);
    });
    mostrarInventario();
}