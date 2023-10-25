const searchProduct = document.getElementById("product-search");
const buttonSearch = document.getElementById("search");
const newProduct = document.getElementById("form-add");
const newProductButton = document.getElementById("add");
const message = document.getElementById("not-found");
const tbody = document.getElementById("add-rows");
const modal = document.getElementById("modal");
const updateForm = document.getElementById("update-form");
const updateButton = document.getElementById("updateButton");

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
  const mostrarInventario = (product) => {
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

    cellAcciones.classList.add("acciones");

    const newSearchUpdate = document.createElement("a");
    const editURL = `../updateItem.html`; // Cambia esta URL según tus necesidades
    newSearchUpdate.setAttribute("href", editURL);

    const addEditButton = document.createElement("button");
    addEditButton.classList.add("edit");
    addEditButton.setAttribute("id", `edit-${product.id}`);
    addEditButton.innerText = "🖍 Editar";
    addEditButton.addEventListener("click", () => {});
    newSearchUpdate.append(addEditButton);

    cellAcciones.appendChild(newSearchUpdate); 

    const addDeleteButton = document.createElement("button");
    addDeleteButton.classList.add("delete");
    addDeleteButton.setAttribute("id", `delete-${product.id}`);
    addDeleteButton.addEventListener('click', eliminarInventario);
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
      const stockInput = parseInt(document.getElementById("stockInput").value);
      const priceInput = parseFloat(
        document.getElementById("priceInput").value
      );

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

  const mostrarModal = (e) =>{
    inventario.forEach(product =>{
      if(product.id.toString() === e.target.id.slice(7)){

      }
    })
  }

  const eliminarInventario = (e) => {

    inventario.forEach(product =>{
      if(product.id.toString() === e.target.id.slice(7)){ // Coge desde el principio hasta el final
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
