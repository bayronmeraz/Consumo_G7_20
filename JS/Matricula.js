var UrlMatriculas = 'http://20.216.41.245:90/G7_20/controller/matricula.php?opc=GetMatriculas';
var UrlInsertMatricula = 'http://20.216.41.245:90/G7_20/controller/matricula.php?opc=InsertMatricula';
var UrlGetMatricula = 'http://20.216.41.245:90/G7_20/controller/matricula.php?opc=GetMatricula';
var UrlUpdateMatricula = 'http://20.216.41.245:90/G7_20/controller/matricula.php?opc=UpdateMatricula';
var UrlDeleteMatricula = 'http://20.216.41.245:90/G7_20/controller/matricula.php?opc=DeleteMatricula';

$(document).ready(function(){
    CargarMatriculas();
});

function CargarMatriculas(){
    $.ajax({
        url: UrlMatriculas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].CodigoMatricula +'</td>'+
                '<td>'+ MiItems[i].NombreAsignatura +'</td>'+
                '<td>'+ MiItems[i].NumeroAlumno +'</td>'+
                '<td>'+ MiItems[i].FechaMatricula +'</td>'+
                '<td>'+ MiItems[i].NumeroDocente +'</td>'+
                '<td>'+ MiItems[i].Carrera +'</td>'+
                '<td>'+ MiItems[i].NumeroEdificio +'</td>'+  
            '<td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarMatricula('+ MiItems[i].CodigoMatricula +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="BorrarRegistro('+ MiItems[i].CodigoMatricula +')">EliminarRegistro</button>'+ 
                '</td>'+          
            '</tr>';
            $('#DataMatriculas').html(Valores);
            } 
        }
    });
}

function AgregarMatricula(){
    var datosmatricula = {
        CodigoMatricula : $('#CodigoMatricula').val(),
        NombreAsignatura : $('#NombreAsignatura').val(),
        NumeroAlumno : $('#NumeroAlumno').val(),
        FechaMatricula : $('#FechaMatricula').val(),
        NumeroDocente : $('#NumeroDocente').val(),
        Carrera : $('#Carrera').val(),
        NumeroEdificio : $('#NumeroEdificio').val()
    };
    var datosmatriculajson = JSON.stringify(datosmatricula);

    $.ajax({
        url: UrlInsertMatricula,
        type: 'POST',
        data: datosmatriculajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Registro de matricula agregado correctamente');
        },
        error:function(textStatus, errorThrow){
            alert('Error al agregar registro de matricula'+ textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function CargarMatricula(codigomatricula) {
    var datosmatricula = {
        CodigoMatricula: codigomatricula
    };
    var datosmatriculajson = JSON.stringify(datosmatricula);

    $.ajax({
        url: UrlGetMatricula,
        type: 'POST',
        data: datosmatriculajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#CodigoMatricula').val(MiItems[0].CodigoMatricula);
            $('#NombreAsignatura').val(MiItems[0].NombreAsignatura);
            $('#NumeroAlumno').val(MiItems[0].NumeroAlumno);
            $('#FechaMatricula').val(MiItems[0].FechaMatricula);
            $('#NumeroDocente').val(MiItems[0].NumeroDocente);
            $('#Carrera').val(MiItems[0].Carrera);
            $('#NumeroEdificio').val(MiItems[0].NumeroEdificio);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarMatricula(' + MiItems[0].CodigoMatricula + ')"'+
            'value="Actualizar Matricula" class="btn btn-primary"></input>';
            $('#btnagregarregistro').html(btnactualizar);
        }

    })
}

function ActualizarMatricula(codigomatricula){
    var datosmatricula = {
        CodigoMatricula: codigomatricula,
        NombreAsignatura:$('#NombreAsignatura').val(),
        NumeroAlumno:$('#NumeroAlumno').val(),
        FechaMatricula:$('#FechaMatricula').val(),
        NumeroDocente:$('#NumeroDocente').val(),
        Carrera:$('#Carrera').val(),
        NumeroEdificio:$('#NumeroEdificio').val()
    };
    var datosmatriculajson = JSON.stringify(datosmatricula);

    $.ajax({
        url: UrlUpdateMatricula,
        type: 'PUT',
        data: datosmatriculajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse) {
            console.log(reponse);
            alert("Registro Actualizado");
        },
        error: function(textStatus, errorThrow ){
            alert('Error al actualizar registro'+ textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function BorrarRegistro(codigomatricula){
   var datosmatricula = {
    CodigoMatricula: codigomatricula
   };
   var datosmatriculajson = JSON.stringify(datosmatricula);

   $.ajax({
    url: UrlDeleteMatricula,
    type: 'DELETE',
    data: datosmatriculajson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function(reponse) {
        console.log(reponse);

    }
   });
   alert("Registro Eliminado");
   CargarMatriculas();
}