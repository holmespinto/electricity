// @flow
import React, { useEffect, useContext } from 'react';
import ControlDiario from './ControlDiario/ControlDiario';
import OrdenCompra from './OrdenCompra/OrdenCompra';
import MenuNomina from './Nomina/MenuNomina';
import Usuarios from './Usuarios/Usuarios';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const OtrosRegistros = (props) => {
  const { ConsultarListaDatos, items,query,itemsUsuarios } = useContext(DashboardContext);

  useEffect(() => {
    ConsultarListaDatos(props.accion, props.tipo);
  }, [ConsultarListaDatos, props.accion, props.tipo]);

  useEffect(() => {
    query('GestionBasica','Empleado',[{opcion:'consultar_nomina'}]);
  }, [query]);

  useEffect(() => {
    query('GestionBasica','Usuarios',[{opcion:'lista_Usuarios',obj:'Usuarios'}]);
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
            case 'Usuarios':
            return (<><Usuarios
              accion={'GestionBasica'}
              tipo={props.tipo}
              datos={itemsUsuarios?.data}
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
