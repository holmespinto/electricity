// @flow
import React from 'react';
import RegistrarEmpleado from './RegistrarEmpleado';
import ControlDiario from './ControlDiario';
import OrdenCompra from './OrdenCompra';
import GenerarNomina from './GenerarNomina';
import ListProyectos from './ListProyectos';

const OtrosRegistros = (props) => {
  return (
    <>
 {(() => {
        switch (props.tipo) {
          case 'RegistrarEmpleado':
            return (<><RegistrarEmpleado accion={'OtrosRegistros'} tipo={props.tipo}/></>);
          case 'ControlDiario':
            return (<><ControlDiario accion={'OtrosRegistros'} tipo={props.tipo}/></>);
            case 'OrdenCompra':
            return (<><OrdenCompra accion={'OtrosRegistros'} tipo={props.tipo}/></>);
            case 'GenerarNomina':
            return (<><GenerarNomina accion={'OtrosRegistros'} tipo={props.tipo}/></>);
          case 'CotizarProyecto':case 'LiquidarProyecto':case 'EstadoProyecto':
            return (<><ListProyectos accion={'OtrosRegistros'} tipo={props.tipo}/></>);
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
