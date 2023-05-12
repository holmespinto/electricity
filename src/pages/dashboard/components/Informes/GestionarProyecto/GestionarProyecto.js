/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card,  Modal,Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnActions from '../../BtnActions';
import BtnLink from '../../BtnLink';
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
    const itemsPr = itemsProyecto || [];
    let array = [];
    if (id > 0)
    itemsPr?.map((row, i) => {
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
          title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
          validated={validated}
        />
        </Modal.Body>
      </Modal>
      <Row>
      <Pagination className="pagination-rounded mx-auto" size="sm">
       <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`EDITAR_${row.cells[0].value}`}
            toggleActions={toggleSignUp}
            row={row.cells[0].value}
            titulo={'EDITAR'}
            descripcion={'Editar Proyecto'}
            icon={'mdi mdi-square-edit-outline'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`ELIMINAR_${row.cells[0].value}`}
            toggleActions={eliminar}
            row={row.cells[0].value}
            titulo={'ELIMINAR'}
            descripcion={'Registrar Proyecto'}
            icon={'mdi mdi-delete'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnLink
            permisos={permisos?.update}
            key={`ASIGNARAPU_${row.cells[0].value}`}
            row={row.cells[0].value}
            url={'/dashboard/Informes/asignarApu?'}
            titulo={'ASIGNAR'}
            descripcion={'Asignar APU'}
            icon={'mdi mdi-alpha-a-circle-outline'}
          />
        </Pagination.Item>
          </Pagination>
          </Row>
    </React.Fragment>
  );
};
const GestionarProyecto = (props) => {

  const {
    validated, Spinners,query,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList, StatusColumn, isLoading,PERMISOS_USER
  } = useContext(DashboardContext);
  const data = props?.datos || []
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
    query('GestionesBasicas', 'Proyecto', [{ opcion: 'consultar', obj: 'Proyecto' }]);
  }, [])

   //console.log('GestionarProyecto',data)
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
              {!isLoading && data?.length>0 && permisos?.query === 'S'? (<Table
                columns={columns}
                data={data}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={'GestionarProyecto'}
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

export default GestionarProyecto;
