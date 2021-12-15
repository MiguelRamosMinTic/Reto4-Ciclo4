// INVENTARIO ==============================================================================================

$("#guardarInventario").click(function () {
    if ($.trim($("#brandRegistro").val()) == "" || $.trim($("#procesorRegistro").val()) == "" || $.trim($("#osRegistro").val()) == "" || $.trim($("#descriptionRegistro").val()) == "" || $.trim($("#memoryRegistro").val()) == "" || $.trim($("#hardDriveRegistro").val()) == "" || $.trim($("#availabilityRegistro").val()) == "" || $.trim($("#priceRegistro").val()) == "" || $.trim($("#quantityRegistro").val()) == "" || $.trim($("#photographyRegistro").val()) == "") {
        alert("Por favor ingrese todos los campos");
    } else {
        let datos = {
            id: $("#idInventario").val(),
            brand: $("#brandRegistro").val(),
            procesor: $("#procesorRegistro").val(),
            os: $("#osRegistro").val(),
            description: $("#descriptionRegistro").val(),
            memory: $("#memoryRegistro").val(),
            hardDrive: $("#hardDriveRegistro").val(),
            availability: $("#availabilityRegistro").val(),
            price: $("#priceRegistro").val(),
            quantity: $("#quantityRegistro").val(),
            photography: $("#photographyRegistro").val()
        }
        $.ajax({
            url: "http://localhost:8080/api/clone/new",
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify(datos),
            contentType: "application/json",
            Headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function (response) {
                    console.log(response);
                    alert("Registrado Correctamente");
                    $("#miTablaInventario").empty();
                    consultarInventario();
                    $('#ventanaRegistrarInventario').modal('hide');
                }
            }
        });
    }
});

function consultarInventario() {
    $.ajax({
        url: "http://localhost:8080/api/clone/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            $("#miTablaInventario").empty();
            mostrarTablaInventario(response);
            console.log(response);
        }
    });
}

function mostrarTablaInventario(response) {
    let rows = '<tr>';
    for (i = 0; i < response.length; i++) {
        rows += '<th scope="row">' + response[i].id + '</th>';
        rows += '<td>' + response[i].brand + '</td>';
        rows += '<td>' + response[i].procesor + '</td>';
        rows += '<td>' + response[i].os + '</td>';
        rows += '<td>' + response[i].description + '</td>';
        rows += '<td>' + response[i].memory + '</td>';
        rows += '<td>' + response[i].hardDrive + '</td>';
        rows += '<td>' + response[i].availability + '</td>';
        rows += '<td>' + response[i].price + '</td>';
        rows += '<td>' + response[i].quantity + '</td>';
        rows += '<td>' + response[i].photography + '</td>';
        rows += '<td> <button class="btn btn-primary fa fa-edit" style="height: 30px; width: 40px;" onclick="buscarPorIDInventario(' + response[i].id + ')"></button><button style="margin-left:10px; height: 30px; width: 40px;" class="btn btn-danger fa fa-trash" onclick="eliminarInventario(' + response[i].id + ')"></button></td>';
        rows += '</tr>';
    }

    $("#miTablaInventario").append(rows);
}

$("#editarInventario").click(function() {
    let datos = {
        id: $("#idInventario").val(),
        brand: $("#brandRegistro").val(),
        procesor: $("#procesorRegistro").val(),
        os: $("#osRegistro").val(),
        description: $("#descriptionRegistro").val(),
        memory: $("#memoryRegistro").val(),
        hardDrive: $("#hardDriveRegistro").val(),
        availability: $("#availabilityRegistro").val(),
        price: $("#priceRegistro").val(),
        quantity: $("#quantityRegistro").val(),
        photography: $("#photographyRegistro").val()
    }

    var dataToSend = JSON.stringify(datos);
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType: 'application/json',
        url: "http://localhost:8080/api/clone/update",
        type: 'PUT',
        success: function (response) {
            console.log(response);
            alert("Actualizado Correctamente :D");
            $("#ventanaRegistrarInventario").modal("hide");
            $("#miTablaInventario").empty();
            consultarInventario();
        },
    });
});

function buscarPorIDInventario(idItem) {
    $.ajax({
        url: "http://localhost:8080/api/clone/" + idItem,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            $("#ventanaRegistrarInventario").modal("show");
            $("#editarInventario").show();
            $("#guardarInventario").hide();
            $("#idInventario").val(response.id);
            $("#brandRegistro").val(response.brand);
            $("#procesorRegistro").val(response.procesor);
            $("#osRegistro").val(response.os);
            $("#descriptionRegistro").val(response.description);
            $("#memoryRegistro").val(response.memory);
            $("#hardDriveRegistro").val(response.hardDrive);
            $("#availabilityRegistro").val(response.availability);
            $("#priceRegistro").val(response.price);
            $("#quantityRegistro").val(response.quantity);
            $("#photographyRegistro").val(response.photography);
        }
    });
}

function eliminarInventario(idElemento) {
    let elemento = {
      id: idElemento,
    }
    let datoEnvio = JSON.stringify(elemento);
    console.log(datoEnvio);
    $.ajax({
      url: "http://localhost:8080/api/clone/" + idElemento,
      type: "DELETE",
      data: datoEnvio,
      datatype: "json",
      contentType: 'application/json',
      success: function (respuesta) {
        alert("Eliminado correctamente :)");
        $("#miTablaInventario").empty();
        consultarInventario();
      }
    });
  }

function botonModalInventario(){
    $("#guardarInventario").show();
    $("#editarInventario").hide();
}

$("#cerrarSesion").click(function(){
    localStorage.clear();
    location.href = "../paginas/index.html";
});

window.onload = consultarInventario();