import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal,itemsUsuarios,ItemsUpdate } = useContext(DashboardContext);
  return (
  <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'update'}
        textBtn={'Actualizar usuario'}
        roles={itemsUsuarios?.data?.roles}
        usuario={[ItemsUpdate]}
      />
  </React.Fragment>
    );
}
export default FormUpdate;
