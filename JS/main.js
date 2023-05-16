

alert(`Lista de inventario por categorias :
-1 Indumentaria
-2 Electrodomestico
-3 Electronicos`);

let capturaDatos = prompt("Introduce la categoria de articulos que deseas visitar");


const productos = [
    {
        id:101,
        nombre: 'Calzado para hombre',
        precio: 700,
        categoria: 'Indumentaria'


},

{
    id: 202,
    nombre: 'Traje de vestir',
    precio: 300,
    categoria: 'Indumentaria'


},

{
    id: 102,
    nombre: 'Microondas',
    precio: 1200,
    categoria: 'Electrodomestico'


},


{
    id: 203,
    nombre: 'Lavadora',
    precio: 1450,
    categoria: 'Electrodomestico'


},


{
    id: 103,
    nombre: 'MacBook Pro 21',
    precio: 790,
    categoria: 'Electronicos'


},

{
    id: 303,
    nombre: 'Speaker Bluetooth',
    precio: 465,
    categoria: 'Electronicos'


},
];


const inciar = () => {
    const lista = productos.reduce((acc,p) => acc += `\n${p.id} - ${p.nombre}\n`,'');
    const productoSeleccionado = parseInt(prompt('Indique el numero de producto: ' + lista));
    const productoEncontrado = productos.find(articulo => articulo.id === productoSeleccionado);
    console.log(productoEncontrado);

    const productoFiltrado = productos.filter(articulo => articulo.categoria === 'Electronicos')
    console.log(productoFiltrado);
}

inciar()

