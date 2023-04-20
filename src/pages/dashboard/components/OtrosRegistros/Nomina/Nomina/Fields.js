import React from 'react';
import { Button, Form, Row, Col, Collapse, Card } from 'react-bootstrap';
import Select from 'react-select';
import FormInput from '../../../../components/FormInput';
const Fields = (props) => {
  const estados = props.estadosNomina || [];
  /*
  const secondaryUser = estados.filter(item => item.value === props.items[0]?.Estado)
  console.log(secondaryUser[0]?.Descripcion)
*/
  return (
    <React.Fragment>
      <div className="text-center mt-2 mb-4 btn-success">
        <br />
        <span className="text-white">{props?.title}</span>
        <br />
      </div>

      <Form validated={props?.validated}>
        <Row>
          <Col sm={3}>
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
            <Form.Group className="mb-3" controlId="Comprobante">
              <Form.Label>Comprobante No.</Form.Label>
              <Form.Control
                required
                type="text"
                name="Comprobante"
                placeholder="No."
                value={props.items[0]?.id}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Comprobante.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3" controlId="Total">
              <Form.Label>Total</Form.Label>
              <Form.Control
                required
                type="text"
                name="Total"
                value={props.items[0]?.Total}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Valor Unitario.
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
                value={props.items[0]?.FechaInicial}
                onChange={(e) => props.setItems([{ ...props.items[0], FechaInicial: e.target.value }])}
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
                value={props.items[0]?.FechaFinal}
                onChange={(e) => props.setItems([{ ...props.items[0], FechaFinal: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Fecha Final.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Estado">
              <Form.Label>Estado</Form.Label>
              <Select
                type="select"
                name="Estado"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => props.setItems([{ ...props.items[0], Estado: e.value }])}
                options={estados}
                placeholder="Selecione el Estado..."
                selected={props.items[0]?.Estado}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Estado.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}></Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Collapse in={true} appear>
              <div>
                <Card.Body><blockquote class="blockquote"><p>{props.items[0]?.Estado}</p></blockquote>:{'secondaryUser[0]?.Descripcion'}
                </Card.Body>
              </div>
            </Collapse>

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
