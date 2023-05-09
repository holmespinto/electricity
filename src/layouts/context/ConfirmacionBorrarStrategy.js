/* eslint-disable import/no-anonymous-default-export */
import Swal from 'sweetalert2'

class ConfirmacionBorrarStrategy  {
  confirmar(cel, borrarCallback) {
    Swal.fire({
      title: 'Desea eliminar el la APU del Proyecto? ' + cel,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        borrarCallback(cel);
      }
    });
  }
}
export default ConfirmacionBorrarStrategy ;
