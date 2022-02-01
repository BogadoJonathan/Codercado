
const almacenados = JSON.parse(localStorage.getItem('carrito'))
let total = 0
//Armamos la etiqueta TABLE con los articulos comprados
let html = (`
<table class="table table-sm table-dark">
<thead>
  <tr>
    <th scope="col">Cantidad</th>
    <th scope="col">Descripcion</th>
    <th scope="col">Precio unitario</th>
    <th scope="col">Total</th>
  </tr>
</thead>
<tbody>`)
for (const objeto of almacenados) {
    html +=(`
    <tr>
            <td>${objeto.cantidad}</td>
            <td>${objeto.producto.descripcion}</td>
            <td>${objeto.producto.precio}</td>
            <td>${objeto.total}</td>
        </tr>`)
    total += objeto.total
}
html +=(`
</tbody>
</table>
<h2> Su total es de: $${total}</h2>

`)
$('#mainCompra').append(html)
