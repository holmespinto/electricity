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
          <Form.Group className="mb-3" controlId="Nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="Nombre"
              placeholder="Digite el Nombre"
              value={props.items[0]?.Nombre}
              onChange={(e) => props.setItems([{ ...props.items[0], Nombre: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite la Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Unidad">
            <Form.Label>Unidad de Medida</Form.Label>
            <Form.Control
              required
              type="text"
              containerClass={'mb-3'}
              name="Unidad"
              placeholder="Digite la Unidad de Medida"
              value={props.items[0]?.Unidad}
              onChange={(e) => props.setItems([{ ...props.items[0], Unidad: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Unidad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Descripcion">
            <FormInput
              label="Descripción"
              type="textarea"
              name="Descripcion"
              rows="5"
              containerClass={'mb-3'}
              key="Descripcion"
              placeholder="Digite la Descripcion"
              value={props.items[0]?.Descripcion}
              onChange={(e) => props.setItems([{ ...props.items[0], Descripcion: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite la Descripcion.
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
        <Button type="button" disabled={props.items[0]?.message?.length<0 ? 'true' : ''} onClick={(e) => {props.accion(e,props.items)}}>
          +
        </Button>
      </div>
    </Form>
    </React.Fragment>
    );
}
export default Fields;
