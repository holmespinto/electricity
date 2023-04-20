import React,{useState,useContext} from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
const FormAdd = (props) => {
  const {add} = useContext(DashboardContext);
  const [items, setItems] = useState({});



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
              value={items?.Nombre}
              onChange={(e) => setItems({ ...items, Nombre: e.target.value })}
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
              value={items?.Unidad}
              onChange={(e) => setItems({ ...items, Unidad: e.target.value })}
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
              value={items?.Descripcion}
              onChange={(e) => setItems({ ...items, Descripcion: e.target.value })}
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
              value={items?.ValorUnitario}
              onChange={(e) => setItems({ ...items, ValorUnitario: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Valor Unitario.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <div className="button-list">
        <Button type="button" disabled={props?.items?.message?.length<0 ? 'true' : ''} onClick={(e) => {add(e,items)}}>
          +
        </Button>

        {/*props.items.message?.length<0 && (
          <Button type="button" className="btn-icon" onClick={props.Close}>
            <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
          </Button>
        )*/}
      </div>
    </Form>
    </React.Fragment>
    );
}
export default FormAdd;
