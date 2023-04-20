// @flow
import React from 'react';
import ConsultaMaterial from './ConsultaMaterial';
import ConsultaControlDiario from './ConsultaControlDiario';
import ConsultaOrdenCompra from './ConsultaOrdenCompra';

const ConsultasBasicas = (props) => {
  return (
    <>
 {(() => {
        switch (props.tipo) {
          case 'ConsultaMaterial':case 'ConsultaManoObra':case 'ConsultaHerramientas':
            return (<><ConsultaMaterial
              accion={'Informes'}
              tipo={props.tipo}
              materias={props.materias}
              /></>);
         case 'ConsultaCliente':
            case 'OtrasControlDiario':
            return (<><ConsultaControlDiario accion={'OtrasConsultas'} tipo={props.tipo}/></>);
              case 'OtrasOrdenCompra':
            return (<><ConsultaOrdenCompra accion={'OtrasConsultas'} tipo={props.tipo}/></>);
           case 'ConsultaApu':
            return (<>{'ConsultaApu'}</>);
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default ConsultasBasicas;
