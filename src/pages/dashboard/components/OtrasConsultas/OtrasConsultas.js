// @flow
import React, { useContext } from 'react';
import ControlDiario from '../OtrosRegistros/ControlDiario/ControlDiario';
import OrdenCompra from '../OtrosRegistros/OrdenCompra/OrdenCompra';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const OtrasConsultas = (props) => {
  const {itemsControlDiario,itemsOrdenCompra} = useContext(DashboardContext);
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
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default OtrasConsultas;
