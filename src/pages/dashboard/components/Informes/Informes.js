// @flow
import React from 'react';
import ListProyectos from './ListProyectos';
import ListLiquidacion from './ListLiquidacion';
import ListNomina from './ListNomina';

const Informes = (props) => {
  return (
    <>
 {(() => {
        switch (props.tipo) {
          case 'ConsultaProyecto':
            return (<><ListProyectos accion={'Informes'} tipo={props.tipo}/></>);
          case 'Liquidacion':
            return (<><ListLiquidacion accion={'Informes'} tipo={props.tipo}/></>);
          case 'ConsultaNomina':
            return (<><ListNomina accion={'Informes'} tipo={props.tipo}/></>);
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default Informes;
