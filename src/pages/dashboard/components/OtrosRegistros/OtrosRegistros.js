/* eslint-disable no-unreachable */
// @flow
import React, { useContext } from 'react';
import ControlDiario from './ControlDiario/ControlDiario';
import OrdenCompra from './OrdenCompra/OrdenCompra';
import Nomina from './Nomina/Nomina';
import ConfigNomina from './ConfigNomina/ConfigNomina';
import Usuarios from './Usuarios/Usuarios';
import Roles from './Roles/Roles';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import PermisoAlert from '../PermisoAlert/PermisoAlert';

const OtrosRegistros = (props) => {

const { itemsUsuarios,itemsRoles,} = useContext(DashboardContext);
const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'ControlDiario':
            return (<>
              {permisos?.query?.length === 1 ?
                <ControlDiario
                  accion={'GestionBasica'}
                  tipo={props.tipo}
                  permisos={permisos}
                /> : <PermisoAlert />}
            </>);
            break;
          case 'OrdenCompra':
            return (<>
              {permisos?.query?.length === 1 ?
                <OrdenCompra
                  accion={'GestionBasica'}
                  tipo={props.tipo}
                  permisos={permisos}
                /> : <PermisoAlert />}
            </>);
            break;
          case 'Usuarios':
            return (<>
              {permisos?.query?.length === 1 ?
                <Usuarios
                  accion={'GestionBasica'}
                  tipo={props.tipo}
                  datos={itemsUsuarios?.data}
                  permisos={permisos}
                /> : <PermisoAlert />}
            </>);
            break;
          case 'Roles':
            return (<>
              {permisos?.query?.length === 1 ?
                <Roles
                  accion={'GestionBasica'}
                  tipo={props.tipo}
                  datos={itemsRoles}
                  permisos={permisos}
                /> : <PermisoAlert />}
            </>);
            break;
          case 'ConfigNomina':
            return (<>
              {permisos?.query?.length === 1 ?
                <ConfigNomina
                  accion={'GestionBasica'}
                  tipo={props.tipo}
                  permisos={permisos}
                /> : <PermisoAlert />}
            </>);
            break;
          case 'Nomina':
            return (<>
            {permisos?.query?.length === 1 ?
              <Nomina
                accion={'GestionBasica'}
                tipo={props.tipo}
                permisos={permisos}
              /> : <PermisoAlert />}
          </>);
            break;
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default OtrosRegistros;
