import React, { useState, useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormClienteAdd = (props) => {
  const { add } = useContext(DashboardContext);
  const [items, setItems] = useState({});
  return (
    <React.Fragment>
      <Fields
        setItems={setItems}
        items={items}
        accion={add}
        title={props.title}
        validated={props.validated}
      />
    </React.Fragment>
  );
}
export default FormClienteAdd;
