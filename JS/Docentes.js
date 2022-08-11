var UrlDocentes = 'http://20.216.41.245:90/G7_20/controller/docenteC.php?opc=get_docentes'

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
              '</tr>';
              $('#DataDocentes').html(Valores);
            }
        }
    });
}