import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';


const ProjectDashboard = () => {
  const { itemsmenuprincipal} = useContext(DashboardContext)

  // eslint-disable-next-line no-undef
  // console.log(itemsmenuprincipal)
  return (

    <React.Fragment>
      <Title />
      {(() => {
        switch (itemsmenuprincipal) {
          case 'Material':
            return (
              <>{'Material'}</>
            );
          case 'ManoObra':
            return (<>{'ManoObra'}</>);
          case 'Herramientas':
            return (<>{'Herramientas'}</>);
          case 'Cliente':
            return (<>{'Cliente'}</>);
          case 'Proyecto':
            return (<>{'Proyecto'}</>);
          case 'RegistrarEmpleado':
            return (<>{'RegistrarEmpleado'}</>);
          case 'ControlDiario':
            return (<>{'ControlDiario'}</>);
          case 'OrdenCompra':
            return (<>{'OrdenCompra'}</>);
          case 'GenerarNomina':
            return (<>{'GenerarNomina'}</>);
          case 'Usuarios':
            return (<>{'Usuarios'}</>);
          case 'Roles':
            return (<>{'Roles'}</>);
          case 'RegistrarAPU':
            return (<>{'RegistrarAPU'}</>);
          case 'CotizarProyecto':
            return (<>{'CotizarProyecto'}</>);
          case 'LiquidarProyecto':
            return (<>{'LiquidarProyecto'}</>);
          case 'EstadoProyecto':
            return (<>{'EstadoProyecto'}</>);
          case 'ConsultaProyecto':
            return (<>{'ConsultaProyecto'}</>);
          case 'Liquidacion':
            return (<>{'Liquidacion'}</>);
          case 'ConsultaNomina':
            return (<>{'ConsultaNomina'}</>);
          case 'ConsultaMaterial':
            return (<>{'ConsultaMaterial'}</>);
          case 'ConsultaHerramientas':
            return (<>{'ConsultaHerramientas'}</>);
          case 'ConsultaManoObra':
            return (<>{'ConsultaManoObra'}</>);
          case 'Cleinte':
            return (<>{'Cleinte'}</>);
          case 'APU':
            return (<>{'APU'}</>);
          case 'OtrasControlDiario':
            return (<>{'OtrasControlDiario'}</>);
          case 'OtrasOrdenCompra':
            return (<>{'OtrasOrdenCompra'}</>);
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
