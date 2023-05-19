

alert(`Lista de inventario por categorias tenemos las siguientes categorias :
Indumentaria
Electrodomestico
Electronicos`);


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
    const productoSeleccionado = parseInt(prompt('Indique el id del producto: ' + lista));
    const productoEncontrado = productos.find(articulo => articulo.id === productoSeleccionado);
    console.log(productoEncontrado);

    let capturaDatos = prompt("A cual categoria deseas ingresar")
    const productoFiltrado = productos.filter(articulo => articulo.categoria === capturaDatos)
    return console.log(productoFiltrado);
}

inciar()


