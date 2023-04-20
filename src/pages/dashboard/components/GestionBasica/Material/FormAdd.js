import React, { useState, useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon indicator */
/*
const IndicatorsContainer = (props) => {
  const { handleClick } = props.selectProps;
  return (
      <div style={{}}>
          <components.IndicatorsContainer {...props}>
              <button className="btn btn-primary" onMouseDown={handleClick}>
                  Search
              </button>
          </components.IndicatorsContainer>
      </div>
  );
};
*/
const FormAdd = (props) => {

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
export default FormAdd;
