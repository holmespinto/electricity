import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal,ItemsUpdate, } = useContext(DashboardContext);
 //console.log('FormUpdate',ItemsUpdate?.items?.Idpermiso)
  return (
  <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'update'}
        textBtn={'Actualizar registros de Usuario'}
        ItemsUpdate={[ItemsUpdate]}
        Idpermiso={ItemsUpdate?.items?.Idpermiso}
      />
  </React.Fragment>
    );
}
export default FormUpdate;
