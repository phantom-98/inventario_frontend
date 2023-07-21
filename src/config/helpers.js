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

    for (let i = 0; i < inventario.length; i++) {
        const producto = inventario[i];
        totalUnidades += Number(producto.qty);
        totalCostoPonderado += Number(producto.qty) * Number(producto.price);
    }
    const costoPromedioPonderado = totalCostoPonderado / (totalUnidades);

    return costoPromedioPonderado ? insertarPuntos(Math.round(costoPromedioPonderado)) : 0;

}


function dateFormat(dateInformat) {
    if(dateInformat == 0 ){
        return 0
    }

    return moment(dateInformat).format("DD-MM-YYYY H:mm")
}
function dateFormat2(dateInformat) {
    let mm = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    if(dateInformat == 0 ){
        return 0
    }

    let month =  moment(dateInformat).format("M")
    return mm[month-1]
}

function mapDte(type){
    switch (type) {
        case 61:
            return "Nota de Credito"
            break;
        case 34:
            return "Factura Exenta"
            break;
        case 33:
            return "Factura"
            break;
        case 52:
            return "Guía de Despacho"
            break;
        case 39:
            return "Boleta"
            break;
        default:
            return "dte?"
            break;
    }
}

function dateClose(provider, facturaDate){
    if(!provider || !provider.creditCondition){
        return 0
    }else{
        return moment(facturaDate).add(provider.creditCondition, "days")
    }
}



export { dateFormat2, succesSwal, errorSwal, deleteSwal, insertarPuntos, dateFormat, getCpp, mapDte, dateClose };