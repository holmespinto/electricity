import React,{useContext} from 'react';

import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
const FormClienteUpdate = (props) => {
  const {setItems,items} = useContext(DashboardContext);

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
              value={items[0]?.items?.Identificacion}
              onChange={(e) =>setItems([{...items[0], Identificacion: e.target.value }])}
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
              value={items[0]?.Email}
              onChange={(e) => setItems([{...items[0], Email: e.target.value }])}
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
              value={items[0]?.Nombre}
              onChange={(e) =>setItems([{...items[0], Nombre: e.target.value }])}
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
              value={items[0]?.Direccion}
              onChange={(e) => setItems([{...items[0], Direccion: e.target.value }])}
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
              value={items[0]?.Telefono}
              onChange={(e) => setItems([{...items[0], Telefono: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Telefono.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}></Col>
        </Row>
      <div className="button-list">
        <Button type="button" disabled={items.message ? 'true' : ''} onClick={props?.accion}>
          +
        </Button>
      </div>
    </Form>
    </React.Fragment>
    );
}
export default FormClienteUpdate;
