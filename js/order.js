// PERFIL ==============================================================================================

function consultarUsuarioPerfil() {
    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaPerfil").empty();
            mostrarTablaPerfil(response);
        }
    });
}

function mostrarTablaPerfil(response) {
    let rows = '<tr>';
        rows += '<th scope="row">' + response.identification + '</th>';
        rows += '<td>' + response.name + '</td>';
        rows += '<td>' + response.email + '</td>';
        switch(response.type){
            case 'COORD':
                rows += '<td>' + "Coordinador de zona" + '</td>';
                break;
            case 'ADM':
                rows += '<td>' + "Administrador" + '</td>';
                break;
            case 'ASE':
                rows += '<td>' + "Asesor Comercial" + '</td>';
                break;
            default:
                rows += '<td>' + "Perfil no definido" + '</td>';
                break;
        }
        rows += '<td>' + response.zone + '</td>';
        rows += '</tr>';

    $("#miTablaPerfil").append(rows);
}

// ORDENES DE PEDIDO ==============================================================================================

function consultarProductos(){
    $.ajax({
        url: "http://localhost:8080/api/clone/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaOrder").empty();
            mostrarTablaOrder(response);
            console.log(response);
        }
    });
}

function mostrarTablaOrder(response) {
    let rows = '<tr>';
    for(i = 0; i < response.length; i++){
        rows += '<td class="dt">' + "<img src='"+response[i].photography+"' width='50%' height='50px'>";
        rows += '<td class="dt">' + response[i].os + '</th>';
        rows += '<td class="dt">' + response[i].procesor + '</td>';
        rows += '<td class="dt">' + response[i].memory + '</th>';
        rows += '<td class="dt">' + response[i].hardDrive + '</th>';
        rows += '<td class="dt">' + response[i].description + '</td>';
        rows += '<td class="dt">' + response[i].price + '</td>';
        rows += '<td class="dt">' + "<input id='inputCantidad' type='number' class='form-control text-center' min='1' value='"+response[i].quantity+"'></input>";
        rows += '</tr>';
    }
    
    $("#miTablaOrder").append(rows);
}

function consultarOrder(){
    $.ajax({
        url: "http://localhost:8080/api/order/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {            
            mensajePedido(response);
        }
    });
}

function consultar(idAutoincrementable) {
    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            guardarOrder(response, idAutoincrementable);
        }
    });
}

function guardarOrder(response, idAutoincrementable){
    var items = {};
    var itemsCan = {};
    var idAuto = 1;

    $("#miTablaOrder tr").each(function(e) {
        var itemsProducts = {};
        var itemsCantidad = {};

        var tds = $(this).find(".dt");
        
        itemsProducts.id = idAuto;
        itemsProducts.brand = "";
        itemsProducts.availability = true;
        itemsProducts.quantity = 10;
        itemsProducts.photography = tds.filter(":eq(0)").text();;
        itemsProducts.os = tds.filter(":eq(1)").text();
        itemsProducts.procesor = tds.filter(":eq(2)").text();
        itemsProducts.memory = tds.filter(":eq(3)").text();
        itemsProducts.hardDrive = tds.filter(":eq(4)").text();
        itemsProducts.description = tds.filter(":eq(5)").text();
        itemsProducts.price = parseInt(tds.filter(":eq(6)").text());

        itemsCantidad = parseInt($(this).find("td:eq(7) input[type='number']").val());

        items[idAuto] = itemsProducts;
        itemsCan[idAuto] = itemsCantidad;
        idAuto = idAuto+1;
    });

    let datos = {
        id: idAutoincrementable,
        registerDay: new Date(),
        status: "Pendiente",
        salesMan: response,
        products: items,
        quantities: itemsCan
    }
    var dataToSend = JSON.stringify(datos);
    console.log(dataToSend);
    $.ajax({
        datatype: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://localhost:8080/api/order/new",
        type: 'POST',
        success: function(response){
            console.log(response);
            $("#ventanaSolicitarOrder").modal("show");
        },
        error: function(){
            alert("Fallo la conexion con la Base de datos");
        }
    });
}

