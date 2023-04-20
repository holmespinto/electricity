import React from 'react';
import classNames from 'classnames';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const FormEmpleado = (props) => {
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
              type="text"
              name="Identificacion"
              placeholder="Digite la Identificacion"
              value={props.items.Identificacion}
              onChange={(e) => props.setItems({ ...props.items, Identificacion: e.target.value })}
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
              value={props.items.Email}
              onChange={(e) => props.setItems({ ...props.items, Email: e.target.value })}
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
              label="Nombres"
              type="text"
              name="Nombre"
              rows="5"
              containerClass={'mb-3'}
              key="Nombre"
              placeholder="Digite el Nombre"
              value={props.items.Nombre}
              onChange={(e) => props.setItems({ ...props.items, Nombre: e.target.value })}
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
              value={props.items.Cargo}
              onChange={(e) => props.setItems({ ...props.items, Cargo: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Cargo.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="PrimerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              required
              type="text"
              name="PrimerApellido"
              placeholder="Digite el PrimerApellido"
              value={props.items.PrimerApellido}
              onChange={(e) => props.setItems({ ...props.items, PrimerApellido: e.target.value })}
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
              value={props.items.Salario}
              onChange={(e) => props.setItems({ ...props.items, Salario: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Salario.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="SegundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              required
              type="text"
              name="SegundoApellido"
              placeholder="Digite el Segundo Apellido"
              value={props.items.SegundoApellido}
              onChange={(e) => props.setItems({ ...props.items, SegundoApellido: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Segundo Apellido.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col sm={6}>
          <Form.Group className="mb-3" controlId="AuxTrans">
            <Form.Label>Auxilio de Transporte</Form.Label>
            <Form.Control
              required
              type="number"
              name="AuxTrans"
              placeholder="Digite el Auxilio de Transporte"
              value={props.items.AuxTrans}
              onChange={(e) => props.setItems({ ...props.items, AuxTrans: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Auxilio de Transporte.
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
              type="text"
              name="Telefono"
              placeholder="Digite el Telefono"
              value={props.items.Telefono}
              onChange={(e) => props.setItems({ ...props.items, Telefono: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Telefono.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col sm={6}></Col>
        </Row>
      <div className="button-list">
        <Button type="button" disabled={props.items.message ? 'true' : ''} onClick={props.accion}>
          +
        </Button>
        {props.items.message && (
          <Button type="button" className="btn-icon" onClick={props.Close}>
            <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
          </Button>
        )}
      </div>
    </Form>
    </React.Fragment>
    );
}
export default FormEmpleado;
