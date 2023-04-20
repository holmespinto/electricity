import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../../components/FormInput';
const Fields = (props) => {
  return (

    <React.Fragment>
      <div className="text-center mt-2 mb-4 btn-success">
        <br />
        <span className="text-white">{props?.title}</span>
        <br />
      </div>
      <Form validated={props?.validated}>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Codigo">
              <FormInput
                label="Código"
                type="text"
                name="Codigo"
                rows="5"
                containerClass={'mb-3'}
                key="Codigo"
                disabled
                value={props.items[0]?.Codigo}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, digite el Código.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Empresa">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                required
                type="text"
                name="Empresa"
                placeholder="Digite la Empresa"
                value={props.items[0]?.Empresa}
                onChange={(e) => props.setItems([{ ...props.items[0], Empresa: e.target.value }])}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, digite la Empresa.
              </Form.Control.Feedback>
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Fecha">
              <FormInput
                label="Fecha"
                type="date"
                name="Fecha"
                containerClass={'mb-3'}
                key="Fecha"
                value={props.items[0]?.Fecha}
                onChange={(e) => props.setItems([{ ...props.items[0], Fecha: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Fecha.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Descripcion">
              <FormInput
                label="Descripción"
                type="textarea"
                name="Descripcion"
                containerClass={'mb-3'}
                key="Descripcion"
                value={props.items[0]?.Descripcion}
                onChange={(e) => props.setItems([{ ...props.items[0], Descripcion: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Descripcion.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                required
                type="number"
                name="Cantidad"
                placeholder="Digite la Cantidad"
                value={props.items[0]?.Cantidad}
                onChange={(e) => props.setItems([{ ...props.items[0], Cantidad: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Telefono.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="ValorUnitario">
              <Form.Label>Valor Unitario</Form.Label>
              <Form.Control
                required
                type="number"
                name="ValorUnitario"
                placeholder="Digite el Valor Unitario"
                value={props.items[0]?.ValorUnitario}
                onChange={(e) => props.setItems([{ ...props.items[0], ValorUnitario: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Valor Unitario.
              </Form.Control.Feedback>
            </Form.Group>

          </Col>
        </Row>
        <div className="button-list">
          <Button type="button" disabled={props.items[0]?.message?.length < 0 ? 'true' : ''} onClick={(e) => { props.accion(e, props.items) }}>
            +
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}
export default Fields;
