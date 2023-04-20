import React from 'react';

import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../../components/FormInput';

const ClienteFields = (props) => {

  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
    <Form validated={props.validated}>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Identificacion">
            <Form.Label>Identificación</Form.Label>
            <Form.Control
              required
              type="number"
              name="Identificacion"
              placeholder="Digite la Identificacion"
              value={props.items[0]?.Identificacion}
              onChange={(e) =>props.setItems([{...props.items[0], Identificacion: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite la Identificacion.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              containerClass={'mb-3'}
              name="Email"
              placeholder="Digite el email"
              value={props.items[0]?.Email}
              onChange={(e) => props.setItems([{...props.items[0], Email: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el email.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Nombre">
            <FormInput
              label="Nombre"
              type="text"
              name="Nombre"
              rows="5"
              containerClass={'mb-3'}
              key="Nombre"
              placeholder="Digite el Nombre"
              value={props.items[0]?.Nombre}
              onChange={(e) =>props.setItems([{...props.items[0], Nombre: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite el Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              required
              type="text"
              name="Direccion"
              placeholder="Digite la Direccion"
              value={props.items[0]?.Direccion}
              onChange={(e) => props.setItems([{...props.items[0], Direccion: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Direccion.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              required
              type="number"
              name="Telefono"
              placeholder="Digite el Telefono"
              value={props.items[0]?.Telefono}
              onChange={(e) => props.setItems([{...props.items[0], Telefono: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Telefono.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}></Col>
        </Row>
      <div className="button-list">
        <Button type="button" disabled={props.items.message ? 'true' : ''} onClick={props?.accion}>
          +
        </Button>
      </div>
    </Form>
    </React.Fragment>
    );
}
export default ClienteFields;
