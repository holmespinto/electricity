// @flow
import React, { useContext } from 'react';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import FormUpdate from './FormUpdate';
import FormAdd from './FormAdd'
import Table from '../../../../../../components/Table';
//const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {
  const {
    eliminar,
    validated,
    signUpModal,
    setSignUpModal,
    itemsmenuprincipal,
    setEmpleadoNomina
  } = useContext(DashboardContext);

  const toggleLiquida = () => {
    setSignUpModal(!signUpModal);
    if (row.cells[0].value > 0)
      setEmpleadoNomina([{
        id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
        Concepto: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
        Cantidad: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        Devengado: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        Deducido: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      }])
  };
  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleLiquida}>
        <Modal.Body>
          <FormUpdate
            title={`Gestionar concepto ${itemsmenuprincipal?.toUpperCase()}`}
            validated={validated}
          />
        </Modal.Body>
      </Modal>
      <Link to="#" className="action-icon" onClick={() => toggleLiquida()}>
        {' '}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
      <Link to="#" className="action-icon" onClick={() => eliminar(row.cells[0].value)}>
        {' '}
        <i className="mdi mdi-delete"></i>
      </Link>
    </React.Fragment>
  );
};
const LiquidarNomina = (props) => {

  const {
    validated,
    setSignUpModalLiqNomina, signUpModalLiqNomina,
    sizePerPageList
  } = useContext(DashboardContext);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: false,
    }, {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: false,
    }, {
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: false,
    }, {
      Header: 'Devengado',
      accessor: 'Devengado',
      sort: false,
    }, {
      Header: 'Deducido',
      accessor: 'Deducido',
      sort: false,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];
  const toggleUpNomina = () => {

    setSignUpModalLiqNomina(!signUpModalLiqNomina);

  };
  console.log('listNomina',props?.EmpleadoNomina)
  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              <Modal show={signUpModalLiqNomina} onHide={toggleUpNomina}  size={'lg'}>
                <Modal.Body>
                  {
                    props?.Empleado.Identificacion>0?
                    <FormAdd
                    title={`GESTIONAR NOMINA`}
                    validated={validated}
                    Empleado={props?.Empleado}
                    Nomina={props?.Nomina}
                    Conceptos={props?.Conceptos}
                  />:'Seleccione el Empleado para liquidar la Nomina'
                  }
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
        </Col>
        <Col sm={8}>
          <div className="text-sm-end">
            <Button className="btn btn-success mb-2 me-1" onClick={toggleUpNomina}>
              <i className="mdi mdi-cog-outline"></i>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {props?.EmpleadoNomina.length>0?(<Table
                className="mb-0" variant="dark"
                columns={columns}
                data={props?.EmpleadoNomina}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                theadClass="table-black"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />):('Esperando...')}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LiquidarNomina;
