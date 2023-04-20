import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import Table from '../../../../components/Table';
const NominaFormIngresoEgreso = (props) => {
  const columDatosPersonales = [
    {
      Header: 'Identificacion',
      accessor: 'Identificacion',
      sort: false,
  },
    {
        Header: 'Nombres y Apellidos',
        accessor: 'NombresApellidos',
        sort: false,
    }];

    const columIngresosEgresos = [
    {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: false,
  },
    {
        Header: 'Cantidad',
        accessor: 'Cantidad',
        sort: false,
    },
    {
        Header: 'Valor',
        accessor: 'Valor',
        sort: false,
    }];

    const columDatosEmpresa = [
      {
        Header: 'Salario básico:',
        accessor: 'Salario:',
        sort: false,
    },{
        Header: 'Cargo',
        accessor: 'Cargo',
        sort: false,
    }
  ];
  const records1 = [
    {
        id: 1,
        Identificacion: 77027207,
        NombresApellidos: 'HOLMES ELIAS PINTO AVILA ',
    }]
    const records2 = [
      {
          id: 1,
          Cargo: 'DESARROLLADOR FULL STACK',
          Salario: '2,323.232',
      }]
        const ingresos = [
      {
          id: 1,
          Concepto: 'Sueldo',
          Cantidad: '30',
          Valor: '2,323.232',
      },{
        id: 2,
        Concepto: 'Bono Extralegal no salarial',
        Cantidad: '0.00',
        Valor: '$ 1,680,000.00',
    }]
    const deduciones = [
      {
          id: 1,
          Concepto: 'Fondo de salud',
          Cantidad: '0',
          Valor: '$ 100,800.00',
      },{
        id: 2,
        Concepto: 'Fondo de pensión',
        Cantidad: '0',
        Valor: '$ 100,800.00',
    }]
  return (
  <React.Fragment>
   <div className="text-center mt-2 mb-4 btn-success">
      <span className="text-white">Periodo de Pago: 2023/03/01 - 2023/03/30</span>
      <br />
      <span className="text-white">Comprobante Número:694</span>
    </div>

    <div className="text-center mt-2 mb-4 btn-success">
      <br />
      <span className="text-white">DATOS DEL EMPLEADO</span>
      <br />
    </div>
        <Table
          columns={columDatosPersonales}
          data={records1}
          pageSize={0}
          isSortable={true}
          isSearchable={false}
          numtable={'1'}
          isVisible={false}
        />
         <Table
          columns={columDatosEmpresa}
          data={records2}
          pageSize={0}
          isSortable={true}
          isSearchable={false}
          numtable={'1'}
          isVisible={false}
        />
    <div className="text-center mt-2 mb-4 btn-success">
      <span className="text-white">INGRESOS</span>
      <br />
    </div>
    <Form validated={props.validated}>
      <Row>
        <Col sm={4}>
        <Form.Group className="mb-3" controlId="ConcIngresos">
              <FormInput
                name="ConcIngresos"
                label="Conceptos"
                type="select"
                containerClass="mb-3"
                className="form-select"
                onChange={(e) => props.setItems({ ...props.items, ConcIngresos: e.target.value })}
                key="ConcIngresos">
                <option>Salario Básico</option>
                <option>Días Liquidados</option>
                <option>Aux Transporte</option>
                <option>Horas Extras</option>
                <option>Cominsiones</option>
              </FormInput>
              <Form.Control.Feedback type="invalid">
              Por favor, digite el Concepto.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={3}>
        <Form.Group className="mb-1" controlId="CantIngreso">
          <Form.Label>Cantidad</Form.Label>
            <Form.Control
              required
              type="number"
              name="CantIngreso"
              containerClass="mb-3"
              placeholder="Digite la Cantidad"
              value={props.items.CantIngreso}
              onChange={(e) => props.setItems({ ...props.items, CantIngreso: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Cantidad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={3}>
        <Form.Group className="mb-1" controlId="ValorIngreso">
          <Form.Label>Valor</Form.Label>
            <Form.Control
              required
              type="number"
              name="ValorIngreso"
              containerClass="mb-3"
              placeholder="Digite la Cantidad"
              value={props.items.ValorIngreso}
              onChange={(e) => props.setItems({ ...props.items, ValorIngreso: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Cantidad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={2}>
        <br />
          <Button type="button" className="mb-1" onClick={props.accion}>Add</Button>
        </Col>
      </Row>
      </Form>
      <Row>
        <Col sm={12}>
      <Table
          columns={columIngresosEgresos}
          data={ingresos}
          pageSize={0}
          isSortable={true}
          isSearchable={false}
          numtable={'1'}
          isVisible={false}
        />
        </Col>
        </Row>
        <Row>
        <Col sm={8}>Total Ingresos</Col>
        <Col sm={4}>$ 4,200,000.00</Col>
        </Row>
      <div className="text-center mt-2 mb-4 btn-success">
      <span className="text-white">DEDUCCIONES</span>
      <br />
    </div>
    <Form validated={props.validated}>
    <Row>
        <Col sm={4}>
        <Form.Group className="mb-3" controlId="ConcEgreso">
              <FormInput
                name="ConcEgreso"
                label="Conceptos"
                type="select"
                containerClass="mb-3"
                className="form-select"
                onChange={(e) => props.setItems({ ...props.items, ConcEgreso: e.target.value })}
                key="ConcEgreso">
                <option>Salud</option>
                <option>Pensión</option>
                <option>Préstamos</option>
              </FormInput>
              <Form.Control.Feedback type="invalid">
              Por favor, digite el Concepto.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={3}>
        <Form.Group className="mb-1" controlId="CantEgraso">
          <Form.Label>Cantidad</Form.Label>
            <Form.Control
              required
              type="number"
              name="CantEgraso"
              containerClass="mb-3"
              placeholder="Digite la Cantidad"
              value={props.items.Nombre}
              onChange={(e) => props.setItems({ ...props.items, CantEgraso: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Cantidad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={3}>
        <Form.Group className="mb-1" controlId="ValorEgraso">
          <Form.Label>Valor</Form.Label>
            <Form.Control
              required
              type="number"
              name="ValorEgraso"
              containerClass="mb-3"
              placeholder="Digite la Cantidad"
              value={props.items.Nombre}
              onChange={(e) => props.setItems({ ...props.items, ValorEgraso: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Cantidad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={2}>
        <br />
          <Button type="button" className="mb-1" onClick={props.accion}>Add</Button>
        </Col>
      </Row>
      </Form>
      <Row>
        <Col sm={12}>
      <Table
          columns={columIngresosEgresos}
          data={deduciones}
          pageSize={0}
          isSortable={true}
          isSearchable={false}
          numtable={'1'}
          isVisible={false}
        />
        </Col>
        </Row>
        <Row>
        <Col sm={8}>Total Deducciones</Col>
        <Col sm={4}>$ 201,600.00</Col>
        </Row>
        <Row>
        <Col sm={8}><div className="text-center mt-2 mb-4 btn-success">
        <span className="text-white">NETO A PAGAR</span>
        </div></Col>
        <Col sm={4}><div className="text-center mt-2 mb-4 btn-success">
        <span className="text-white">$ 3,998,400.00</span>
        </div></Col>
        </Row>

    </React.Fragment>
    );
}
export default NominaFormIngresoEgreso;
