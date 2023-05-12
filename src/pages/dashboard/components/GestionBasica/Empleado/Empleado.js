// @flow
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card,  Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,
    signUpModal,
    setSignUpModal,
    setItems, itemsmenuprincipal,PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const toggleSignUp = () => {
    if (row.cells[0].value > 0)
      setSignUpModal(!signUpModal);
    setItems([{
      id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
      Identificacion: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      Nombres: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      Apellidos: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Email: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      Telefono: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
      Cargo: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
      Salario: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
      status: row.cells[8].value ? row.cells[8].value : row.cells[8].value,
    }])
  };

  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body><FormUpdate
          title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
          validated={validated}
        />
        </Modal.Body>
      </Modal>
      {
        permisos?.update === 'S' ? (
          <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
            {' '}
            <i className="mdi mdi-square-edit-outline"></i>
          </Link>) : ''
      }
      {
        permisos?.delete === 'S' ? (
          <Link to="#" className="action-icon" onClick={() => eliminar(row.cells[0].value)}>
            {' '}
            <i className="mdi mdi-delete"></i>
          </Link>) : ''}
    </React.Fragment>
  );
};
const Empleado = (props) => {
  const {
    validated, Spinners, itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd,
    query, sizePerPageList, StatusColumn, isLoading,PERMISOS_USER
  } = useContext(DashboardContext);
  const Empleados = props?.datos?.length > 0 ? props?.datos : []
  const permisos = PERMISOS_USER || [{}];
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
      Header: 'Email',
      accessor: 'Email',
      sort: false,
    }, {
      Header: 'Telefono',
      accessor: 'Telefono',
      sort: false,
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
      Header: 'Status',
      accessor: 'status',
      sort: true,
      Cell: StatusColumn,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];
  const toggleSignUp = () => {
    setSignUpModalAdd(!signUpModalAdd);
  };
  useEffect(() => {
    query('GestionesBasicas', 'Empleado', [{ opcion: 'consultar', obj: 'Empleado' }]);
  }, [query])
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12} className={`${signUpModalAdd ? '' : 'd-lg-none'}`}>
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
                        <Modal.Body><FormAdd
                          title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                          validated={validated}
                        />
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>>
              </Row>
              {!isLoading && Empleados.length > 0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={Empleados}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                isVisible={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={itemsmenuprincipal}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />) : <Suspense fallback={loading()}><Spinners /></Suspense>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Empleado;
