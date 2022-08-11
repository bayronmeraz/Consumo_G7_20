var UrlEstudiantes = "http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=GetEstudiantes";
var UrlInsertEstudiante = 'http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=InsertEstudiante';

$(document).ready(function(){
    CargarEstudiantes();
  });

  function CargarEstudiantes(){
    $.ajax({
      url: UrlEstudiantes,
      type: 'GET',
      datatype: 'JSON',
      success: function(reponse){
        var MiItems = reponse;
        var Valores = '';

        for (i=0; i < MiItems.length; i++){
            Valores += '<tr>'+
            '<td>'+ MiItems[i].numeroAlumno +'</td>'+
            '<td>'+ MiItems[i].nombre +'</td>'+
            '<td>'+ MiItems[i].apellidos +'</td>'+
            '<td>'+ MiItems[i].fechaNacimiento +'</td>'+
            '<td>'+ MiItems[i].direccion +'</td>'+
            '<td>'+ MiItems[i].altura +'</td>'+
            '<td>'+ MiItems[i].carrera +'</td>'+
        '</tr>';
        $('#DataEstudiantes').html(Valores);
        }
      }
    });
  }

  function AgregarEstudiante(){
    var datosestudiante = {
    NUMERO_ALUMNO : $('#numeroAlumno').val(),
    NOMBRE : $('#nombre').val(),
    APELLIDOS : $('#apellidos').val(),
    FECHA_NACIMIENTO: $('#fechaNacimiento').val(),
    DIRECCION : $('#direccion').val(),
    ALTURA : $('#altura').val(),
    CARRERA : $('#carrera').val()
    };
    var datosestudiantejson = JSON.stringify(datosestudiante);

    $.ajax({
        url: UrlInsertEstudiante,
        type: 'POST',
        data: datosestudiantejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Estudiante agregado exitosamente');          
        },
        Error:function(textStatus, errorThrown){
            alert('Error al agregar estudiante'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}