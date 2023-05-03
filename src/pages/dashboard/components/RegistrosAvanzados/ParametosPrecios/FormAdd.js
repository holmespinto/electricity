import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormAdd = (props) => {
  const { itemUrl} = useContext(DashboardContext);
  return (
    <React.Fragment>
  <Fields
          accion={itemUrl}
          tipo={'ParametrosPrecios'}
          opcion={'add'}
          textBtn={'Registrar'}
          titulo={'Formulario para la actualización de Configuraciones'}
          ItemsUpdate={[]} />
    </React.Fragment>
      );
}
export default FormAdd;
