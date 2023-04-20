import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const {setItems,items,update,itemsQuery} = useContext(DashboardContext);

  return (
  <React.Fragment>
    <Fields
    setItems={setItems}
    items={items}
    accion={update}
    title={props.title}
    validated={props.validated}
    estadosNomina={itemsQuery}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
