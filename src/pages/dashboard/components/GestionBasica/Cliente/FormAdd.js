import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormAdd = (props) => {
  const { itemUrl, itemsmenuprincipal, } = useContext(DashboardContext);
  return (
  <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={'Registrar cliente'}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Cliente'}
        ItemsUpdate={[]}
      />
  </React.Fragment>
    );
}
export default FormAdd;
