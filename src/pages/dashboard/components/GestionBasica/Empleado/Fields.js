import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../../components/FormInput';
const Fields = (props) => {

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
              onChange={(e) => props.setItems([{ ...props.items[0], Identificacion: e.target.value }])}
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
              onChange={(e) => props.setItems([{ ...props.items[0], Email: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el email.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Nombres">
            <FormInput
              label="Nombres"
              type="text"
              name="Nombres"
              rows="5"
              containerClass={'mb-3'}
              key="Nombres"
              placeholder="Digite el Nombre"
              value={props.items[0]?.Nombres}
              onChange={(e) => props.setItems([{ ...props.items[0], Nombres: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite el Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Cargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              required
              type="text"
              name="Cargo"
              placeholder="Digite el Cargo"
              value={props.items[0]?.Cargo}
              onChange={(e) => props.setItems([{ ...props.items[0], Cargo: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Cargo.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Apellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              required
              type="text"
              name="Apellidos"
              placeholder="Digite el Apellidos"
              value={props.items[0]?.Apellidos}
              onChange={(e) => props.setItems([{ ...props.items[0], Apellidos: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Primer Apellido.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Salario">
            <Form.Label>Salario</Form.Label>
            <Form.Control
              required
              type="number"
              name="Salario"
              placeholder="Digite el Salario"
              value={props.items[0]?.Salario}
              onChange={(e) => props.setItems([{ ...props.items[0], Salario: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Salario.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Telefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              required
              type="number"
              name="Telefono"
              placeholder="Digite el Telefono"
              value={props.items[0]?.Telefono}
              onChange={(e) => props.setItems([{ ...props.items[0], Telefono: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Telefono.
            </Form.Control.Feedback>
          </Form.Group></Col>
          <Col sm={6}>
          </Col>
        </Row>

      <div className="button-list">
        <Button type="button" disabled={props.items[0]?.message?.length<0 ? 'true' : ''} onClick={(e) => {props.accion(e,props.items)}}>
          +
        </Button>
      </div>
    </Form>
    </React.Fragment>
    );
}
export default Fields;
