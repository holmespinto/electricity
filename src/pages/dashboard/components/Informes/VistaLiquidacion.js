import React from 'react';
//import classNames from 'classnames';
import { Form, Row, Col } from 'react-bootstrap';


const VistaLiquidacion = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3">
          <p className="mb-1 mt-3 fw-bold text-muted">Nombre</p>
            {props.items.Nombre}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Tipo">
        <p className="mb-1 mt-3 fw-bold text-muted">Tipo</p>
            {props.items.Tipo}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Direccion">
        <p className="mb-1 mt-3 fw-bold text-muted">Direccion</p>
            {props.items.Tipo}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Cliente">
        <p className="mb-1 mt-3 fw-bold text-muted">Cliente</p>
            {props.items.Cliente}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="CantInicial">
        <p className="mb-1 mt-3 fw-bold text-muted">Cantidad Inicial</p>
            {props.items.CantInicial}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="CantFinal">
        <p className="mb-1 mt-3 fw-bold text-muted">Cantidad Final</p>
            {props.items.CantFinal}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Categoria">
        <p className="mb-1 mt-3 fw-bold text-muted">Categoria</p>
            {props.items.Categoria}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Estado">
        <p className="mb-1 mt-3 fw-bold text-muted">Estado</p>
            {props.items.Estado}
          </Form.Group>
        </Col>
      </Row>
      <div className="text-center mt-2 mb-4 btn-success">
      <span className="text-white">DATOS DE LA LIQUIDACION DEL PROYECTO</span>
    </div>

      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="CantInicial">
        <p className="mb-1 mt-3 fw-bold text-muted">Cantidad Inicial</p>
            {props.items.CantInicial}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="CantFinal">
        <p className="mb-1 mt-3 fw-bold text-muted">Cantidad Final</p>
            {props.items.CantFinal}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Valor">
        <p className="mb-1 mt-3 fw-bold text-muted">Cantidad</p>
            {props.items.Estado}
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Estado">
        <p className="mb-1 mt-3 fw-bold text-muted">Estado</p>
            {props.items.Estado}
          </Form.Group>
        </Col>
      </Row>
    </React.Fragment>
    );
}
export default VistaLiquidacion;
