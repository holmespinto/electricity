// @flow
import React, { useContext, Suspense } from 'react';
import { Row, Col, Card,Collapse /*Button, Modal*/ } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
//import FormUpdate from './FormUpdate';
import Table from '../../../../../../components/Table';
const loading = () => <div className="text-center"></div>;

const ActionColumn = ({ row }) => {

  const {
    //eliminar,
    setItems, queryNominaEmpleado,open, setOpen,toggle//setOpenNomin,openNomin
  } = useContext(DashboardContext);

  const toggleSignUpx = () => {
    if (row.cells[0].value > 0)
    setOpen(open);
    toggle()
    //setOpenNomin(!openNomin);
      queryNominaEmpleado('OtrosRegistros', 'GenerarNomina', [{ opcion: 'consultar_nomina_empleado', idEmpleado: row.cells[0].value }]);
    console.log('click');
    setItems([{
      id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
      Identificacion: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      Nombres: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      Apellidos: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Cargo: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      Salario: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
    }])

  };

  return (
    <React.Fragment>
      <Link to="#" className="action-icon" data-bs-toggle="collapse" onClick={() => toggleSignUpx()}>
        {' '}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
    </React.Fragment>
  );
};
const NominaEmpleado = (props) => {

  const {

    //signUpModalAdd,
    sizePerPageList, isLoading,open
  } = useContext(DashboardContext);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Identificacion',
      accessor: 'Identificacion',
      sort: true,
    },
    {
      Header: 'Nombres',
      accessor: 'Nombres',
      sort: true,
    }, {
      Header: 'Apellidos',
      accessor: 'Apellidos',
      sort: true,
    }, {
      Header: 'Cargo',
      accessor: 'Cargo',
      sort: false,
    }, {
      Header: 'Salario',
      accessor: 'Salario',
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
console.log(open)
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Collapse in={open} appear>
            <div>
              <Row>

                <Col sm={12} >
                  <FormAdd />
                </Col>
              </Row>
              </div>
                </Collapse>
              {!isLoading ? (<Table
                columns={columns}
                data={props.datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />) : <Suspense fallback={loading()}>Esperando...</Suspense>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NominaEmpleado;
