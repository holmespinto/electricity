/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, {  useContext } from 'react';
//import Material from '../GestionBasica/Material/Material';
//import Cliente from '../GestionBasica/Cliente/Cliente';
import GestionarProyecto from '../Informes/GestionarProyecto/GestionarProyecto';
//import Empleado from '../GestionBasica/Empleado/Empleado';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const Informes = (props) => {
const {itemsProyecto} = useContext(DashboardContext);

/*
  useEffect(() => {
    ConsultarListaDatos(props.accion, props.tipo);
  }, [ConsultarListaDatos, props.accion, props.tipo]);

  useEffect(() => {
    //query(props.accion,'Cliente','consultar');
  }, [props.accion,query]);
*/
const proyectos = itemsProyecto?.data || [{}]
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'GestionarProyecto':
            return (<><GestionarProyecto
              accion={'GestionarProyecto'}
              tipo={props.tipo}
              datos={proyectos}
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

export default Informes;
