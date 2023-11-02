//Llamadas a los ids
const searchProduct = document.getElementById("product-search");
const buttonSearch = document.getElementById("search");
const newProduct = document.getElementById("form-add");
const newProductButton = document.getElementById("add");
const message = document.getElementById("not-found");
const tbody = document.getElementById("add-rows");
const formEdit = document.getElementById("form-edit");
const total = document.getElementById("total");

let inventario; //Declaro la variable de inventario

document.addEventListener("DOMContentLoaded", () => {
  inventario = [
    { id: 1, nombre: "Camisetas", cantidad: 50, precio: 15 },
    { id: 2, nombre: "Pantalones", cantidad: 30, precio: 30 },
    { id: 3, nombre: "Zapatos", cantidad: 20, precio: 50 },
    { id: 4, nombre: "Sudaderas", cantidad: 40, precio: 20 },
    { id: 5, nombre: "Abrigos", cantidad: 25, precio: 40 },
    { id: 6, nombre: "Chaquetas", cantidad: 15, precio: 35 },
    { id: 7, nombre: "Faldas", cantidad: 60, precio: 25 },
    { id: 8, nombre: "Vestidos", cantidad: 50, precio: 40 },
    { id: 9, nombre: "Ropa interior", cantidad: 100, precio: 10 },
    { id: 10, nombre: "Medias", cantidad: 50, precio: 5 },
    { id: 11, nombre: "Calcetines", cantidad: 100, precio: 2 },
    { id: 12, nombre: "Lencería", cantidad: 50, precio: 30 },
    { id: 13, nombre: "Calzado deportivo", cantidad: 40, precio: 60 },
    { id: 14, nombre: "Sandalias", cantidad: 30, precio: 45 },
    { id: 15, nombre: "Botas", cantidad: 20, precio: 70 },
    { id: 16, nombre: "Accesorios para el cabello", cantidad: 50, precio: 10 },
    { id: 17, nombre: "Maquillaje", cantidad: 50, precio: 20 },
    { id: 18, nombre: "Perfumes", cantidad: 50, precio: 40 },
    { id: 19, nombre: "Bolsos", cantidad: 50, precio: 50 },
    { id: 20, nombre: "Carteras", cantidad: 50, precio: 40 },
  ];
  mostrarInventario(); //Llamada a la función mostrarInventario 
});


//-------------------------FUNCIONES-----------------------------------------------------

let totalInventario = 0; //Declaro la variable para poder iterar con el valor total de todos los productos

/**
 * Función que se encarga de mostrar los productos en el inventario
 * @param {*} product 
 */
const mostrarInventario = (product) => {
  tbody.innerHTML = ""; //Limpio la tabla

  if (product) {
    crearFila(product); //Si no existe ningún valor en la tabla, crea las filas
  } else {
    inventario.forEach((product) => {
      crearFila(product); //Si existe algún valor en la tabla, recorre la funcion crear filas
    });
  }
  mostrartotalInventario(); //Muestra la suma total de todos los productos
};

/**
 * Funcion que se encarga de mostrar la suma total de todos los productos
 */
const mostrartotalInventario = () => {
  totalInventario = 0; //Inicializo la variable a 0 para poder iterar con el valor total de todos los productos
  inventario.forEach((product) => { //Recorro la variable de inventario y va sumando el valor de cada fila
    totalInventario += product.cantidad * product.precio;
  });
  total.textContent = "El valor total del inventario es de: " + totalInventario.toFixed(2) +"€"; //Imprime por pantalla
};

/**
 * Función que se encarga de crear una fila de la tabla
 * @param {*} product 
 */
