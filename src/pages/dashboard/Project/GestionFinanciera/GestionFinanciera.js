/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import ControlDiario from './ControlDiario/ControlDiario';
import Empleado from './Empleado/Empleado';
import Nomina from './Nomina/Nomina/Nomina';
import OrdenCompra from './OrdenCompra/OrdenCompra';
const GestionFinanciera = (props) => {
  const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Empleado':
            return <>
              {permisos?.query?.length === 1 ?
                <Empleado
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'ControlDiario':
            return <>
              {permisos?.query?.length === 1 ?
                <ControlDiario
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'OrdenCompra':
            return <>
              {permisos?.query?.length === 1 ?
                <OrdenCompra
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'Nomina':
            return <>
              {permisos?.query?.length === 1 ?
                <Nomina
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
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

export default GestionFinanciera;
