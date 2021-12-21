//OBJETOS
class Producto{
    constructor(id,descripcion, precio, image){
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.image = image;
    }

    imprimir(){
        return `${this.descripcion} $${this.precio}`;
    }

    sumarAlCarrito(){
        total+=this.precio
    }
}

//VARIABLES
let total = 0
const productos = []
productos.push(new Producto(1,"Antifaz para dormir x2",400,"antifaz.jpg"));
productos.push(new Producto(2,"Botella acero inoxidable",700,"botella.jpg"));
productos.push(new Producto(3,"Buzo",1000,"buzo.jpg"));
productos.push(new Producto(4,"funda para iphone",800,"funda.jpg"));
productos.push(new Producto(5,"gorro",500,"gorro.jpeg"));
productos.push(new Producto(6,"mochila",1000,"mochila.jpg"));
productos.push(new Producto(7,"remera manga corta",500,"remera.jpg"));
productos.push(new Producto(8,"taza",300,"taza.jpg"));


let listProductos = document.getElementById("listProductos")
let listCarrito = document.getElementById("listCarrito")

const carrito = []
let opcion = 0
let continuar = true

//IMPRIMIR PRODUCTOS EN EL DOM
function imprimirEnDOM(){
    listProductos.innerHTML=``
    productos.forEach((productosArray) =>{
        
        listProductos.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img src="img/${productosArray.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productosArray.descripcion}</h5>
                <p class="card-text">$${productosArray.precio}</p>
                <a href="#" id="boton${productosArray.id}" class="btn btn-primary">Agregar +</a>
            </div>
        </div>
        `
    })

    productos.forEach((productosArray,indice) =>{
        document.getElementById(`boton${productosArray.id}`).addEventListener('click',()=>{
            carrito.push(productos[indice])
            imprimirCarrito()
        })
    })
    
}

function imprimirCarrito(){
    listCarrito.innerHTML=``
    listCarrito.innerHTML=`<ul class="list-group">`
    carrito.forEach((carritoArray)=>{
        listCarrito.innerHTML+=`
        <li class="list-group-item">${carritoArray.imprimir()}</li>
        `
        carritoArray.sumarAlCarrito()
    })
    listCarrito.innerHTML+=`
    </ul>
    <h2>Tu total es: $${total}</h2>
    `
}

let btnDescripcion =  document.getElementById("ordenDescripcion")
let btnPrecio =  document.getElementById("ordenPrecio")

imprimirEnDOM()

btnDescripcion.addEventListener('click',()=>{
    ordenarPorDescripcion()
    imprimirEnDOM()
})

btnPrecio.addEventListener('click',()=>{
    ordenarPorPrecio()
    imprimirEnDOM()
})



function resultado(){
    alert(`El total de sus productos es ${total}`)
}

function ordenarPorDescripcion(){
    productos.sort((o1,o2) =>{
        if(o1.descripcion < o2.descripcion){
            return -1;
        }else if(o1.descripcion > o2.descripcion){
            return 1;
        } else {
            return 0;
        }
    });
}

function ordenarPorPrecio(){
    productos.sort((o1,o2) =>{
        if(o1.precio < o2.precio){
            return -1;
        }else if(o1.precio > o2.precio){
            return 1;
        } else {
            return 0;
        }
    });
}




// do{     
//     opcion = parseInt(prompt(`
//     Ingresa los productos que deseas llevar: 
//     6: Ordenar por precio
//     7: Ordenar por descripcion`))

//     if(opcion<1 || opcion>7){
//         alert("Debe ingresar un numero valido")
//         continue
//     }

//     switch(opcion){
//         case 1: 
//             productos[0].sumarAlCarrito()
//             break;
//         case 2: 
//             productos[1].sumarAlCarrito()
//             break;
//         case 3: 
//             productos[2].sumarAlCarrito()
//             break;
//         case 4: 
//             productos[3].sumarAlCarrito()
//             break;
//         case 5: 
//             productos[4].sumarAlCarrito()
//             break;
//         case 6:
//             ordenarPorPrecio();
//             continue;
//         case 7:
//             ordenarPordescripcion();
//             continue;

//     }

//     opcion = prompt("¿desea agregar otro producto?: 's' para seguir, cualquier tecla para salir")
//     if(opcion=='s' || opcion=='S'){
//         continuar=true
//     }
//     else{
//         continuar=false
//     }

// }while(continuar)

// resultado()

