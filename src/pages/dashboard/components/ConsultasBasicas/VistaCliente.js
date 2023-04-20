import React from 'react';
import {Form, Row, Col } from 'react-bootstrap';

const VistaCliente = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Identificacion">
        <p className="mb-1 mt-3 fw-bold text-muted">Identificacion</p>
            {props.items.Identificacion}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Email">
        <p className="mb-1 mt-3 fw-bold text-muted">Email</p>
            {props.items.Email}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Email">
        <p className="mb-1 mt-3 fw-bold text-muted">Nombre</p>
            {props.items.Nombre}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Direccion">
        <p className="mb-1 mt-3 fw-bold text-muted">Direccion</p>
            {props.items.Direccion}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Telefono">
        <p className="mb-1 mt-3 fw-bold text-muted">Telefono</p>
            {props.items.Telefono}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Salario">
        <p className="mb-1 mt-3 fw-bold text-muted">Salario</p>
            {props.items.Salario}
          </Form.Group>
        </Col>
        </Col>
        </Row>

    </React.Fragment>
    );
}
export default VistaCliente;
