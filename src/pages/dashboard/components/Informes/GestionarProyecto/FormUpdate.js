import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal,itemsUpdate, } = useContext(DashboardContext);


  return (
  <React.Fragment>
      <Fields
         items={itemsUpdate[0]}
         title={'Actualizar una ControDiarios'}
         textBtn={'Registrar ControDiarios'}
         accion={itemUrl}
         tipo={itemsmenuprincipal}
         opcion={'update'}
         validated={props.validated}
      />
  </React.Fragment>
    );
}
export default FormUpdate;
