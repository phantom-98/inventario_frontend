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

function dateFormat(dateInformat) {

    return moment(dateInformat).format("DD-MM-YYYY H:mm")
}



export { succesSwal, errorSwal, deleteSwal, insertarPuntos, dateFormat };