import Swal from 'sweetalert2';
import clienteAxios from 'config/axios';
import moment from 'moment'
const succesSwal = (url) => {
    Swal.fire({
        text: "Form ah sido enviado exitosamente!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: { confirmButton: "btn btn-primary" },
    }).then(() => {
      if(url){
        location.href = url
      }
    });
}
  
const errorSwal = (msg = null) => {
    Swal.fire({
        text: msg ? msg : "Lo sentimos, parece que se han detectado algunos errores, inténtalo de nuevo.",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: { confirmButton: "btn btn-primary"},
    });
}

const deleteSwal = (url) => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            clienteAxios.delete(url).then(d=>{
                Swal.fire(
                    'Borrado!',
                    '',
                    'success'
                )

                location.href=""
                
            });

          
        }
      })
}

function insertarPuntos(numero) {
    if(!numero){
        return 0
    }
    let numeroRevertido = numero.toString().split("").reverse().join("");
    let grupos = numeroRevertido.match(/.{1,3}/g);
    let resultado = grupos.join(".").split("").reverse().join("");
    return resultado;
}

function getCpp(inventario, stock){
    if(!inventario){
        return 0
    }
    let totalUnidades = 0;
    let totalCostoPonderado = 0;

    // Calcular el total de unidades y el costo ponderado
    for (let i = 0; i < inventario.length; i++) {
        const producto = inventario[i];
        totalUnidades += Number(producto.qty);
        totalCostoPonderado += Number(producto.qty) * Number(producto.price);
    }

    console.log(totalUnidades)
    console.log(totalCostoPonderado)

    // Calcular el costo promedio ponderado
    const costoPromedioPonderado = totalCostoPonderado / (totalUnidades);

    return costoPromedioPonderado ? insertarPuntos(Math.round(costoPromedioPonderado)) : 0;

}

function dateFormat(dateInformat) {

    return moment(dateInformat).format("DD-MM-YYYY H:mm")
}



export { succesSwal, errorSwal, deleteSwal, insertarPuntos, dateFormat, getCpp };