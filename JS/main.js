const contenedorContenido = document.getElementById("contenedor-contenido");
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const closeButton = document.getElementsByClassName('close')[0];
const agregarCarrito = document.querySelectorAll('.contenido-grid a');
const finalizarCompra = document.getElementById('finalizar-compra');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const modalBody = document.querySelector('.modal-body');
const eliminarProductoButton = document.querySelector('.eliminar-producto');
const totalElement = document.getElementById('total');

let productosCarrito = [];
cargarEventos();

function cargarEventos() {
    document.addEventListener("DOMContentLoaded", cargarProductos);
    contenedorContenido.addEventListener("click", agregarProducto);
    carrito.addEventListener("click", () => modal.style.display = 'block');
    closeButton.addEventListener("click", () => modal.style.display = 'none');
    productosCarrito = JSON.parse(localStorage.getItem('productoStorage')) || [];
    mostrarProductos();
    modalBody.addEventListener('click', eliminarProducto);
}


function eliminarProducto(e){
    e.preventDefault();
    // // Obtener el elemento del producto en el carrito y eliminarlo
    // const producto = e.target.parentNode;
    // producto.remove();

    if (e.target.classList.contains('eliminar-producto')) {
        const idProducto = parseInt(e.target.getAttribute('id'));
        productosCarrito = productosCarrito.filter((producto => producto.id !== idProducto))
        guardarEnLocalStorage();
        mostrarProductos();
    }
    

};

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoAgregado = e.target.parentNode;
        datosProducto(productoAgregado);
    }
}

function datosProducto(producto) {
    const datosProduct = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: parseInt(producto.querySelector('span').textContent.replace('$', '')),
        id: parseInt(producto.querySelector('a').getAttribute('id')),
        cantidad: 1,
        subtotal: 0,
    };

    datosProduct.subtotal = datosProduct.precio * datosProduct.cantidad;

    agregarAlCarrito(datosProduct);
}

function agregarAlCarrito(productoAgregar) {
    const carritoConArticulo = productosCarrito.some((producto) => producto.id === productoAgregar.id);

    if (carritoConArticulo) {
        const productos = productosCarrito.map((producto) => {
            if (producto.id === productoAgregar.id) {
                producto.cantidad++;
                producto.subtotal = producto.precio * producto.cantidad;
            }
            return producto;
        });
        productosCarrito = productos;
    } else {
        productosCarrito.push(productoAgregar);
    }

    guardarEnLocalStorage();
    mostrarProductos();
}

function mostrarProductos() {
    eliminarProductoDelCarrito();

    productosCarrito.forEach((producto) => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;
        const div = document.createElement('div');
        div.classList.add('contenedor-producto');
        div.innerHTML = `
            <img src="${imagen}" width="100">
            <p>${nombre}</p>
            <p>${precio}</p>
            <p>${cantidad}</p>
            <p>${subtotal}</p>
            <a href="#" class="eliminar-producto" id="${id}">X</a>
        `;
        modalBody.appendChild(div);
    });

    calcularCarrito();
}

function calcularCarrito() {
    let total = productosCarrito.reduce((sumaTotal, producto) => sumaTotal + producto.subtotal, 0);
    totalElement.innerText = `Total: $${total}`;
}

//Funcion con un bucle que elimina producto del carrito

function eliminarProductoDelCarrito() {
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }
}

//Funcion que carga en el localStorage

function guardarEnLocalStorage() {
    localStorage.setItem('productoStorage', JSON.stringify(productosCarrito));
}


//Funcion que carga los productos desde el archivo js

function cargarProductos () {
    productos.forEach((producto) => {
    const divCreate = document.createElement('div');
    divCreate.classList.add('contenido-grid');
    divCreate.innerHTML += `
    <img src ="./img/${producto.img}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
    est dolorum, laboriosam sint atque repellat in exercitationem
    officiis laborum molestiae modi harum alias, eveniet ea assumenda,
    magnam numquam nemo? Voluptate.</p>
    <span>${producto.precio}</span>
    <a id=${producto.id} class="contenido-grid a agregar-carrito" href="#">Agregar</a>
    `;

    contenedorContenido.appendChild(divCreate);
    }
)}



//Eventos agregados a estas constantes para finalizar compra o vacear el carrito  
  
  finalizarCompra.addEventListener("click", () => {
      eliminarProductoDelCarrito()
      totalElement.innerText = "Total: $" + 0;
      localStorage.clear()
      Swal.fire(
        'Listo!',
        'Tu compra fue completada exitosamente!',
        'success'
      )
  });

  vaciarCarrito.addEventListener("click", () => {
    eliminarProductoDelCarrito()
    totalElement.innerText = "Total: $" + 0;
    localStorage.clear()
  });

