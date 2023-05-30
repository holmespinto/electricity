import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';

const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal,itemsUpdate } = useContext(DashboardContext);
  return (
  <>
    <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'update'}
        textBtn={'Actualizar Producto'}
        ItemsUpdate={[itemsUpdate]}
      />
  </>
  );
}
export default FormUpdate;
