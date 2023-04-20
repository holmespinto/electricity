import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const VistaOrdenCompra = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Empresa">
        <p className="mb-1 mt-3 fw-bold text-muted">Empresa</p>
            {props.items.Empresa}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Fecha">
        <p className="mb-1 mt-3 fw-bold text-muted">Fecha</p>
            {props.items.Fecha}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Codigo">
        <p className="mb-1 mt-3 fw-bold text-muted">Código</p>
            {props.items.Codigo}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Descripcion">
        <p className="mb-1 mt-3 fw-bold text-muted">Descripción</p>
            {props.items.Descripcion}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Cantidad">
        <p className="mb-1 mt-3 fw-bold text-muted">Cantidad</p>
            {props.items.Cantidad}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="ValorUnitario">
        <p className="mb-1 mt-3 fw-bold text-muted">Valor Unitario</p>
            {props.items.ValorUnitario}
          </Form.Group>
        </Col>
        </Row>
    </React.Fragment>
    );
}
export default VistaOrdenCompra;
