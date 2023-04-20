import React, { useState, useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormAdd = (props) => {
  const { add,itemsQuery } = useContext(DashboardContext);
  const [items, setItems] = useState({});
  return (
    <React.Fragment>
      <Fields
        setItems={setItems}
        items={items}
        accion={add}
        title={props.title}
        validated={props.validated}
        itemsClientes={itemsQuery}
      />
    </React.Fragment>
  );
}
export default FormAdd;
