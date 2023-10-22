const searchProduct = document.getElementById("product-search");
const buttonSearch = document.getElementById("search");
const newProduct = document.getElementById("new");
const updateProduct = document.getElementById("update");
const deleteProduct = document.getElementById("delete");
const actionButtons = document.getElementById("action-inputs");
const tbody = document.getElementById("add-rows");

document.addEventListener("DOMContentLoaded", () => {
  let inventario = [
    { id: 1, nombre: "Camisetas", cantidad: 50, precio: 15 },
    { id: 2, nombre: "Pantalones", cantidad: 30, precio: 30 },
    { id: 3, nombre: "Zapatos", cantidad: 20, precio: 50 },
  ];

  // PARTE 1

  // Añadimos una nueva sección
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

  // Suma del total del valor del inventario
  for (const item of inventario) {
    totalInventario += item.cantidad * item.precio;
  }
  console.log("El valor total del inventario es " + totalInventario);

  //------------------------------------------------------------------------------
  const mostrarInventario = product => {
    tbody.innerHTML = "";

    if (product) {
      crearFila(product);
    } else {
      inventario.forEach((product) => {
        crearFila(product);
      });
    }
  };

  /**
   * Funcion que se encarga de crear una fila de la tabla
   * @param {*} product producto
   */
  const crearFila = (product) => {
    const row = tbody.insertRow();
    const cellId = row.insertCell(0);
    const cellNombre = row.insertCell(1);
    const cellCantidad = row.insertCell(2);
    const cellPrecio = row.insertCell(3);

    cellId.textContent = product.id;
    cellNombre.textContent = product.nombre;
    cellCantidad.textContent = product.cantidad;
    cellPrecio.textContent = product.precio;
  };

  const buscarProducto = (name) => {
    if (name === ''){
      mostrarInventario();
      actionButtons.innerHTML= '';
    }
    else{
      /*let check = false;
      let index;
      for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre.toLowerCase() === name) {
          mostrarInventario(i);
        } 
      }*/

      const productoEncontrado = inventario.find(p => p.nombre.toLowerCase() === name.toLowerCase());
      if (productoEncontrado){
        mostrarInventario(productoEncontrado);
        actionButtons.innerHTML= '';
      }
      else{
        actionButtons.innerHTML= `<span>Producto no encontrado</span>`
      }
    }
   
    
  };

  const actualizarInventario = (nombre, cantidad, precio) => {
    //OJO QUE SI FILTRO PUEDO SOBRESCRIBIR. DEBO DE llamar a mostrarInventario
  };

  mostrarInventario();

  searchProduct
  buttonSearch.addEventListener("click", () => {
    const productName = searchProduct.value;
    buscarProducto(productName);
  });
});
