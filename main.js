//OBJETOS
class Producto {
    constructor(id, descripcion, precio, image) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.image = image;
    }
}

class carritoClass {
    constructor(id, producto, cantidad, total) {
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = total;
    }

    sumarAlCarrito() {
        total += this.total
    }
}

//VARIABLES
const productos = []
let total = 0
const carrito = []

//Obtener productos desde el archivo productos.json
fetch('./productos.json')
    .then(promise => promise.json())
    .then(data => {
        //Recorre cada producto del json y lo guarda en la variable producto como objeto
        data.forEach(element => {
            productos.push(new Producto(element.id, element.descripcion, element.precio, element.image));
        })
        imprimirEnDOM()
    })

//verifica si esta reservada la variable carrito, si no lo esta lo crea.
if (localStorage.getItem('carrito') == null) {
    localStorage.setItem('carrito', JSON.stringify([]))
}
else {
    //obtengo los datos del carrito y lo vuelvo a cargar en el listado de objetos para imprimir
    const almacenados = JSON.parse(localStorage.getItem('carrito'))
    for (const objeto of almacenados) {
        console.log(objeto)
        //carrito.push(productos.find(x => x.id == objeto.id))
        carrito.push(new carritoClass(objeto.id, objeto.producto, objeto.cantidad, objeto.total))
    }
    console.log(carrito)
    imprimirCarrito()
}

$('.btn-light').hide()


//IMPRIMIR PRODUCTOS EN EL DOM
function imprimirEnDOM() {
    $('#listProductos').empty(); //limpia el DOM
    productos.forEach((productosArray) => {
        $('#listProductos').append(`
    <div class="card" style="width: 18rem;">
             <img src="img/${productosArray.image}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${productosArray.descripcion}</h5>
                 <p class="card-text">$${productosArray.precio}</p>
                 <a href="#listCarrito" id="boton${productosArray.id}" class="btn btn-primary">Agregar <i class="fas fa-cart-plus"></i></a>
        </div>
    </div>`)
    })

    productos.forEach((productosArray) => {
        $('#boton' + productosArray.id).click(() => {
            //Si al agregar un producto este ya se encuentra en el carrito, aumenta su cantidad y su precio
            if (carrito.find(producto => producto.id == productosArray.id)) {
                let indice = carrito.findIndex(producto => producto.id == productosArray.id)
                carrito[indice].cantidad++
                carrito[indice].total += productosArray.precio
            }
            //si al agregar un producto éste no se encuentra en el carrito, crea un nuevo objeto en el listado
            else {
                carrito.push(new carritoClass(productosArray.id, productosArray, 1, productosArray.precio))
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
            imprimirCarrito()
        })
    })

};

//PONER MODO LIGHT, elimina el boton DARK
$('.btn-light').click(() => {
    $('body').removeClass('modoDark')
    $('body').addClass('modoLight')
    $('.btn-light').hide()
    $('.btn-dark').show()

});

//PONER MODO DARK, elimina el boton LIGHT
$('.btn-dark').click(() => {
    $('body').removeClass('modoLight')
    $('body').addClass('modoDark')
    $('.btn-light').show()
    $('.btn-dark').hide()
});

//toma desde la API random User, un nombre y numero al azar, para comunicarse con un "vendedor"
$('#contacto').click(() => {
    $.getJSON("https://randomuser.me/api/", function (respuesta, estado) {
        if (estado == "success") {
            let data = respuesta
            console.log(data.results[0].gender)
            $('#contenidoModal').empty()
            $('#contenidoModal').append(`
                    
                        <img src="${data.results[0].picture.large}" class="rounded-circle mr-3" alt="...">
                        <div class="media-body">
                            <h5 class="mt-0">Hola soy ${data.results[0].name.first} ${data.results[0].name.last}</h5>
                            Te dejo mi número de contacto: <a href="tel:${data.results[0].cell}">${data.results[0].cell}</a>.
                        </div>

            `)
        }
    })
    $('.modal').fadeIn()
    $('main').hide()
})

$('.btn-close').click(() => {
    $('.modal').fadeOut()
    $('main').show()
})

//imprimir el carrito en el DOM
function imprimirCarrito() {
    $('#listCarrito').empty()
    $('#listCarrito').append(
        `<ul class="list-group">`
    )
    total = 0
    carrito.forEach((carritoArray, indice) => {
        $('#listCarrito').append(`
                <li class="list-group-item">${carritoArray.producto.descripcion} - Cantidad: ${carritoArray.cantidad}
                <a href="#listCarrito" id="plus${carritoArray.id}" class="btn btn-success"><i class="fas fa-plus"></i></a>
                <a href="#listCarrito" id="minus${carritoArray.id}" class="btn btn-warning"><i class="fas fa-minus"></i></a> 
                <a href="#listCarrito" id="delete${carritoArray.id}" class="btn btn-danger"><i class="fas fa-trash-alt"></i></a></li>
                `)
        carritoArray.sumarAlCarrito()
    })
    if(total>0){
        $('#listCarrito').append(`
        </ul>
        <h2>Tu total es: $${total}</h2>
        <a  href="compra.html"><button type="button" class="btn btn-primary btn-lg btn-block">Terminar compra</button></a>

        `)
    }

    carrito.forEach((carritoArray,indice) => {
        $('#delete' + carritoArray.id).click(() => {
            plusMinusDeleteProducto('x',indice)
        })
        $('#minus' + carritoArray.id).click(() => {
            plusMinusDeleteProducto('-',indice)
        })
        $('#plus' + carritoArray.id).click(() => {
            plusMinusDeleteProducto('+',indice)
        })
    })
}

//Para agregar, dismuir o eliminar cantidades del carrito.
//OPERADOR: ingresa un '-', un '+' o un 'x'
//OPERADOR: ingresa el indice del producto a modificar su cantidad
function plusMinusDeleteProducto(operador,indice){
    switch(operador){
        case '-':
            if(carrito[indice].cantidad ==1){
                carrito.splice([indice], 1)
            }
            else{
                carrito[indice].cantidad--;
                carrito[indice].total-=carrito[indice].producto.precio;
            }
            break;
        case '+':
            carrito[indice].cantidad++;
            carrito[indice].total+=carrito[indice].producto.precio
            break;
        case 'x':
            carrito.splice([indice], 1);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    imprimirCarrito()
}

//::::::::::::ORDENA LOS PRODUCTO POR DESCRIPCION/PRECIO::::::::::::::::::::::
let btnDescripcion = document.getElementById("ordenDescripcion")
let btnPrecio = document.getElementById("ordenPrecio")

btnDescripcion.addEventListener('click', () => {
    ordenarPorDescripcion()
    imprimirEnDOM()
})

btnPrecio.addEventListener('click', () => {
    ordenarPorPrecio()
    imprimirEnDOM()
})

function ordenarPorDescripcion() {
    productos.sort((o1, o2) => {
        if (o1.descripcion < o2.descripcion) {
            return -1;
        } else if (o1.descripcion > o2.descripcion) {
            return 1;
        } else {
            return 0;
        }
    });
}

function ordenarPorPrecio() {
    productos.sort((o1, o2) => {
        if (o1.precio < o2.precio) {
            return -1;
        } else if (o1.precio > o2.precio) {
            return 1;
        } else {
            return 0;
        }
    });
}
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::