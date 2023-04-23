import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = () => {
  const {itemsUpdate } = useContext(DashboardContext);
  const obj={
    "data": {
      "Empleado":{},
      "Nomina": {},
      "EmpleadoNomina":[],
      "Conceptos":[],
      "isLoading":false,
    }}
  const objetNomina = itemsUpdate || [obj];
  //console.log('NominaEmpleado-FormAdd-objetNomina',objetNomina)
  return (
    <React.Fragment>
       <Fields
        Empleado={objetNomina?.data?.Empleado}
        EmpleadoNomina={objetNomina?.data?.EmpleadoNomina}
        Nomina={objetNomina?.data?.Nomina}
        Conceptos={objetNomina?.data?.Conceptos}
      />
    </React.Fragment>
  );
}
export default FormAdd;
