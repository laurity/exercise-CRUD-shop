const searchProduct = document.getElementById("product-search");
const buttonSearch = document.getElementById("search");
const newProduct = document.getElementById("form-add");
const newProductButton = document.getElementById("add");
const updateProduct = document.getElementById("update");
const message = document.getElementById("not-found");
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
    const cellAcciones = row.insertCell(4);

    cellId.textContent = product.id;
    cellNombre.textContent = product.nombre;
    cellCantidad.textContent = product.cantidad;
    cellPrecio.textContent = product.precio;

    cellAcciones.classList.add("acciones")

    const addEditButton = document.createElement("button");
    addEditButton.classList.add("edit")
    addEditButton.innerText = "🖍 Editar";
    addEditButton.addEventListener ("click", () => {

    })
    cellAcciones.appendChild(addEditButton);


    const addDeleteButton = document.createElement("button");
    addDeleteButton.classList.add("delete");
    addDeleteButton.setAttribute('id','delete');
    addDeleteButton.innerText = "🗑 Borrar";
    addDeleteButton.addEventListener ("click", () => {

    })
    cellAcciones.appendChild(addDeleteButton);
    };

  const buscarProducto = (name) => {
    if (name === ''){
      mostrarInventario();
      actionButtons.innerHTML= '';
    }
    else{
      const productoEncontrado = inventario.find(p => p.nombre.toLowerCase() === name.toLowerCase());
      if (productoEncontrado){
        mostrarInventario(productoEncontrado);
        message.innerHTML= '';
      }
      else{
        message.innerHTML= `<p>Producto no encontrado<p>`
      }
    }
   
    
  };

  const actualizarInventario = () => {
    newProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("nameInput").value;
      const stockInput = parseInt(document.getElementById("stockInput").value);
      const priceInput = parseFloat(document.getElementById("priceInput").value);
  
      if (nameInput && !isNaN(stockInput) && !isNaN(priceInput)) {
        const newItem = {
          id: inventario.length + 1,
          nombre: nameInput,
          cantidad: stockInput,
          precio: priceInput,
        };
  
        inventario.push(newItem);
        tbody.innerHTML = "";
  
        newProduct.reset();
  
        mostrarInventario();
        console.log(inventario);
      }
    });
  };
  
const eliminarInventario = (productName) =>{
  for (const product of inventario){
    if(product.nombre === productName){
      const index = inventario.indexOf(product);
      if (index !==-1){
        inventario.splice(index, 1);
        mostrarInventario();
        console.log(index);
          }
    }
  }
}

  mostrarInventario();

  //------------------------------------------------------------------------------

  buttonSearch.addEventListener("click", () => {
    const productName = searchProduct.value;
    buscarProducto(productName);
  });

  newProductButton.addEventListener("click", () =>{
    actualizarInventario();
  });

  const deleteProduct = document.getElementById("delete");

  deleteProduct.addEventListener("click", () =>{
    eliminarInventario(inventario);
  });
});