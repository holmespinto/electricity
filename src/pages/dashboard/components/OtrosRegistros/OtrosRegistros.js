// @flow
import React, { useEffect, useContext } from 'react';
import ControlDiario from './ControlDiario/ControlDiario';
import OrdenCompra from './OrdenCompra/OrdenCompra';
import MenuNomina from './Nomina/MenuNomina';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const OtrosRegistros = (props) => {
  const { ConsultarListaDatos, items,query } = useContext(DashboardContext);

  useEffect(() => {
    ConsultarListaDatos(props.accion, props.tipo);
  }, [ConsultarListaDatos, props.accion, props.tipo]);

  useEffect(() => {
    query('GestionBasica','Empleado',[{opcion:'consultar'}]);
  }, [query]);
  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'ControlDiario':
            return (<><ControlDiario
              accion={'GestionBasica'}
              datos={items}
              tipo={props.tipo}
            /></>);
            case 'OrdenCompra':
            return (<><OrdenCompra
              accion={'GestionBasica'}
              datos={items}
              tipo={props.tipo}
            /></>);
            case 'GenerarNomina':
            return (<><MenuNomina
              accion={'GestionBasica'}
              datos={items}
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
