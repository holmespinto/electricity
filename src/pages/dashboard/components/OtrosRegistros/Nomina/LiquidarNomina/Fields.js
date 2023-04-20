import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
//import FormInput from '../../../../components/FormInput';
function multiplicar(a,b){
  return a*b
}
function ParseFloat(str,val) {
  str = str.toString();
  str = str.slice(0, (str.indexOf(".")) + val + 1);
  return Number(str);
}
const Fields = (props) => {
  const [nomina, setNomina] = useState([]);
  const [inputValue, setInputValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState(0);
  const [subTotalValue, setSubTotalValue] = useState(0);
  const [Total, setTotalValue] = useState(0);

  const handleInputChange = (event) => {
        const rawValue = event.target.value;
        const formatted = parseFloat(rawValue.replace(",", ".")).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        setInputValue(rawValue);

        setNomina([{ ...nomina[0], Valor: rawValue,IdEmpleado:props?.Empleado?.id,IdNomina:props?.Nomina?.id}])

        setFormattedValue(formatted);

        const subtotal = multiplicar(rawValue, Number(nomina[0]?.Cantidad))
        const subtotalc = ParseFloat(subtotal,9);

        setSubTotalValue(subtotalc);
        //TOTAL DEL SALARIO
        const salario =ParseFloat(props?.Empleado?.Salario,6);
        const t=salario + subtotal
        const total =ParseFloat(t,9);
        setTotalValue(total);
  };

  //console.log('liquidarNomina-Fields',props?.Empleado,props?.Nomina)
  console.log('nomina', props)
  return (

    <React.Fragment>
      <div className="text-left mt-2 mb-4 btn-success text-white mx-auto">
        <div class="row">
          <div class="col-md-4 text-muted font-13">Nombres y Apellidos:</div>
          <div class="col-md-4 ml-auto">{props?.Empleado?.Nombres} {props?.Empleado?.Apellidos}</div>
        </div>
        <div class="row">
          <div class="col-md-4 text-muted font-13">Identificacion:</div>
          <div class="col-md-4 ml-auto">{props?.Empleado?.Identificacion}</div>
        </div>
        <div class="row">
          <div class="col-md-4 text-muted font-13">Cargo:</div>
          <div class="col-md-4 ml-auto">{props?.Empleado?.Cargo}</div>
        </div>
      </div>
      <Form validated={props?.validated}>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="Concepto">
              <Form.Label>Concepto</Form.Label>
              <Select
                type="select"
                name="Concepto"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setNomina([{ ...nomina[0], Concepto: e.value,IdEmpleado:props?.Empleado?.id,IdNomina:props?.Nomina?.id}])}
                options={props?.Conceptos}
                placeholder="Selecione el Estado..."
                selected={nomina?.Concepto}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Ciudad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3" controlId="Cantidad">
              <Form.Label>Cantidad </Form.Label>
              <Form.Control
                required
                type="number"
                name="Cantidad"
                placeholder="Digite la Cantidad"
                value={nomina[0]?.Cantidad}
                onChange={(e) => setNomina([{ ...nomina[0], Cantidad: e.target.value,IdEmpleado:props?.Empleado?.id,IdNomina:props?.Nomina?.id}])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Cantidad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="Valor">
            <Form.Label>Monto: </Form.Label>
              <Form.Control
                required
                type="number"
                name="Valor"
                placeholder="Digite el Monto"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Monto.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={2}>
            <div className="button-list pt-3 mb-0">
              <Button type="button" onClick={(e) => { props.accion(e, nomina) }}>+</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          <div className="float-left mt-3 mt-sm-0">
                                        <p>
                                            <b>Sub-total:</b> <span className="float-left">{formattedValue} * {nomina[0]?.Cantidad} = {subTotalValue}</span>
                                        </p>
                                        <p>
                                            <b>Salario:</b> <span className="mb-0 font-13"> {props?.Empleado?.Salario}</span>
                                        </p>
                                        <h3><i className="mdi mdi-deskphone"></i>TOTAL: {Total}</h3>
                                    </div>

             </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}
export default Fields;
