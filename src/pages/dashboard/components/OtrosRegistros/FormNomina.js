import React from 'react';
import classNames from 'classnames';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const FormNomina = (props) => {
  return (
  <React.Fragment>
    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">{props.title}</span>
      <br />
    </div>
    <Form validated={props.validated}>
      <Row>
        <Col sm={12}>
          <Form.Group className="mb-3" controlId="Nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="Nombre"
              placeholder="Digite el Nombre"
              value={props.items.Nombre}
              onChange={(e) => props.setItems({ ...props.items, Nombre: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
          <Col sm={6}>
          <Form.Group className="mb-3" controlId="FechaInicial">
              <FormInput
                label="Fecha Inicial"
                type="date"
                name="FechaInicial"
                containerClass={'mb-3'}
                key="FechaInicial"
                onChange={(e) => props.setItems({ ...props.items, FechaInicial: e.target.value })}
              />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Fecha Inicial.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="FechaFinal">
              <FormInput
                label="Fecha Final"
                type="date"
                name="FechaFinal"
                containerClass={'mb-3'}
                key="FechaFinal"
                 onChange={(e) => props.setItems({ ...props.items, FechaFinal: e.target.value })}
              />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Fecha Final.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
          <Col sm={6}>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Estado">
        <FormInput
                name="Estado"
                label="Estado"
                type="select"
                containerClass="mb-3"
                className="form-select"
                onChange={(e) => props.setItems({ ...props.items, Estado: e.target.value })}
                key="Estado">
                <option>En Liquidacion</option>
                <option>Liquidada</option>
                <option>Aprobada</option>
              </FormInput>
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Estado.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
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
export default FormNomina;
