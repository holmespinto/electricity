// @flow
import React, { useContext } from 'react';
import ControlDiario from './ControlDiario/ControlDiario';
import OrdenCompra from './OrdenCompra/OrdenCompra';
import Nomina from './Nomina/Nomina';
import ConfigNomina from './ConfigNomina/ConfigNomina';
import Usuarios from './Usuarios/Usuarios';
import Roles from './Roles/Roles';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const OtrosRegistros = (props) => {
  const { itemsUsuarios,itemsRoles,itemsControlDiario,itemsOrdenCompra} = useContext(DashboardContext);
  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'ControlDiario':
            return (<>
            <ControlDiario
              accion={'GestionBasica'}
              datos={itemsControlDiario}
              tipo={props.tipo}
            />
            </>);
            case 'OrdenCompra':
            return (<><OrdenCompra
              accion={'GestionBasica'}
              datos={itemsOrdenCompra}
              tipo={props.tipo}
            /></>);
            case 'GenerarNomina':
            return (<>

            <Nomina
              accion={'GestionBasica'}
              tipo={props.tipo}
            /></>);
            case 'Usuarios':
            return (<><Usuarios
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={itemsUsuarios?.data}
            /></>);
            case 'Roles':
            return (<>
            <Roles
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={itemsRoles}
            /></>);
            case 'ConfigNomina':
            return (<>
            <ConfigNomina
              accion={'GestionBasica'}
              tipo={props.tipo}
            /></>);
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
