// @flow
import React, { useEffect, useContext } from 'react';
import Material from './Material';
import Cliente from './Cliente';
import Proyecto from './Proyecto';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const GestionBasica = (props) => {
  const {ConsultarListaDatos,items } = useContext(DashboardContext);
  useEffect(() => {
    ConsultarListaDatos();
  }, [ConsultarListaDatos]);

  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'Material':case 'ManoObra':case 'Herramientas':
            return (<><Material
              accion={'GestionBasica'}
              materias={items}

              tipo={props.tipo}
            /></>);
          case 'Cliente':
            return (<><Cliente
              accion={'GestionBasica'}
              tipo={props.tipo}
              materias={items}/></>);
          case 'Proyecto':
            return (<><Proyecto
              accion={'GestionBasica'}
              tipo={props.tipo}
              materias={items}/></>);
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default GestionBasica;
