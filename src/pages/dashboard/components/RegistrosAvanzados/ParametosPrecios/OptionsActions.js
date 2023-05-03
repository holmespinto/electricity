/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';

const OptionsActions = (props) => {

 const {itemsUpdate,itemUrl} = useContext(DashboardContext);

  return (
  <React.Fragment>
<Fields
        accion={itemUrl}
        tipo={'ParametrosPrecios'}
        opcion={'add'}
        textBtn={'Registrar'}
        titulo={'Formulario para el Registro de Configuraciones'}
        ItemsUpdate={[itemsUpdate]} />
  </React.Fragment>
    );
}
export default OptionsActions;

