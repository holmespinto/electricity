import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const VistaControlDiario = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Ciudad">
        <p className="mb-1 mt-3 fw-bold text-muted">Ciudad</p>
            {props.items.Ciudad}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Concepto">
        <p className="mb-1 mt-3 fw-bold text-muted">Concepto</p>
            {props.items.Concepto}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Fecha">
        <p className="mb-1 mt-3 fw-bold text-muted">Fecha</p>
            {props.items.Fecha}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="ValorLetras">
        <p className="mb-1 mt-3 fw-bold text-muted">Valor Letras</p>
            {props.items.ValorLetras}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="PagoA">
        <p className="mb-1 mt-3 fw-bold text-muted">Pagor a</p>
            {props.items.PagoA}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Valor">
        <p className="mb-1 mt-3 fw-bold text-muted">Valor</p>
            {props.items.Valor}
          </Form.Group>
        </Col>
        </Row>
    </React.Fragment>
    );
}
export default VistaControlDiario;
