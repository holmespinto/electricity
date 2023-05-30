/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, {useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import {usePermisos} from '../../../hooks/usePermisos';
// COMPONETS

import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import GestionBasica from '../../../pages/dashboard/components/GestionBasica/GestionBasica';
import OtrosRegistros from '../../../pages/dashboard/components/OtrosRegistros/OtrosRegistros';
import TarjetasReferencias from '../../../pages/dashboard/components/TarjetasReferencias/TarjetasReferencias';
import Informes from '../../../pages/dashboard/components/Informes/Informes';
import OtrasConsultas from '../../../pages/dashboard/components/OtrasConsultas/OtrasConsultas';
import RegistrosAvanzados from '../../../pages/dashboard/components/RegistrosAvanzados/RegistrosAvanzados';

const ProjectDashboard = () => {
  const { itemsmenuprincipal, AdvertenciaLocalStorage } = useContext(DashboardContext)
  AdvertenciaLocalStorage();
    const { permisos,initPermiso } = usePermisos(itemsmenuprincipal);

  return (
    <React.Fragment>
      <Title />

      {(() => {
        switch (itemsmenuprincipal) {
          case 'Productos': case 'Cliente': case 'Proyecto': case 'Empleado':
            return <>
             { initPermiso === 1 ?
            <GestionBasica
              accion={'GestionBasica'}
              tipo={itemsmenuprincipal}
              permisos={permisos}
            />:<PermisoAlert/>}
            </>
            break;
          case 'ControlDiario':
          case 'OrdenCompra':
          case 'GenerarNomina':
          case 'Usuarios':
          case 'Roles':
          case 'ConfigNomina':
          case 'Nomina':
            return <>
            <OtrosRegistros
              accion={'OtrosRegistros'}
              tipo={itemsmenuprincipal}
              permisos={permisos}
            />
            </>
            break;
          case 'ControlDiario': case 'OrdenCompra': case 'OrdenCompra':
            return <>
           { initPermiso === 1 ?
            <OtrasConsultas
              accion={'OtrosRegistros'}
              tipo={itemsmenuprincipal}
              permisos={permisos}
            />:<PermisoAlert/>}
            </>
            break;
          case 'APU':
          case 'Categorias':
          case 'EditorPUA':
          case 'ParametosPrecios':
            return <>
            { initPermiso === 1 ?
            (<RegistrosAvanzados
              accion={'RegistrosAvanzados'}
              tipo={itemsmenuprincipal}
              permisos={permisos}
            />):<PermisoAlert/>}
            </>
            break;
          case 'asignarApu':
            return <>
            <TarjetasReferencias
              accion={'GestionBasica'}
              tipo={itemsmenuprincipal}
              permisos={permisos}
            />
            </>
            break;
          case 'GestionarProyecto':
          case 'EditarProyecto':
            return <>
            { initPermiso === 1 ?
            <Informes
              accion={'Informes'}
              tipo={itemsmenuprincipal}
              permisos={permisos}
            />:<PermisoAlert/>}
            </>
            break;
          default:
            return (
              <>{''}</>
            );
        }
      })()
      }
    </React.Fragment>
  );
};
ProjectDashboard.defaultProps = {
  itemsmenu: '/',
};
export default ProjectDashboard;
