import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';


const ProjectDashboard = () => {
  const { itemsmenuprincipal } = useContext(DashboardContext)

  // eslint-disable-next-line no-undef

  return (
    <React.Fragment>
      <Title />
      {(() => {
        switch (itemsmenuprincipal) {
          case 'graduados':
            return (
              <>

              </>
            );
          case 'matriculados':
            return (
              <>

              </>
            );
          case 'inscritos':
            return (<>

            </>);
          case 'admitidos':
            return (<>

            </>);
          case 'herramienta':
            return (<>

            </>);
          case 'configuracion':
            return (<>
              </>);
          case 'por_fecha':
            return (<>
              </>);
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
