/* eslint-disable react-hooks/exhaustive-deps */
// @flow
//import EditarProyecto from './EditarProyecto/EditarProyecto';
import GestionarProyecto from './GestionarProyecto/GestionarProyecto';
import TarjetasReferencias from './TarjetasReferencias/TarjetasReferencias';
import EditarProyecto from './EditarProyecto/EditarProyecto';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
const GestionProyecto = (props) => {
  const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'GestionarProyecto':
            return <>
              {permisos?.query?.length === 1 ?
                <GestionarProyecto
                  accion={'GestionProyecto'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'asignarApu':
            return <>
              <TarjetasReferencias
                  accion={'GestionProyecto'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                />
            </>
            case 'EditarProyecto':
            return <>
              <EditarProyecto
                  accion={'GestionProyecto'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                />
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

export default GestionProyecto;
