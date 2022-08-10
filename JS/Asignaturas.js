var UrlAsignaturas = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=Getasignaturas';
var UrlInsertAsignaturas = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=insertasignatura';
var UrlGetAsignatura = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=Getasignatura';
var UrlUpdateAsignatura = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=Updateasignatura';
var UrlDeleteAsignatura = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=Delteasignatura';

$(document).ready(function(){
  CargarAsignaturas();
});

function CargarAsignaturas(){
    $.ajax({
        url: UrlAsignaturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for (i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].CodigoAsignatura +'</td>'+
                '<td>'+ MiItems[i].NombreAsignatura +'</td>'+
                '<td>'+ MiItems[i].Carrera +'</td>'+
                '<td>'+ MiItems[i].FechaCreacion +'</td>'+
                '<td>'+ MiItems[i].UnidadesValorativas +'</td>'+
                '<td>'+ MiItems[i].PromedioAprobacion +'</td>'+
                '<td>'+ MiItems[i].NumeroEdificio +'</td>'+
                '<td>'+
                '<button class = "btn btn-info" onclick = "CargarAsignatura('+ MiItems[i].CodigoAsignatura +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class = "btn btn-danger" onclick = "EliminarAsignatura('+ MiItems[i].CodigoAsignatura +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataAsignaturas').html(Valores);
            }
        }
    });
}

function AgregarAsignatura(){
    var datosasignatura = {
    CodigoAsignatura : $('#CodigoAsignatura').val(),
    NombreAsignatura : $('#NombreAsignatura').val(),
    Carrera : $('#Carrera').val(),
    FechaCreacion: $('#FechaCreacion').val(),
    UnidadesValorativas : $('#UnidadesValorativas').val(),
    PromedioAprobacion : $('#PromedioAprobacion').val(),
    NumeroEdificio : $('#NumeroEdificio').val()
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlInsertAsignaturas,
        type: 'POST',
        data: datosasignaturajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Asigantura agregada con exito');          
        },
        Error:function(textStatus, errorThrown){
            alert('Error al agregar asignatura'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarAsignatura (CodAsignatura){
    var datosasignatura = {
        CodigoAsignatura: CodAsignatura
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);

    $.ajax({
        url: UrlGetAsignatura,
        type: 'POST',
        data: datosasignaturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#CodigoAsignatura').val(MiItems[0].CodigoAsignatura);
            $('#NombreAsignatura').val(MiItems[0].NombreAsignatura);
            $('#Carrera').val(MiItems[0].Carrera);
            $('#FechaCreacion').val(MiItems[0].FechaCreacion);
            $('#UnidadesValorativas').val(MiItems[0].UnidadesValorativas);
            $('#PromedioAprobacion').val(MiItems[0].PromedioAprobacion);
            $('#NumeroEdificio').val(MiItems[0].NumeroEdificio);
            var btnactualizar = '<input type = "submit" id= "btn_actualizar" onclick = "ActualizarAsignatura('+ MiItems[0].CodigoAsignatura +')"'+
            'value="Actualizar Asignatura" class = "btn btn-primary"></tr>';
            $('#btnagregarasignatura').html(btnactualizar);
        }

    });
}

function ActualizarAsignatura(CodAsignatura){
    var datosasignatura = {
        CodigoAsignatura: CodAsignatura,
        NombreAsignatura: $('#NombreAsignatura').val(),
        Carrera: $('#Carrera').val(),
        FechaCreacion: $('#FechaCreacion').val(),
        UnidadesValorativas: $('#UnidadesValorativas').val(),
        PromedioAprobacion: $('#PromedioAprobacion').val(),
        NumeroEdificio: $('#NumeroEdificio').val()   
    };
    var datosasignaturajson= JSON.stringify(datosasignatura);
    $.ajax({
        url: UrlUpdateAsignatura,
        type:'PUT',
        data: datosasignaturajson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Asignatura Actualizada con Exito");
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar la asignatura'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarAsignatura(CodAsignatura){
    var datosasignatura = {
        CodigoAsignatura: CodAsignatura  
    };
    var datosasignaturajson = JSON.stringify(datosasignatura);
    $.ajax({
        url: UrlDeleteAsignatura,
        type: 'DELETE',
        data: datosasignaturajson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Asignatura Eliminada");
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar la asignatura'+ textStatus + errorThrown);
        }   
    });
    alert("Aviso");
    CargarAsignaturas();

}