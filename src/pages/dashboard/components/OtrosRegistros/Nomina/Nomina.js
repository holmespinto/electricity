// @flow
import React, {useContext,useEffect } from 'react';

import MenuNomina from './MenuNomina/MenuNomina';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';


const Nomina = (props) => {
  const { query } = useContext(DashboardContext);

  useEffect(() => {
    query('OtrosRegistros','GenerarNomina',[{opcion:'consultar',obj:'GenerarNomina'}]);
  }, [query]);

  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'GenerarNomina':
            return (<>
            <MenuNomina
              accion={'OtrosRegistros'}
              tipo={props.tipo}
            />
            </>);
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default Nomina;
