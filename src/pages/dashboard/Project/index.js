import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import GestionBasica from '../../../pages/dashboard/components/GestionBasica/GestionBasica';
import OtrosRegistros from '../../../pages/dashboard/components/OtrosRegistros/OtrosRegistros';
//import Informes from '../../../pages/dashboard/components/Informes/Informes';
//import ConsultasBasicas from '../../../pages/dashboard/components/ConsultasBasicas/ConsultasBasicas';
import { DashboardContext } from '../../../layouts/context/DashboardContext';

 const ProjectDashboard = () => {
  const { itemsmenuprincipal} = useContext(DashboardContext)
  return (

    <React.Fragment>
      <Title />
      {(() => {
        switch (itemsmenuprincipal) {
          case 'Material': case 'ManoObra': case 'Herramientas': case 'Cliente': case 'Proyecto': case 'Empleado':
            return (<><GestionBasica
              accion={'GestionBasica'}
              tipo={itemsmenuprincipal}
            /></>);
          case 'ControlDiario':case 'OrdenCompra':case 'GenerarNomina':
            return (<><OtrosRegistros
              accion={'OtrosRegistros'}
              tipo={itemsmenuprincipal}
            /></>);
           case 'ConsultaProyecto':case 'Liquidacion':case 'ConsultaNomina':
            return (<>{''}</>);
           case 'ConsultaMaterial':case 'ConsultaHerramientas':case 'ConsultaManoObra':case 'ConsultaCliente':case 'ConsultaApu':case 'OtrasControlDiario':case 'OtrasOrdenCompra':
            return (<>{''}</>);
          case 'RegistrarAPU':
            return (<>{'RegistrarAPU'}</>);
          case 'AdminUsuarios':
            return (<>{'AdminUsuarios'}</>);
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