const crearFila = (product) => {
  //Inserto filas y celdas
  const row = tbody.insertRow();
  const cellId = row.insertCell(0);
  const cellNombre = row.insertCell(1);
  const cellCantidad = row.insertCell(2);
  const cellPrecio = row.insertCell(3);
  const cellAcciones = row.insertCell(4);
//Añado el valor de product a cada celda
  cellId.textContent = product.id;
  cellNombre.textContent = product.nombre;
  cellCantidad.textContent = product.cantidad;
  cellPrecio.textContent = product.precio;
//Creo una clase para darle estilo personalizado a la comulna acciones
  cellAcciones.classList.add("acciones");
//Creo el boton editar
  const addEditButton = document.createElement("button");
  addEditButton.classList.add("edit");
  addEditButton.setAttribute("id", `edit-${product.id}`);
  addEditButton.innerText = "🖍 Editar";
  addEditButton.addEventListener("click", () => {
    //Al clickar el boton editar, se crea una nueva ventana para editar el product
    formEdit.innerHTML = `
      <label>Cantidad</label>
      <input type="number" id="stockUpdate" placeholder= "Actualiza la cantidad aquí..." required>
      <label>Precio</label>
      <input type="number" step="0.01" id="priceUpdate" placeholder= "Actualiza la cantidad aquí..." required>
      <button id="updateButton" class="updateButton">Actualizar</button>
      `;
    const updateButton = document.getElementById("updateButton");
    updateButton.setAttribute("id", `updateButton-${product.id}`);
    updateButton.addEventListener("click", actualizarInventario); // Actualiza el valor del producto en el inventario llamando a la función actualizarInventario
    formEdit.append(updateButton);
  });
  cellAcciones.appendChild(addEditButton);

  const addDeleteButton = document.createElement("button");
  addDeleteButton.classList.add("delete");
  addDeleteButton.setAttribute("id", `delete-${product.id}`);
  addDeleteButton.addEventListener("click", eliminarInventario); //Elimina el producto del inventario llamando a la función eliminarInventario
  addDeleteButton.innerText = "🗑 Borrar";
  cellAcciones.appendChild(addDeleteButton);
};

/**
 * Funcion que se encarga de buscar un producto en el inventario
 * @param {*} name 
 */
const buscarProducto = (name) => {
  if (name === "") {  //Si está vacío te muestra el inventario
    mostrarInventario();
    actionButtons.innerHTML = "";
  } else {  //Si encuentra algun producto con el mismo nombre, le pasa el valor a name
    const productoEncontrado = inventario.find(
      (p) => p.nombre.toLowerCase() === name.toLowerCase()
    );

    if (productoEncontrado) { //Si producto encontrado es verdadero, se muestra name 
      mostrarInventario(productoEncontrado);
      message.innerHTML = "";
    } else { //Si es falso, se muestra un mensaje de error
      message.innerHTML = `<p>Producto no encontrado<p>`;
    }
  }
};

/**
 * Función que se encarga de crear un nuevo producto en el inventario
 */
const crearInventario = () => {
  newProduct.addEventListener("submit", (e) => {
    e.preventDefault(); //cancelamos el evento
    //añadimos los valores a traves de los inputs del formulario
    const nameInput = document.getElementById("nameInput").value;
    const stockUpdate = parseInt(document.getElementById("stockInput").value);
    const priceUpdate = parseFloat(document.getElementById("priceInput").value);

      //Creamos un nuevo item si se cumple las condiciones
    if (nameInput && !isNaN(stockUpdate) && !isNaN(priceUpdate)) {
      const newItem = {
        id: inventario.length + 1,
        nombre: nameInput,
        cantidad: stockUpdate,
        precio: priceUpdate,
      };
  //Agregamos el nuevo producto al inventario
      inventario.push(newItem);
      //Aumento el valor total del inventario
      totalInventario += priceUpdate * stockUpdate;
      tbody.innerHTML = ""; //Limpio la tabla

      newProduct.reset(); //Reseteamos el formulario

      mostrarInventario(); //Mostramos el inventario
      console.log(inventario);
    }
  });
};

/**
 * Función que se encarga de actualizar un producto en el inventario
 * @param {*} e 
 */
const actualizarInventario = (e) => {
  const product = inventario.find( //Si el id de p coincide con el id del boton de editar, se actualiza el producto en el inventario
    (p) => p.id.toString() === e.target.id.slice(13)
  );

  if (product) {
    product.cantidad = parseInt(document.getElementById("stockUpdate").value);
    product.precio = parseFloat(document.getElementById("priceUpdate").value);
    formEdit.innerHTML = ``; //Elimino el formulario
    totalInventario += product.precio * product.cantidad;
    mostrarInventario();
  }
};

/**
 * Función que se encarga de eliminar un producto en el inventario
 * @param {*} e 
 */

const eliminarInventario = (e) => {
  inventario.forEach((product) => { // Coge desde el principio hasta el final de los ids
    if (product.id.toString() === e.target.id.slice(7)) { //Si coincide con el id del boton de borrar, se elimina el producto del inventario
      totalInventario -= product.precio * product.cantidad;
      inventario.splice(inventario.indexOf(product), 1); //Elimino el producto del inventario en el indice indicado
      mostrarInventario();
    }
  });
};

//-----------------------EVENTOS-------------------------------------------------------

buttonSearch.addEventListener("click", () => {  //Busca un producto en el inventario si se clickea en el botón de buscar
  const productName = searchProduct.value; //Le asignamos el valor del input de búsqueda a la variable para poder llamar a la función
  buscarProducto(productName);
});

newProductButton.addEventListener("click", crearInventario);  //Si se clickea en el botón de crear, se crea una ventana para crear un nuevo producto
