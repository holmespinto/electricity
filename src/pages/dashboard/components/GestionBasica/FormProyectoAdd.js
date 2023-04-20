import React,{useContext,useState} from 'react';
import classNames from 'classnames';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';

const FormProyectoAdd = (props) => {
  const {add} = useContext(DashboardContext);
  const [items, setItems] = useState({});
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
              value={items.Nombre}
              onChange={(e) => setItems({ ...items, Nombre: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Tipo">
              <FormInput
                name="Tipo"
                label="Tipo"
                type="select"
                containerClass="mb-3"
                className="form-select"
                onChange={(e) => setItems({ ...items, Tipo: e.target.value })}
                key="Tipo">
                <option>Externo</option>
                <option>Interno</option>
              </FormInput>
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
              value={items.Direccion}
              onChange={(e) => setItems({ ...items, Direccion: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Direccion.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Cliente">
            <FormInput
                name="Cliente"
                label="Cliente"
                type="select"
                containerClass="mb-3"
                className="form-select"
                onChange={(e) => setItems({ ...items, Cliente: e.target.value })}
                key="Cliente">
                <option>Holmes</option>
                <option>Pinto</option>
              </FormInput>
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
                onChange={(e) => setItems({ ...items, Estado: e.target.value })}
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
        <Button type="button" disabled={items.message ? 'true' : ''} onClick={(e) => add(e,items)}>
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
export default FormProyectoAdd;
