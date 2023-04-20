import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';


const VistaNomina = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
      <Row>
        <Col sm={12}>
        <Form.Group className="mb-3" controlId="Nombre">
        <p className="mb-1 mt-3 fw-bold text-muted">Nombre</p>
            {props.items.Nombre}
          </Form.Group>
        </Col>
      </Row>
      <Row>
          <Col sm={6}>
          <Form.Group className="mb-3" controlId="FechaInicial">
        <p className="mb-1 mt-3 fw-bold text-muted">Fecha Inicial</p>
            {props.items.FechaInicial}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="FechaFinal">
        <p className="mb-1 mt-3 fw-bold text-muted">Fecha Final</p>
            {props.items.FechaFinal}
          </Form.Group>
        </Col>
      </Row>

      <Row>
          <Col sm={6}>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="FechaFinal">
        <p className="mb-1 mt-3 fw-bold text-muted">Estado</p>
            {props.items.Estado}
          </Form.Group>
        </Col>
      </Row>
    </React.Fragment>
    );
}
export default VistaNomina;
