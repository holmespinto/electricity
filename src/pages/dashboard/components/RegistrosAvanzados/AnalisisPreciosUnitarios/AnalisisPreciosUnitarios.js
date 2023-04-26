/* eslint-disable array-callback-return */
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
    setOpen, toggle, setItemsUpdate,
    open, itemsmenuprincipal, itemsProyecto,PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const toggleSignUp = (id) => {
    let array = [];
    if (id > 0)
      itemsProyecto?.map((row, i) => {
        if (row.id === id) {
          array.push(row)
        }
      })
    setOpen(open);
    toggle()
    setItemsUpdate(array[0])
  };

  return (
    <React.Fragment>
      <Modal show={open} onHide={toggleSignUp}>
        <Modal.Body><FormUpdate
          title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
          validated={validated}
        />
        </Modal.Body>
      </Modal>
      {
        permisos?.update === 'S' ? (
          <Link to="#" className="action-icon" onClick={() => toggleSignUp(row.cells[0].value)}>
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
const AnalisisPreciosUnitarios = (props) => {

  const {
    validated, Spinners,itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd, query,
    sizePerPageList, StatusColumn, isLoading,PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Nombre',
      accessor: 'Nombre',
      sort: true,
      with:20,
    },
    {
      Header: 'Tipo Proyecto',
      accessor: 'Tipo',
      sort: true,
    }, {
      Header: 'Direccion',
      accessor: 'Direccion',
      sort: true,
    }, {
      Header: 'Cliente',
      accessor: 'Cliente',
      sort: false,
    }, {
      Header: 'Estado',
      accessor: 'Estado',
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
    query('RegistrosAvanzados', 'Apu', [{ opcion: 'consultar', obj: 'Apu' }]);
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
                </Col>
              </Row>
              {/*!isLoading && props?.datos?.length>0 && permisos?.query === 'S'? (<Table
                columns={columns}
                data={props?.datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={itemsmenuprincipal}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />) : <Suspense fallback={loading()}><Spinners /></Suspense>*/}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AnalisisPreciosUnitarios;
