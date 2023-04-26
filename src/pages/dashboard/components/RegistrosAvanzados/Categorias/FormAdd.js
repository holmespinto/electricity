import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormAdd = (props) => {
  const { itemUrl, itemsmenuprincipal,itemsAdd } = useContext(DashboardContext);
  return (
  <React.Fragment>
      {
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={'Registrar Categorias'}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Categorias'}
        ItemsUpdate={[]}
        Padres={itemsAdd}
      />
    }
  </React.Fragment>
    );
}
export default FormAdd;