function mensajePedido(response){
    $("#enviarOrder").empty();
    let mensaje = $("<p>");
    console.log(response.length);
    for(i=0; i<=response.length; i++){
        if(response.length == 0){
            let confirmar = confirm("¿Estas seguro de enviar la orden?");
            if(confirmar){
                var idAutoincrementable = 1;
                mensaje.text("Orden guardada correctamente: El codigo de tu pedido es " + idAutoincrementable);
                $("#enviarOrder").append(mensaje);
                consultar(idAutoincrementable);
                break;
            }
        }else{
            confirmar = confirm("¿Estas seguro de enviar la orden?");
            if(confirmar){
                idAutoincrementable = response.length + 1;
                mensaje.text("Orden guardada correctamente: El codigo de tu pedido es " + idAutoincrementable);
                $("#enviarOrder").append(mensaje);
                consultar(idAutoincrementable);
                break;
            }
            break;
        }
    }
}

// CONSULTAS ============================================================================================================================================

function consultarFechas() {
    $("#texto").text("Consultas Por Fecha");
    $("#tablaEstados").hide();
    $("#tablaFechas").show();
    $("#tablaPedidos2").hide();
    $("#encabezadoTabla").show();
    $("#encabezadoTabla2").hide();

    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/order/salesman/" + id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaFechas").empty();
            let rows = '<tr>';
            let catProducto = Object.keys(response);
            for (i = 0; i < catProducto.length; i++) {
                $("#miTablaFechas").empty();
                rows += '<td>' + response[i].registerDay + '</td>';
                rows += '<td>' + response[i].id + '</td>';
                rows += '<td>' + response[i].status + '</td>';
                rows += '<td>' + "<button class='btn btn-success' onclick='verPedidoFechas(" + response[i].id + ")'>Ver pedido</button>" + '</td>';
                rows += '</tr>';
                $("#miTablaFechas").append(rows);
            }
        }
    });
}

function consultarFechas2() {
    $("#tablaPedidos2").hide();
    var id = localStorage.getItem("idUser");
    let date = $("#fechas").val();
    $.ajax({
        url: "http://localhost:8080/api/order/date/" + date + "/" + id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaFechas").empty();
            let rows = '<tr>';
            let catProducto = Object.keys(response);
            console.log(catProducto)
            if (catProducto.length == 0) {
                rows += '<td colspan="4">No hay Registros</td>';
                rows += '</tr>';
                rows += '<td colspan="4">' + "<button class='btn btn-danger' onclick='consultarFechas()'>Mostrar Todas Las Ordenes de Nuevo</button>" +'</td>';
                rows += '</tr>';
                $("#miTablaFechas").append(rows);
            } else {
                for (i = 0; i < catProducto.length; i++) {
                    $("#miTablaFechas").empty();
                    rows += '<td>' + response[i].registerDay + '</td>';
                    rows += '<td>' + response[i].id + '</td>';
                    rows += '<td>' + response[i].status + '</td>';
                    rows += '<td>' + "<button class='btn btn-success' onclick='verPedidoFechas(" + response[i].id + ")'>Ver pedido</button>" + '</td>';
                    rows += '</tr>';
                    $("#miTablaFechas").append(rows);
                }
            }
        }
    });
}

function verPedidoFechas(id){
    $("#tablaFechas").hide();
    $("#tablaEstados").hide();
    $("#encabezadoTabla").hide();
    $("#encabezadoTabla2").hide();
    $.ajax({
        url: "http://localhost:8080/api/order/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            $("#miTablaPedido").empty();
            $("#miTablaPedido2").empty();
            $("#tablaPedidos2").show();
            mostrarTablaPedido(response);
        }
    });
}

function mostrarTablaPedido(response) {
    let rows = '<tr>'; 
        rows += '<th>' + response.registerDay + '</th>';
        rows += '<td>' + response.id + '</td>';
        rows += '<th>' + response.status + '</th>';
        rows += '</tr>';
    $("#miTablaPedido").append(rows);
    let productos=response.products;
    let catProducto = Object.keys(productos);

    for(let i=1;i<=catProducto.length;i++){
        let rows2 = '<tr>';
        rows2 += '<td>' + "<img src='"+productos[i].photography+ "' width='50px' height='50px'>";
        rows2 += '<th>' + response.id + '</td>';
        rows2 += '<th>' + productos[i].os + '</th>';
        rows2 += '<th>' + productos[i].description + '</th>';
        rows2 += '<th>' + productos[i].price + '</th>';
        rows2 += '<th>' + response.quantities[i] + '</th>';
        rows2 += '<th>' + productos[i].quantity + '</th>';
        rows2 += '</tr>';
    $("#miTablaPedido2").append(rows2);

    }
}

