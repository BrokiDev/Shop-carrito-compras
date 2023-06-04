const contenedorContenido = document.getElementById("contenedor-contenido")
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const closeButton = document.getElementsByClassName('close')[0];
const agregarCarrito = document.querySelectorAll('.contenido-grid a');
const finalizarCompra = document.getElementById('finalizar-compra');
const vaciarCarrito = document.getElementById('vaciar-carrito');

 
let productosCarrito = [];
cargarEventos();


carrito.addEventListener("click", () => modal.style.display = 'block');


closeButton.addEventListener("click", () => modal.style.display = 'none');

function cargarEventos() {
    document.addEventListener("DOMContentLoaded", () => cargarProductos())

    contenedorContenido.addEventListener("click", agregarProducto);
}



function agregarProducto(e) {
    e.preventDefault();
//    const modalBody = document.querySelector('.modal-body');
//    modalBody.appendChild(divCreate)
if (e.target.classList.contains('agregar-carrito')){
    const productoAgregado = e.target.parentNode;
    // console.log(productoAgregado);

    datosProducto(productoAgregado);
}

}

function datosProducto(producto) {
    const datosProduct = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio:  parseInt(producto.querySelector('span').textContent.replace('$','')),
        id: parseInt(producto.querySelector('a').getAttribute('id')),
        cantidad: 1,
        subtal: 0,
    }

    datosProduct.subtal = datosProduct.precio * datosProduct.cantidad;

    agregarAlCarrito(datosProduct);
}


function agregarAlCarrito(productoAgregar) {
    // console.log(productoAgregar);
    // console.log(productosCarrito);
   const carritoConArticulo = productosCarrito.some((producto) => producto.id === productoAgregar.id);
   console.log(carritoConArticulo);


   if (carritoConArticulo) {
        const productos = productosCarrito.map((producto) => {
            if (producto.id === productoAgregar.id) {
                producto.cantidad++;
                producto.subtal = producto.precio * producto.cantidad;
                return producto;
            }else {
                return producto;
            }
        })
        productosCarrito = productos;
        
   }else {
    productosCarrito.push(productoAgregar);

   }

   guardarEnLocalStorage();
   console.log(productosCarrito);
}


function guardarEnLocalStorage () {
    localStorage.setItem('productoStorage', JSON.stringify(productosCarrito))
}

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