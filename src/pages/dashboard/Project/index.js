/* eslint-disable no-fallthrough */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import GestionBasica from '../../../pages/dashboard/components/GestionBasica/GestionBasica';
import OtrosRegistros from '../../../pages/dashboard/components/OtrosRegistros/OtrosRegistros';
import RegistrosAvanzados from '../../../pages/dashboard/components/RegistrosAvanzados/RegistrosAvanzados';
import Informes from '../../../pages/dashboard/components/Informes/Informes';
import OtrasConsultas from '../../../pages/dashboard/components/OtrasConsultas/OtrasConsultas';
import TarjetasReferencias from '../../../pages/dashboard/components/TarjetasReferencias/TarjetasReferencias';
import { DashboardContext } from '../../../layouts/context/DashboardContext';

const ProjectDashboard = () => {
  const { itemsmenuprincipal, onPermisos } = useContext(DashboardContext)

  useEffect(() => {
    onPermisos(itemsmenuprincipal);
  }, [itemsmenuprincipal, onPermisos]);

  //console.log('index', itemsmenuprincipal)

  return (

    <React.Fragment>
      <Title />
      {(() => {
        switch (itemsmenuprincipal) {
          case 'Productos': case 'Cliente': case 'Proyecto': case 'Empleado':
            return (<><GestionBasica
              accion={'GestionBasica'}
              tipo={itemsmenuprincipal}
            /></>);
          case 'ControlDiario': case 'OrdenCompra': case 'GenerarNomina': case 'Usuarios': case 'Roles': case 'ConfigNomina':
            return (<><OtrosRegistros
              accion={'OtrosRegistros'}
              tipo={itemsmenuprincipal}
            /></>);
          // eslint-disable-next-line no-duplicate-case
          case 'ControlDiario': case 'OrdenCompra': case 'OrdenCompra':
            return (<><OtrasConsultas
              accion={'OtrosRegistros'}
              tipo={itemsmenuprincipal}
            /></>);
          case 'APU': case 'Categorias': case 'EditorPUA': case 'ParametosPrecios':
            return (<><RegistrosAvanzados
              accion={'RegistrosAvanzados'}
              tipo={itemsmenuprincipal}
            /></>);
          case 'RegistrarAPU':
            return (<>{'RegistrarAPU'}</>);
          case 'asignarApu':
            return (<><TarjetasReferencias
              accion={'GestionBasica'}
              tipo={itemsmenuprincipal}
            /></>);
          case 'GestionarProyecto':case 'EditarProyecto':
            return (<><Informes
              accion={'Informes'}
              tipo={itemsmenuprincipal}
            /></>);
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </React.Fragment>
  );
};
ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};
export default ProjectDashboard;