function consultarEstados() {
    $("#texto").text("Consultas Por Estado");
    $("#tablaFechas").hide();
    $("#tablaEstados").show();
    $("#tablaPedidos2").hide();
    $("#encabezadoTabla").hide();
    $("#encabezadoTabla2").show();

    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/order/salesman/" + id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaEstados").empty();
            let rows = '<tr>';
            let catProducto = Object.keys(response);
            for (i = 0; i < catProducto.length; i++) {
                $("#miTablaEstados").empty();
                rows += '<td>' + response[i].registerDay + '</td>';
                rows += '<td>' + response[i].id + '</td>';
                rows += '<td>' + response[i].status + '</td>';
                rows += '<td>' + "<button class='btn btn-success' onclick='verPedidoFechas(" + response[i].id + ")'>Ver pedido</button>" + '</td>';
                rows += '</tr>';
                $("#miTablaEstados").append(rows);
            }
        }
    });
}

function consultarEstados2() {
    var id = localStorage.getItem("idUser");
    let dato = $("#estadoRegistro").val();
    $.ajax({
        url: "http://localhost:8080/api/order/state/" + dato + "/" + id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaEstados").empty();
            let rows = '<tr>';
            let catProducto = Object.keys(response);
            console.log(catProducto)
            if (catProducto.length == 0) {
                rows += '<td colspan="4">No hay Registros</td>';
                rows += '</tr>';
                rows += '<td colspan="4">' + "<button class='btn btn-danger' onclick='consultarEstados()'>Mostrar Todas Las Ordenes de Nuevo</button>" +'</td>';
                rows += '</tr>';
                $("#miTablaEstados").append(rows);
            } else {
                for (i = 0; i < catProducto.length; i++) {
                    $("#miTablaEstados").empty();
                    rows += '<td>' + response[i].registerDay + '</td>';
                    rows += '<td>' + response[i].id + '</td>';
                    rows += '<td>' + response[i].status + '</td>';
                    rows += '<td>' + "<button class='btn btn-success' onclick='verPedidoFechas(" + response[i].id + ")'>Ver pedido</button>" + '</td>';
                    rows += '</tr>';
                    $("#miTablaEstados").append(rows);
                }
            }
        }
    });
}




function mostrarOpciones(){
    $("#solicitarOrder").hide();
    $("#tablaPedidos").hide();
    $("#consultarPedidos").hide();
    $("#regresar").show();
    $("#texto").text("Consultas");
    $("#listadoOpciones").show();
    $("#consultarFechas").show();
    $("#consultarEstados").show();
}

function regresar(){
    $("#consultarPedidos").show();
    $("#solicitarOrder").show();
    $("#tablaPedidos").show();
    $("#regresar").hide();
    $("#listadoOpciones").hide();
    $("#texto").text("Ordenes de pedido");
    $("#consultarFechas").hide();
    $("#consultarEstados").hide();
    $("#tablaFechas").hide();
    $("#tablaEstados").hide();
    $("#tablaPedidos2").hide();
    $("#miTablaFechas").empty();
    $("#miTablaEstados").empty();
    $("#encabezadoTabla").hide();
    $("#encabezadoTabla2").hide();
}

function regresar2(){
    consultarFechas();
}

$("#cerrarSesion").click(function(){
    localStorage.clear();
    location.href = "../paginas/index.html";
});


$(document).ready(function(){
    consultarUsuarioPerfil();
    consultarProductos();
    $("#regresar").hide();
    $("#listadoOpciones").hide();
    $("#consultarFechas").hide();
    $("#consultarEstados").hide();
    $("#tablaFechas").hide();
    $("#tablaEstados").hide();
    $("#tablaPedidos2").hide();
    $("#encabezadoTabla").hide();
    $("#encabezadoTabla2").hide();
});