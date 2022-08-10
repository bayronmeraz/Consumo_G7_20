var UrlAsignaturas = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=Getasignaturas';
var UrlInsertAsignaturas = 'http://20.216.41.245:90/G7_20/controller/AsignaturaControlle.php?opc=insertasignatura';

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
    FechaCreacion : $('#FechaCreacion').val(),
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