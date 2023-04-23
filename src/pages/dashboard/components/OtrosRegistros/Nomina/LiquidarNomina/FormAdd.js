import React, { useState, useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {
  const {addNomina} = useContext(DashboardContext);
  const [items, setItems] = useState({});
  return (
    <React.Fragment>
      <Fields
        setItems={setItems}
        items={items}
        accion={addNomina}
        title={props.title}
        validated={props.validated}
        Empleado={props?.Empleado}
        Nomina={props?.Nomina}
        Conceptos={props?.Conceptos}
      />
    </React.Fragment>
  );
}
export default FormAdd;
