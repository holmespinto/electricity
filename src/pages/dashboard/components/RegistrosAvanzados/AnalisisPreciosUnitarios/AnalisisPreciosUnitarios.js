/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card, Modal,Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnActions from '../../BtnActions';
import FormAdd from './FormAdd';
import OptionsActions from './OptionsActions';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;


const ActionColumn = ({ row }) => {

  const {
    setOpen, toggle, setItemsUpdate,
    open, itemsApu, PERMISOS_USER
  } = useContext(DashboardContext);

  const permisos = PERMISOS_USER || [{}];
  const Apus = itemsApu?.data?.Apus || [];

  const toggleSignUp = (id,opcion) => {
    let array = [];
    if (id > 0)
    Apus?.map((row, i) => {
      const obj ={
        id: row.id,
        Objetivo: row.Objetivo,
        Total: row.Total,
        Opcion: opcion,
      }
        if (row.id === id) {
          array.push(obj)
        }
      })
    setOpen(open);
    toggle()
    setItemsUpdate(array[0])
  };

  return (
    <React.Fragment>
      <Row>
        <Modal show={open} onHide={toggleSignUp}>
          <Modal.Body><OptionsActions
            title={'FORMULARIO'}
          />
          </Modal.Body>
        </Modal>
      </Row>

      <Row>
      <Pagination className="pagination-rounded mx-auto" size="sm">
      <Pagination.Prev className="mx-auto mt-0 mb-0 ">
          <BtnActions
            permisos={permisos?.update}
            key={`APU_${row.cells[0].value}`}
            toggleSignUp={toggleSignUp}
            row={row.cells[0].value}
            titulo={'APU'}
            descripcion={'Registre las Categoria y Subcategorias de la APU'}
            icon={'mdi mdi-comment-text-multiple-outline'}
          />
       </Pagination.Prev>
       <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`EQUIPOS_${row.cells[0].value}`}
            toggleSignUp={toggleSignUp}
            row={row.cells[0].value}
            titulo={'EQUIPOS'}
            descripcion={'Registrar Equipos o Herramientas'}
            icon={'mdi mdi-account-hard-hat'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`MATERIALES_${row.cells[0].value}`}
            toggleSignUp={toggleSignUp}
            row={row.cells[0].value}
            titulo={'MATERIALES'}
            descripcion={'Registrar Materiales'}
            icon={'mdi mdi-alpha-m-circle'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`TRANSPORTE_${row.cells[0].value}`}
            toggleSignUp={toggleSignUp}
            row={row.cells[0].value}
            titulo={'TRANSPORTE'}
            descripcion={'Registrar Transporte'}
            icon={'mdi mdi-ambulance'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`MANOBRA_${row.cells[0].value}`}
            toggleSignUp={toggleSignUp}
            row={row.cells[0].value}
            titulo={'MANO DE OBRA'}
            descripcion={'Registrar Mano de Obras'}
            icon={'mdi mdi-allergy'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`VISTA_${row.cells[0].value}`}
            toggleSignUp={toggleSignUp}
            row={row.cells[0].value}
            titulo={'VISTA'}
            descripcion={'Vista previa de la APU'}
            icon={'mdi mdi-eye-check'}
          />
        </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const AnalisisPreciosUnitarios = (props) => {

  const {
    validated, Spinners, itemsApu,
    signUpModalAdd, setSignUpModalAdd, query,
    sizePerPageList, isLoading, PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];

  const Apus = itemsApu?.data?.Apus || [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Objetivo',
      accessor: 'Objetivo',
      sort: true,
      with: 20,
    },
    {
      Header: '',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    }
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
              {!isLoading && Apus?.length > 0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={Apus}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={' Registrar Objetivos'}
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

export default AnalisisPreciosUnitarios;
