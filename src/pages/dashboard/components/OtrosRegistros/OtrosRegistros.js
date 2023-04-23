// @flow
import React, { useEffect, useContext } from 'react';
import ControlDiario from './ControlDiario/ControlDiario';
import OrdenCompra from './OrdenCompra/OrdenCompra';
import MenuNomina from './Nomina/MenuNomina';
import Usuarios from './Usuarios/Usuarios';
import Roles from './Roles/Roles';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const OtrosRegistros = (props) => {
  const { ConsultarListaDatos, items,itemsUsuarios,itemsRoles,listEmpleados  } = useContext(DashboardContext);

  useEffect(() => {
    ConsultarListaDatos(props.accion, props.tipo);
  }, [ConsultarListaDatos, props.accion, props.tipo]);



  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'ControlDiario':
            return (<>

            <ControlDiario
              accion={'GestionBasica'}
              datos={items}
              tipo={props.tipo}
            />

            </>);
            case 'OrdenCompra':
            return (<><OrdenCompra
              accion={'GestionBasica'}
              datos={items}
              tipo={props.tipo}
            /></>);
            case 'GenerarNomina':
            return (<><MenuNomina
              accion={'GestionBasica'}
              datos={listEmpleados}
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
