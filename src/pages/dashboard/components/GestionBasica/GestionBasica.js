// @flow
import React, { useEffect, useContext } from 'react';
import Material from './Material/Material';
import Cliente from './Cliente/Cliente';
import Proyecto from './Proyecto/Proyecto';
import Empleado from './Empleado/Empleado';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const GestionBasica = (props) => {
  const {ConsultarListaDatos,items,query } = useContext(DashboardContext);

  useEffect(() => {
    ConsultarListaDatos(props.accion, props.tipo);
  }, [ConsultarListaDatos, props.accion, props.tipo]);

  useEffect(() => {
    query(props.accion,'Cliente','consultar');
  }, [props.accion,query]);
  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'Material':case 'ManoObra':case 'Herramientas':
            return (<><Material
              accion={'GestionBasica'}
              datos={items}
              tipo={props.tipo}
            /></>);
          case 'Empleado':
            return (<><Empleado
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={items}
              /></>);
          case 'Cliente':
            return (<><Cliente
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={items}
              /></>);
          case 'Proyecto':
            return (<><Proyecto
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={items}/></>);
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
