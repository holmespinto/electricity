import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const {setItems,items,update} = useContext(DashboardContext);
  return (
  <React.Fragment>
    <Fields
    setItems={setItems}
    items={items}
    accion={update}
    title={props.title}
    validated={props.validated}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
