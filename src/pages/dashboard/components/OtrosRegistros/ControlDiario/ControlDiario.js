// @flow
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card,  Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
//import { GestionBasicaContext } from '../../../../layouts/context/GestionBasicaContext';
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
    setItems, itemsmenuprincipal
  } = useContext(DashboardContext);

  const toggleSignUp = () => {
    if (row.cells[0].value > 0)
      setSignUpModal(!signUpModal);
    setItems([{
      id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
      Ciudad: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      Concepto: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      Fecha: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Paga: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      Valor: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
      ValorLetras: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
      status: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
    }])
  };

  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
          <FormUpdate
            title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
            validated={validated}
          />
        </Modal.Body>
      </Modal>
      <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
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
const ControlDiario = (props) => {
  const {
    query,
    validated,itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd,
    Spinners, sizePerPageList, isLoading,
    PERMISOS_USER
  } = useContext(DashboardContext);

  const permisos = PERMISOS_USER || [{}];
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Ciudad',
      accessor: 'Ciudad',
      sort: true,
    },
    {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: true,
    }, {
      Header: 'Fecha',
      accessor: 'Fecha',
      sort: true,
    }, {
      Header: 'Paga',
      accessor: 'Paga',
      sort: true,
    }
    , {
      Header: 'Valor',
      accessor: 'Valor',
      sort: false,
    }, {
      Header: 'Valor Letra',
      accessor: 'ValorLetras',
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
  const toggleSignUp = () => {
    setSignUpModalAdd(!signUpModalAdd);
  };

  useEffect(() => {
    query('OtrosRegistros', 'ControlDiario', [{ opcion: 'consultar', obj: 'ControlDiario' }]);
  }, [query]);

  const controDiario = props?.datos || [];

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
                        <Modal.Body>
                          <FormAdd
                            title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                            validated={validated}
                          />
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {!isLoading && controDiario.length > 0 && permisos?.query === 'S'? (<Table
                columns={columns}
                data={controDiario}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isVisible={true}
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

export default ControlDiario;
