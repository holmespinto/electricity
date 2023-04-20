import React from 'react';
import {Form, Row, Col } from 'react-bootstrap';

const VistaMaterial = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Nombre">
        <p className="mb-1 mt-3 fw-bold text-muted">Nombre</p>
            {props.items.Nombre}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Unidad">
        <p className="mb-1 mt-3 fw-bold text-muted">Unidad</p>
            {props.items.Unidad}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Descripcion">
        <p className="mb-1 mt-3 fw-bold text-muted">Descripcion</p>
            {props.items.Descripcion}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="ValorUnitario">
        <p className="mb-1 mt-3 fw-bold text-muted">Valor unitario</p>
            {props.items.ValorUnitario}
          </Form.Group>
        </Col>
      </Row>
    </React.Fragment>
    );
}
export default VistaMaterial;
