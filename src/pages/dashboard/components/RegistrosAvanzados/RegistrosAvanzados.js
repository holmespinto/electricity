// @flow
//import React, { useContext } from 'react';
import Categorias from './Categorias/Categorias';
import SubCapitulos from './SubCapitulos/SubCapitulos';
import AnalisisPreciosUnitarios from './AnalisisPreciosUnitarios/AnalisisPreciosUnitarios';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';


const RegistrosAvanzados = (props) => {
 // const { itemsSubCategorias} = useContext(DashboardContext);


  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'Categorias':
            return (<>
            <Categorias
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
            />
            </>);
            case 'SubCategorias':
            return (<><SubCapitulos
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
            /></>);
            case 'AdminAPU':
            return (<>
            <AnalisisPreciosUnitarios
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
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

export default RegistrosAvanzados;
