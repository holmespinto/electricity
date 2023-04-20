import React from 'react';
import classNames from 'classnames';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import FormInput from '../../../components/FormInput';


const Fields = (props) => {
  const clientes=[]
  const children = props.itemsClientes || [];


  const array= children ? (
           // eslint-disable-next-line array-callback-return
          children.map((child, i) => {
            const obj={
              value: child.id,
              label:child.Nombre
            }
            clientes.push(obj)
           })

  ):[{
    value:'No Existen clientes',
    label:'No Existen clientes'
  }]

console.log(array)
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
          <Form.Group className="mb-3" controlId="Nombre">
          <FormInput
              label="Nombre"
              type="textarea"
              name="Nombre"
              rows="5"
              containerClass={'mb-3'}
              key="Nombre"
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
          <Form.Group className="mb-3" controlId="Tipo">
              <Select
                type="select"
                name="Tipo"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => props.setItems([{ ...props.items[0], Tipo: e.value}])}
                options={[
                  { value: props.items[0]?.Tipo, Tipo: '' + props.items[0]?.Tipo + '' },
                  { value: 'Interno', label: 'Interno' },
                  { value: 'Externo', label: 'Externo' },
                ]}
                placeholder="Selecione el Tipo..."
                selected={props.items[0]?.Tipo}
              />
              <Form.Control.Feedback type="invalid">
              Por favor, digite el Tipo.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Direccion">
          <Form.Label>Direccion</Form.Label>
            <Form.Control
              required
              type="text"
              name="Direccion"
              placeholder="Digite la Direccion"
              value={props.items[0]?.Direccion}
              onChange={(e) => props.setItems([{ ...props.items[0], Direccion: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Direccion.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Cliente">
          <Select
                type="select"
                name="Cliente"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => props.setItems([{ ...props.items[0], Cliente: e.value}])}
                options={clientes}
                placeholder="Selecione el Cliente..."
                selected={props.items[0]?.Cliente}
              />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Cliente.
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
                onChange={(e) => props.setItems([{ ...props.items[0], Estado: e.target.value }])}
                key="Estado">
                <option>Inicial</option>
                <option>Liquidado</option>
              </FormInput>
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Estado.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <div className="button-list">
        <Button type="button" disabled={props.items[0]?.message ? 'true' : ''}  onClick={(e) => {props.accion(e,props.items)}}>
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
export default Fields;
