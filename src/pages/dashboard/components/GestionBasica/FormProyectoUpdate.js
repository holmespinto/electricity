import React,{useContext} from 'react';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';

const FormProyectoUpdate = (props) => {
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
          <Form.Group className="mb-3" controlId="Nombre">
          <FormInput
              label="Nombre"
              type="textarea"
              name="Nombre"
              rows="5"
              containerClass={'mb-3'}
              key="Nombre"
              placeholder="Digite el Nombre"
              value={items[0]?.Nombre}
              onChange={(e) => setItems([{...items[0],Nombre: e.target.value }])}
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
                onChange={(e) => setItems([{...items[0], Tipo: e.target.value }])}
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
              value={items[0]?.Direccion}
              onChange={(e) => setItems([{...items[0], Direccion: e.target.value }])}
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
                onChange={(e) => setItems([{...items[0], Cliente: e.target.value }])}
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
                onChange={(e) => setItems([{...items[0], Estado: e.target.value }])}
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
        <Button type="button" disabled={items[0]?.message ? 'true' : ''}  onClick={props?.accion}>
          +
        </Button>

      </div>
    </Form>
    </React.Fragment>
    );
}
export default FormProyectoUpdate;
