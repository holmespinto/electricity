/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext } from 'react';
import Productos from './Productos/Productos';
import Cliente from './Cliente/Cliente';
import Proyecto from './Proyecto/Proyecto';
import Empleado from './Empleado/Empleado';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const GestionBasica = (props) => {

  const {itemsProyecto,
    itemsCliente,
    itemsEmpleado,itemsProductos
  } = useContext(DashboardContext);
const proyectos = itemsProyecto?.data || [{}]
  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'Productos':
            return (<><Productos
              accion={'GestionBasica'}
              datos={itemsProductos}
              tipo={props.tipo}
            /></>);
          case 'Empleado':
            return (<><Empleado
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={itemsEmpleado}
              /></>);
          case 'Cliente':
            return (<><Cliente
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={itemsCliente}
              /></>);
          case 'Proyecto':
            return (<><Proyecto
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={proyectos}/></>);
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
