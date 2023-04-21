import React, {  useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {

  const { itemUrl, itemsmenuprincipal,itemsUsuarios } = useContext(DashboardContext);

  return (
    <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar usuario'}
        roles={itemsUsuarios.data?.roles}
      />
    </React.Fragment>
  );
}
export default FormAdd;
