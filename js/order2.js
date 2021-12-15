// PERFIL ==============================================================================================

function consultarUsuarioPerfil() {
    var id = localStorage.getItem("idUser");
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaPerfilAsesor").empty();
            mostrarTablaPerfil(response);
            console.log(response);
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

    $("#miTablaPerfilAsesor").append(rows);
}

function consultarOrdenesZona(){
    let datos = {
        zona: $("#zonaId").val()
    }
    $.ajax({
        url: "http://localhost:8080/api/order/zona/"+datos.zona,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            if(response.length == 0){
                alert("Zona no encontrada o sin registros, intente nuevamente");
                $("#tablaAsesor").hide();
            }else{
                $("#miTablaAsesor").empty();
                mostrarTablaAsesor(response);
                console.log(response);
                $("#tablaAsesor").show();
            }
        }
    });
}

function mostrarTablaAsesor(response) {
    let rows = '<tr>';
    for(i = 0; i < response.length; i++){
        rows += '<th>' + response[i].salesMan.identification + '</th>';
        rows += '<td>' + response[i].salesMan.name + '</td>';
        rows += '<th>' + response[i].salesMan.email + '</th>';
        rows += '<th>' + response[i].registerDay + '</th>';
        rows += '<td>' + response[i].id + '</td>';
        rows += '<td>' + response[i].status + '</td>';
        rows += '<td>' + "<button class='btn btn-success' onclick='verPedido("+response[i].id+")'>Ver pedido</button>";
        rows += '</tr>';
    }
    $("#miTablaAsesor").append(rows);
}

function regresar() {
    $("#regresar").hide();
    $("#tablaPedido").hide();
    $("#tablaAsesor").show();
    $("#zona").show();
}

function verPedido(id){
    $.ajax({
        url: "http://localhost:8080/api/order/"+id,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            $("#miTablaPedido").empty();
            $("#miTablaPedido2").empty();
            $("#tablaAsesor").hide();
            $("#tablaPedido").show();
            $("#regresar").show();
            $("#zona").hide();
            mostrarTablaPedido(response);
        }
    });
}

function mostrarTablaPedido(response) {
    let rows = '<tr>'; 
        rows += '<th>' + response.registerDay + '</th>';
        rows += '<td>' + response.id + '</td>';
        rows += '<th>' + response.status + '</th>';
        rows += '<th>' + '<select class="form-select" id="seleccionarStatus">' + '<option value="Pendiente">Pendiente</option>' + '<option value="Aprobada">Aprobada</option>' + '<option value="Rechazada">Rechazada</option>'+'</select>'+ '</th>';
        rows += '<td>' + "<button class='btn btn-success' onclick='actualizarPedido("+response.id+")'>Guardar Estado</button>";
        rows += '</tr>';
    $("#miTablaPedido").append(rows);
    //aisla los productos del json original
    let productos=response.products;
    //obtine el coteo de los productos
    let catProducto = Object.keys(productos);

    for(let i=0;i<catProducto.length;i++){
        let rows2 = '<tr>';
        rows2 += '<td>' + "<img src='"+productos[i+1].photography+ "' width='50px' height='50px'>";
        rows2 += '<th>' + response.id + '</td>';
        rows2 += '<th>' + productos[i+1].os + '</th>';
        rows2 += '<th>' + productos[i+1].description + '</th>';
        rows2 += '<th>' + productos[i+1].price + '</th>';
        rows2 += '<th>' + response.quantities[i+1] + '</th>';
        rows2 += '<th>' + productos[i+1].quantity + '</th>';
        rows2 += '</tr>';
    $("#miTablaPedido2").append(rows2);

    }
}

function actualizarPedido(idPedido){
    let datos = {
        id: idPedido,
        status: $("#seleccionarStatus").val()
    }
    var dataToSend = JSON.stringify(datos);
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://localhost:8080/api/order/update",
        type: 'PUT',
        success: function (response) {
            console.log(response);
            alert("Estado Guardado Correctamente :D");
            consultarOrdenesZona();
            $("#tablaPedido").hide();
            $("#regresar").hide();
            $("#zona").show();
        }
    });
}

$("#cerrarSesion").click(function(){
    localStorage.clear();
    location.href = "../paginas/index.html";
});

$(document).ready(function(){
    consultarUsuarioPerfil();
    $("#tablaAsesor").hide();
    $("#tablaPedido").hide();
    $("#regresar").hide();
});