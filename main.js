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
    </div>`);
    })

        productos.forEach((productosArray, indice) => {
            $('#boton' + productosArray.id).click(() => {
                carrito.push(productos[indice])
                localStorage.setItem('carrito', JSON.stringify(carrito))
                imprimirCarrito()
            })
        })

    }

function imprimirCarrito() {
            $('#listCarrito').empty()
            $('#listCarrito').append(
                `<ul class="list-group">`
            )
            total = 0
            carrito.forEach((carritoArray) => {
                $('#listCarrito').append(`
                <li class="list-group-item">${carritoArray.imprimir()}</li>
                `)
                carritoArray.sumarAlCarrito()
            })
            $('#listCarrito').append(`
            </ul>
            <h2>Tu total es: $${total}</h2>
            `)
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
