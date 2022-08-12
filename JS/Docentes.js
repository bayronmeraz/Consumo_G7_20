var UrlDocentes = 'http://20.216.41.245:90/G7_20/controller/docenteC.php?opc=get_docentes';
var UrlInsertarDocente = 'http://20.216.41.245:90/G7_20/controller/docenteC.php?opc=insert_docente';
var UrlGetDocente = 'http://20.216.41.245:90/G7_20/controller/docenteC.php?opc=get_docente';
var UrlUpdateDocente = 'http://20.216.41.245:90/G7_20/controller/docenteC.php?opc=update_docente';
var DeleteDocente = 'http://20.216.41.245:90/G7_20/controller/docenteC.php?opc=delete_docente';

$(document).ready(function(){
    CargarDocentes();
});

function CargarDocentes(){
    $.ajax({
        url: UrlDocentes,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i<MiItems.length;i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].NumeroDocente +'</td>'+
                '<td>'+MiItems[i].NombreDocente +'</td>'+
                '<td>'+MiItems[i].ApellidoDocente +'</td>'+
                '<td>'+MiItems[i].FechaContratacion +'</td>'+
                '<td>'+MiItems[i].DireccionDocente +'</td>'+
                '<td>'+MiItems[i].SalarioDoncente +'</td>'+
                '<td>'+MiItems[i].ProfesionDocente+'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarDocente('+ MiItems[i].NumeroDocente+')">editar</button'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="EliminarDocente('+ MiItems[i].NumeroDocente+')">Eliminar</button'+
                '</td>'+
              '</tr>';
              $('#DataDocentes').html(Valores);
            }
        }
    });
}
function AgregarDocentes(){
    var datosDocentes = {
        NumeroDocente: $('#NumeroDocente').val(),
        NombreDocente: $('#NombreDocente').val(),
        ApellidoDocente: $('#ApellidoDocente').val(),
        FechaContratacion: $('#FechaContratacion').val(),
        DireccionDocente:$('#DireccionDocente').val(),
        SalarioDoncente:$('#SalarioDoncente').val(),
        ProfesionDocente: $('#ProfesionDocente').val()
    };
    var datosDocentesjson = JSON.stringify(datosDocentes);
alert(datosDocentes);
    $.ajax({
        url: UrlInsertarDocente,
        type: 'POST',
        data: datosDocentesjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Docente agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Docente'+ textStatus+errorThrown);
        }
    });
    alert('Aviso');
}
function CargarDocente(iddocente){
    var datosDocentes = {
        NumeroDocente: iddocente
    };
    var datosDocentesjson = JSON.stringify(datosDocentes);

    $.ajax({
        url: UrlGetDocente,
        type: 'POST',
        data: datosDocentesjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (Response){
            var MiItems = Response;
            $('#NumeroDocente').val(MiItems[0].NumeroDocente);
            $('#NombreDocente').val(MiItems[0].NombreDocente);
            $('#ApellidoDocente').val(MiItems[0].ApellidoDocente);
            $('#FechaContratacion').val(MiItems[0].FechaContratacion);
            $('#DireccionDocente').val(MiItems[0].DireccionDocente);
            $('#SalarioDoncente').val(MiItems[0].SalarioDoncente);
            $('#ProfesionDocente').val(MiItems[0].ProfesionDocente);
            var btnactualizar = '<input type = "submit" id= "btn_actualizar" onclick = "ActualizarDocente('+ MiItems[0].NumeroDocente +')"'+
            'value="Actualizar Docente" class = "btn btn-primary"></tr>';
            $('#btnagregarDocente').html(btnactualizar);
        }
        
    });
   
}

function ActualizarDocente(iddocente){
    var datosDocentes = {
        NumeroDocente: iddocente,
        NombreDocente: $('#NombreDocente').val(),
        ApellidoDocente: $('#ApellidoDocente').val(),
        FechaContratacion: $('#FechaContratacion').val(),
        DireccionDocente: $('#DireccionDocente').val(),
        SalarioDoncente: $('#SalarioDoncente').val(),
        ProfesionDocente: $('#ProfesionDocente').val()
    };
    var datosDocentesjson = JSON.stringify(datosDocentes);
    alert(datosDocentes);
    $.ajax({
        url: UrlUpdateDocente,
        type: 'PUT',
        data: datosDocentesjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert('Docente Actualizado');
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Docente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}
function EliminarDocente(iddocente){
    var datosDocentes = {
        NumeroDocente: iddocente  
    };
    var datosDocentesjson = JSON.stringify(datosDocentes);
    $.ajax({
        url: DeleteDocente,
        type: 'DELETE',
        data: datosDocentesjson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Docente Eliminado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar El docente'+ textStatus + errorThrown);
        }   
    });
    alert("Aviso");
    CargarDocentes();

}