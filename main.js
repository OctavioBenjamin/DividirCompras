window.onload = function() {
    window.usuarios = [];
    window.productos = [];
}

function add_usuario(){
    var usuario = {nombre: document.getElementById("nombreUsuario").value, importe: 0};
    usuarios.push(usuario);
    mostrarUsuarios()
    crearCheckBox(usuario);
}

function mostrarUsuarios(){
    let resultado = document.getElementById("usuariosAgregados");
    resultado.innerHTML = " ";

    for (var i = 0; i < usuarios.length; i++){
        let usuarioParrafo = document.createElement('p');
        usuarioParrafo.innerText = usuarios[i].nombre;
        resultado.appendChild(usuarioParrafo);
    }
}

function crearCheckBox(usuario){
    let checkBoxUser = document.createElement("input");
    checkBoxUser.type = "checkbox";
    checkBoxUser.id = usuario.nombre;

    let labelUser = document.createElement("label");
    labelUser.innerText = usuario.nombre;
    labelUser.for = usuario.nombre;

    let checks = document.getElementById("checkCompradores")

    checks.appendChild(checkBoxUser)
    checks.appendChild(labelUser)
}

function agregarProductos(){
    var prod = document.getElementById("nombreProducto").value;
    var cant = document.getElementById("cantidadProducto").value;
    var prec = document.getElementById("precioProducto").value;
    
    if (validar(prod, cant, prec)){
        producto = {nombre: prod, cantidad: cant, precio: prec, total: 0, compradores: []}
        var total = producto.precio * producto.cantidad
        producto.total = total.toFixed(2)
        productos.push(producto)

        mostrarProducto(producto)
    }
}



function validar(producto, cantidad, precio) {
    if (producto.length == 0 || producto.length == " ") {
      alert('Ingrese nombre o marca del producto');
      return false;
    }
    else if (cantidad <= 0){
        alert("Ingrese una cantidad valida");
        return false;
    }
    else if (precio <= 0){
        alert("Ingrese un precio valido");
        return false;
    }
    else{
        return true
    }
  }


function mostrarProducto(producto){
    let tablaProductos = document.getElementById("tabla_Productos");
    let cuerpoTabla = document.createElement("tbody");

    let fila = document.createElement("tr");

    let td = document.createElement("td");
    td.innerText = producto.nombre;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = producto.cantidad;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = producto.precio;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = producto.total;
    fila.appendChild(td);

    // Cuenta cuantos usuarios aportan a un producto
    usuarios.forEach(usuario => {
        console.log(usuario)
        const mycheck = document.getElementById(usuario.nombre);
        if (mycheck.checked){
            producto.compradores.push(usuario)
        }
    });


    // Suma a cada usuario el total a pagar cada uno
    producto.compradores.forEach(usuario => {
        usuarios.forEach(user => {
            if (usuario.nombre == user.nombre){
                user.importe += producto.total / producto.compradores.length
            }
        })
    });

    td = document.createElement("td");
    cuerpoTabla.appendChild(fila);
    tablaProductos.appendChild(cuerpoTabla); 
    
}

function calcularTotal(){

    //Suma total de la compra
    var sumaTotal = 0;
    productos.forEach(p => {
        sumaTotal += parseInt(p.total);
        
    });
    console.log(sumaTotal);

    let listado = document.getElementById("compraTotal");

    let total = document.createElement("p");
    total.innerText = "Valor total de compra: $"+sumaTotal;

    listado.appendChild(total);

    // Valor de cada usuario

    usuarios.forEach(usuario => {
        let aporteUsuario = document.createElement("p");
        aporteUsuario.innerText = usuario.nombre+": $"+usuario.importe;

        listado.appendChild(aporteUsuario);
    });




}

function getCompradores(){

}