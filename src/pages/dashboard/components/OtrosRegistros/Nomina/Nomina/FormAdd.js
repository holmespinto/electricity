import React, { useState, useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {

  const { add,itemsQuery } = useContext(DashboardContext);
  const [items, setItems] = useState({});

  //console.log('Nomina/FormAdd/estadosNomina',itemsQuery)
  return (
    <React.Fragment>
      <Fields
        setItems={setItems}
        items={items}
        accion={add}
        title={props.title}
        validated={props.validated}
        estadosNomina={itemsQuery}
      />
    </React.Fragment>
  );
}
export default FormAdd;
