import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {

  const {itemsQueryNominaEmpleado } = useContext(DashboardContext);
  const objetNomina = !itemsQueryNominaEmpleado?.data?.Empleado?.Identificacion ?
    {
      "data": {
        "Empleado": {
          "id": "1",
          "Identificacion": "",
          "Nombres": "No existen registro para esta nomina",
          "Apellidos": "",
          "Email": "",
          "Cargo": "",
          "Salario": ""
        },
        "Nomina": {
          "id": "1",
          "Codigo": "",
          "Empresa": "No existen registro para esta nomina",
          "FechaInicial": "",
          "FechaFinal": "",
          "Comprobante": "",
          "Total": "0",
          "Estado": ""
        },
        "EmpleadoNomina": {
          "id": "1",
          "Nomina": "1",
          "Empleado": "",
          "Concepto": "No existen registro para esta nomina",
          "Cantidad": "",
          "Devengado": "",
          "Deducido": "",
          "Dias": 0,
          "IdNomina": ""
        },
        "Conceptos": {
          "id": "1",
          "Concepto": "No existen registro para esta nomina",
          "Porcentaje": "",
          "Tipo": "No existen registro para esta nomina",
          "value": "",
          "label": ""
        }
      }
    } : itemsQueryNominaEmpleado;
  console.log('NominaEmpleado-FormAdd-objetNomina', objetNomina)
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
