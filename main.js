//OBJETOS
class Producto {
    constructor(id, descripcion, precio, image) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.image = image;
    }

    imprimir() {
        return `${this.descripcion} $${this.precio}`;
    }

    sumarAlCarrito() {
        total += this.precio
    }
}

//VARIABLES
let total = 0
const productos = []
productos.push(new Producto(1, "Antifaz para dormir x2", 400, "antifaz.jpg"));
productos.push(new Producto(2, "Botella acero inoxidable", 700, "botella.jpg"));
productos.push(new Producto(3, "Buzo", 1000, "buzo.jpg"));
productos.push(new Producto(4, "funda para iphone", 800, "funda.jpg"));
productos.push(new Producto(5, "gorro", 500, "gorro.jpeg"));
productos.push(new Producto(6, "mochila", 1000, "mochila.jpg"));
productos.push(new Producto(7, "remera manga corta", 500, "remera.jpg"));
productos.push(new Producto(8, "taza", 300, "taza.jpg"));

const carrito = []

if (localStorage.getItem('carrito') == null) {
    localStorage.setItem('carrito', JSON.stringify([]))
}
else {
    const almacenados = JSON.parse(localStorage.getItem('carrito'))
    for (const objeto of almacenados) {
        console.log(objeto.id)
        carrito.push(productos.find(x => x.id == objeto.id))
    }
    imprimirCarrito()
}


let opcion = 0
let continuar = true

//IMPRIMIR PRODUCTOS EN EL DOM
function imprimirEnDOM() {
    $('#listProductos').empty();
    productos.forEach((productosArray) => {
        $('#listProductos').append(`
    <div class="card" style="width: 18rem;">
             <img src="img/${productosArray.image}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${productosArray.descripcion}</h5>
                 <p class="card-text">$${productosArray.precio}</p>
                 <a href="#" id="boton${productosArray.id}" class="btn btn-primary">Agregar +</a>
        </div>
    </div>`)
    })

        productos.forEach((productosArray, indice) => {
            $('#boton' + productosArray.id).click(() => {
                carrito.push(productos[indice])
                localStorage.setItem('carrito', JSON.stringify(carrito))
                imprimirCarrito()
            })
        })

};

$('.btn-light').click(() => {
    $('body').removeClass('modoDark')
    $('body').addClass('modoLight')
    $('.btn-light').hide()
    $('.btn-dark').show()

});

$('.btn-dark').click(() => {
    $('body').removeClass('modoLight')
    $('body').addClass('modoDark')
    $('.btn-light').show()
    $('.btn-dark').hide()
});

$('#contacto').click(() =>{ 
    $.getJSON("https://randomuser.me/api/", function(respuesta, estado){
        if(estado == "success"){
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

$('.btn-close').click(() =>{
    $('.modal').fadeOut()
    $('main').show()
})

function imprimirCarrito() {
            $('#listCarrito').empty()
            $('#listCarrito').append(
                `<ul class="list-group">`
            )
            total = 0
            carrito.forEach((carritoArray, indice) => {
                $('#listCarrito').append(`
                <li class="list-group-item">${carritoArray.imprimir()} <a href="#" id="delete${indice}" class="btn btn-danger">x</a></li>
                `)
                carritoArray.sumarAlCarrito()


                $('#listCarrito li').animate({
                    fontSize: "1.5em",
                    },"slow")
            })
            $('#listCarrito').append(`
            </ul>
            <h2>Tu total es: $${total}</h2>
            `)

            carrito.forEach((carritoArray, indice) => {
                $('#delete' + indice).click(() => {
                    carrito.splice([indice],1)
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    imprimirCarrito()
                })
            })
        }

let btnDescripcion = document.getElementById("ordenDescripcion")
let btnPrecio = document.getElementById("ordenPrecio")

imprimirEnDOM()

btnDescripcion.addEventListener('click', () => {
            ordenarPorDescripcion()
            imprimirEnDOM()
        })

btnPrecio.addEventListener('click', () => {
            ordenarPorPrecio()
            imprimirEnDOM()
        })



function resultado() {
            alert(`El total de sus productos es ${total}`)
        }

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
