//OBJETOS
class Producto{
    constructor(id,marca, precio, tipo){
        this.id = id;
        this.marca = marca;
        this.precio = precio;
        this.tipo = tipo;
    }

    imprimir(){
        return `${this.tipo} - ${this.marca} $${this.precio}`;
    }

    sumarAlCarrito(){
        alert(`$${this.precio} fueron sumados a tu carrito`)
        total+=this.precio
    }
}

//VARIABLES
let total = 0
const productos = []
productos.push(new Producto(1,"Huawei",75000,"celular"));
productos.push(new Producto(2,"Samsung",95000,"celular"));
productos.push(new Producto(3,"Motorola",80000,"celular"));
productos.push(new Producto(4,"Xiomi",70000,"celular"));
productos.push(new Producto(5,"Iphone",120000,"celular"));

let opcion = 0
let continuar = true

//IMPRIMIR PRODUCTOS EN EL DOM
function imprimirEnDOM(){

    let listProductos = document.getElementById("listProductos")
    //listProductos.removeChild()
    listProductos.innerHTML=``
    productos.forEach(productosArray =>{
        
        listProductos.innerHTML+=`
        <li class="itemProductos">${productosArray.imprimir()} <button id="btnItem">+</button></li><br>
        `
    })
}

let btnMarca =  document.getElementById("ordenMarca")
let btnPrecio =  document.getElementById("ordenPrecio")

imprimirEnDOM()

btnMarca.addEventListener('click',()=>{
    ordenarPorMarca()
    imprimirEnDOM()
})

btnPrecio.addEventListener('click',()=>{
    ordenarPorPrecio()
    imprimirEnDOM()
})


// boton.addEventListener('clic',() =>{
//     //codigo
// })

// boton.onclic = () =>{
//     //codigo
// }

// for(var i=0; i < productos.length;i++){
//     let item = document.createElement("li")
//     item.id=`${productos[i].marca}`
//     item.className = "itemProductos"
//     item.innerText += `${productos[i].imprimir()}`
//     listProductos.appendChild(item)
// }

function resultado(){
    alert(`El total de sus productos es ${total}`)
}

function ordenarPorMarca(){
    productos.sort((o1,o2) =>{
        if(o1.marca < o2.marca){
            return -1;
        }else if(o1.marca > o2.marca){
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
//     7: Ordenar por marca`))

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
//             ordenarPorMarca();
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

