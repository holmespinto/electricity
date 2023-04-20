import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const {setEmpleadoNomina,update,empleadoNomina} = useContext(DashboardContext);
  return (
  <React.Fragment>
    <Fields
    setEmpleadoNomina={setEmpleadoNomina}
    empleadoNomina={empleadoNomina}
    accion={update}
    title={props.title}
    validated={props.validated}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
