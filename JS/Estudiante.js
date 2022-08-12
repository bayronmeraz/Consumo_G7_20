var UrlEstudiantes = "http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=GetEstudiantes";
var UrlInsertEstudiante = 'http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=InsertEstudiante';
var UrlGetEstudiante = 'http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=GetEstudiante';
var UrlUpdateEstudiante = 'http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=UpdateEstudiante';
var UrlDeleteEstudiante = 'http://20.216.41.245:90/G7_20/controller/estudianteC.php?opc=DeleteEstudiante';

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
            '<td>'+
            '<button class = "btn btn-info" onclick = "CargarEstudiante('+ MiItems[i].numeroAlumno +')">Editar</button>'+
            '</td>'+
            '<td>'+
            '<button class = "btn btn-danger" onclick = "EliminarEstudiante('+ MiItems[i].numeroAlumno +')">Eliminar</button>'+
            '</td>'+
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

function CargarEstudiante(numAlumno){
  var datosestudiante = {
    numeroAlumno: numAlumno
  };
  var datosestudiantejson = JSON.stringify(datosestudiante);

  $.ajax({
      url: UrlGetEstudiante,
      type: 'POST',
      data: datosestudiantejson,
      datatype: 'JSON',
      contentType: 'application/json',
      success: function(response){
          var MiItems = response;
          $('#numeroAlumno').val(MiItems[0].numeroAlumno);
          $('#nombre').val(MiItems[0].nombre);
          $('#apellidos').val(MiItems[0].apellidos);
          $('#fechaNacimiento').val(MiItems[0].fechaNacimiento);
          $('#direccion').val(MiItems[0].direccion);
          $('#altura').val(MiItems[0].altura);
          $('#carrera').val(MiItems[0].carrera);
          var btnactualizar = '<input type = "submit" id= "btn_actualizar" onclick = "ActualizarEstudiante('+ MiItems[0].numeroAlumno +')"'+
          'value="Actualizar Estudiante" class = "btn btn-primary"></tr>';
          $('#btnagregarestudiante').html(btnactualizar);
      }

  });
}

function ActualizarEstudiante(numAlumno){
  var datosestudiante = {
      NUMERO_ALUMNO: numAlumno,
      NOMBRE: $('#nombre').val(),
      APELLIDOS: $('#apellidos').val(),
      FECHA_NACIMIENTO: $('#fechaNacimiento').val(),
      DIRECCION: $('#direccion').val(),
      ALTURA: $('#altura').val(),
      CARRERA: $('#carrera').val()   
  };
  var datosestudiantejson= JSON.stringify(datosestudiante);
  $.ajax({
      url: UrlUpdateEstudiante,
      type:'PUT',
      data: datosestudiantejson,
      dataType: 'JSON',
      contentType: 'application/json',
      success: function(reponse){
          console.log(reponse);
          alert("Estudiante actualizado exitosamente");
      },
      error: function(textStatus, errorThrown){
          alert('Error al actualizar estudiante'+ textStatus + errorThrown);
      }
  });
  alert('Aviso');
}

function EliminarEstudiante(numAlumno){
  var datosestudiante = {
      numeroAlumno: numAlumno  
  };
  var datosestudiantejson = JSON.stringify(datosestudiante);
  $.ajax({
      url: UrlDeleteEstudiante,
      type: 'DELETE',
      data: datosestudiantejson,
      dataType: 'JSON',
      contentType: 'application/json',
      success: function(reponse){
          console.log(reponse);
          alert("Estudiante Eliminado");
      },
      error: function(textStatus, errorThrown){
          alert('Error al eliminar estudiante'+ textStatus + errorThrown);
      }   
  });
  alert("Aviso");
  CargarEstudiantes();

}