/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import Productos from './Productos/Productos';
import Cliente from './Cliente/Cliente';
import Proyecto from './Proyecto/Proyecto';
import Empleado from './Empleado/Empleado';
import PermisoAlert from '../PermisoAlert/PermisoAlert';
const GestionBasica = (props) => {
const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Productos':
            return <>
              { permisos?.query?.length === 1?
              <Productos
              accion={'GestionBasica'}
              tipo={props.tipo}
              permisos={props.permisos}
        />:<PermisoAlert/>}
        </>
          case 'Empleado':
            return <>
            { permisos?.query?.length === 1 ?
            <Empleado
              accion={'GestionBasica'}
              tipo={props.tipo}
              permisos={props.permisos}
              />:<PermisoAlert/>}
              </>
          case 'Cliente':
            return <>
            { permisos?.query?.length === 1 ?
            <Cliente
              accion={'GestionBasica'}
              tipo={props.tipo}
              permisos={props.permisos}
              />:<PermisoAlert/>}
              </>
          case 'Proyecto':
            return <>
           { permisos?.query?.length === 1 ?
            <Proyecto
              accion={'GestionBasica'}
              tipo={props.tipo}
              permisos={props.permisos}
              />:<PermisoAlert/>}
              </>
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default GestionBasica;
