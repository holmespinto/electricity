import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {
  const { itemsUpdate } = useContext(DashboardContext);
  console.log('props',itemsUpdate);
  return (
    <React.Fragment>
      <Fields
         items={itemsUpdate[0]}
         title={'Registrar una ControDiarios'}
         textBtn={'Registrar ControDiarios'}
         accion={props.accion}
         tipo={props.tipo}
         opcion={'add'}
         validated={props.validated}

       />
    </React.Fragment>
  );
}
export default FormAdd;
