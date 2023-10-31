const searchProduct = document.getElementById("product-search");
const buttonSearch = document.getElementById("search");
const newProduct = document.getElementById("form-add");
const newProductButton = document.getElementById("add");
const message = document.getElementById("not-found");
const tbody = document.getElementById("add-rows");
const formEdit = document.getElementById("form-edit");

document.addEventListener("DOMContentLoaded", () => {
  let inventario = [
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
  // PARTE 1

  // Añadimos una nueva sección
  inventario.push({ id: inventario.length+1, nombre: "Gorras", cantidad: 40, precio: 18 });

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
  const mostrarInventario = (product) => {
    tbody.innerHTML = "";

    if (product) {
      crearFila(product);
    }
    else {
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

    cellAcciones.classList.add("acciones");



    const addEditButton = document.createElement("button");
    addEditButton.classList.add("edit");
    addEditButton.setAttribute("id", `edit-${product.id}`);
    addEditButton.innerText = "🖍 Editar";
    addEditButton.addEventListener("click", () =>{
      formEdit.innerHTML = `
      <label>Cantidad</label>
      <input type="number" id="stockUpdate" placeholder= "Actualiza la cantidad aquí..." required>
      <label>Precio</label>
      <input type="number" step="0.01" id="priceUpdate" placeholder= "Actualiza la cantidad aquí..." required>
      <button id="updateButton" class="updateButton">Actualizar</button>
      `;
      const updateButton = document.getElementById("updateButton");
      updateButton.setAttribute("id", `updateButton-${product.id}`);
      updateButton.addEventListener("click", actualizarInventario);
    });
    cellAcciones.append(addEditButton);

    const addDeleteButton = document.createElement("button");
    addDeleteButton.classList.add("delete");
    addDeleteButton.setAttribute("id", `delete-${product.id}`);
    addDeleteButton.addEventListener("click", eliminarInventario);
    addDeleteButton.innerText = "🗑 Borrar";
    cellAcciones.appendChild(addDeleteButton);
  };
 
  const buscarProducto = (name) => {
    if (name === "") {
      mostrarInventario();
      actionButtons.innerHTML = "";
    } else {
      const productoEncontrado = inventario.find(
        (p) => p.nombre.toLowerCase() === name.toLowerCase()
      );
      if (productoEncontrado) {
        mostrarInventario(productoEncontrado);
        message.innerHTML = "";
      } else {
        message.innerHTML = `<p>Producto no encontrado<p>`;
      }
    }
  };

  const crearInventario = () => {
    newProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("nameInput").value;
      const stockUpdate = parseInt(document.getElementById("stockUpdate").value);
      const priceUpdate = parseFloat(
        document.getElementById("priceUpdate").value
      );

      if (nameInput && !isNaN(stockUpdate) && !isNaN(priceUpdate)) {
        const newItem = {
          id: inventario.length + 1,
          nombre: nameInput,
          cantidad: stockUpdate,
          precio: priceUpdate,
        };

        inventario.push(newItem);
        tbody.innerHTML = "";

        newProduct.reset();

        mostrarInventario();
        console.log(inventario);
      }
    });
  };

  const actualizarInventario = (e) => {
    const product = inventario.find(
      (p) => p.id.toString() === e.target.id.slice(13)
    );
  
    if (product) {
      product.cantidad = parseInt(document.getElementById("stockUpdate").value);
      product.precio = parseFloat(document.getElementById("priceUpdate").value);
      mostrarInventario();
    }
  };
  

  const eliminarInventario = (e) => {
    inventario.forEach((product) => {
      if (product.id.toString() === e.target.id.slice(7)) {
        // Coge desde el principio hasta el final
        inventario.splice(inventario.indexOf(product), 1);
        mostrarInventario();
      }
    });
  };

  mostrarInventario();

  //------------------------------------------------------------------------------

  buttonSearch.addEventListener("click", () => {
    const productName = searchProduct.value;
    buscarProducto(productName);
  });

  newProductButton.addEventListener("click", () => {
    crearInventario();
  });
  
});
