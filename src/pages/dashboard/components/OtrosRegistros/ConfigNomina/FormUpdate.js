import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const {itemsUpdate} = useContext(DashboardContext);

const Estados = itemsUpdate?.data?.Estados || [{}];
const Nomina = itemsUpdate?.data?.Nomina || [{}];

  return (
  <React.Fragment>
   <Fields
    Nomina={Nomina}
    title={props.title}
    isLoading={itemsUpdate.isLoading}
    Estados={Estados}
    textBtn={'Actualizar Nomina'}
    accion={props.accion}
    tipo={props.tipo}
    opcion={'update'}

  />
  </React.Fragment>
    );
}
export default FormUpdate;
