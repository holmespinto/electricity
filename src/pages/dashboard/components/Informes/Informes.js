/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, {  useContext,useEffect } from 'react';
//import Material from '../GestionBasica/Material/Material';
//import Cliente from '../GestionBasica/Cliente/Cliente';
import GestionarProyecto from '../Informes/GestionarProyecto/GestionarProyecto';
import EditarProyecto from '../Informes/EditarProyecto/EditarProyecto';
//import Empleado from '../GestionBasica/Empleado/Empleado';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const Informes = (props) => {
const {itemsEditarProyecto,idCategoria, setIdCategoria,
  pagesInSearch,itemsProyecto} = useContext(DashboardContext);

//const Productos = itemsEditarProyecto?.data?.Productos || [{}]
const Apus = itemsEditarProyecto?.data?.Apus || [{}]
const gestionProyectos = itemsProyecto?.data || [{}]
const proyectos = itemsEditarProyecto?.data?.Proyecto || [{}]
const Productos = itemsEditarProyecto?.data?.Productos || [{}]
useEffect(() => {
const id = pagesInSearch();
  let str = '#/dashboard/Informes/EditarProyecto?p=';
  setIdCategoria(id?.replace(str, ''))

}, [])
const DatosProyect = proyectos?.length>0?proyectos?.filter((t) => t.id === idCategoria):[{}]
 const DatosApus= Apus?.length>0?Apus?.filter((t) => t.IdProyecto === idCategoria):[{}]
 const DatosProductos= Productos?.length>0?Productos?.filter((t) => t.IdProyecto === idCategoria):[{}]

const Datos=[{"data":{DatosProyect:DatosProyect[0],idProyecto:idCategoria,Apus:DatosApus,Productos:DatosProductos}}]
 //console.log('itemsEditarProyecto',gestionProyectos)
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'GestionarProyecto':
            return (<><GestionarProyecto
              accion={'GestionarProyecto'}
              tipo={props.tipo}
              datos={gestionProyectos}
              /></>);
              case 'EditarProyecto':
                return (<><EditarProyecto
                  accion={'EditarProyecto'}
                  tipo={props.tipo}
                  datos={Datos}
                  idProyecto={idCategoria}
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
