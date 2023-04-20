import React from 'react';
import classNames from 'classnames';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const FormControlDiario = (props) => {
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
          <Form.Group className="mb-3" controlId="Ciudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              required
              type="text"
              name="Ciudad"
              placeholder="Digite la Ciudad"
              value={props.items.Ciudad}
              onChange={(e) => props.setItems({ ...props.items, Ciudad: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Ciudad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Concepto">
          <FormInput
              label="Por Concepto de:"
              type="textarea"
              name="Concepto"
              rows="5"
              containerClass={'mb-3'}
              key="Concepto"
              placeholder="Digite el Concepto"
              value={props.items.Concepto}
              onChange={(e) => props.setItems({ ...props.items, Concepto: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Concepto.
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
                onChange={(e) => props.setItems({ ...props.items, Fecha: e.target.value })}
              />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Fecha.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="ValorLetras">
          <FormInput
              label="Valor en Letras:"
              type="textarea"
              name="ValorLetras"
              rows="5"
              containerClass={'mb-3'}
              key="ValorLetras"
              placeholder="Digite el Valor en Letras"
              value={props.items.ValorLetras}
              onChange={(e) => props.setItems({ ...props.items, ValorLetras: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Valor Letras.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="PagoA">
            <Form.Label>Pago a:</Form.Label>
            <Form.Control
              required
              type="text"
              name="PagoA"
              placeholder="Digite el  pago a"
              value={props.items.PagoA}
              onChange={(e) => props.setItems({ ...props.items, PagoA: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Pago a.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Valor">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              required
              type="number"
              name="Valor"
              placeholder="Digite el Valor"
              value={props.items.Valor}
              onChange={(e) => props.setItems({ ...props.items, Valor: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Valor.
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
export default FormControlDiario;
