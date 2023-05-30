/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import PermisoAlert from '../../PermisoAlert/PermisoAlert';
import BtnActions from '../../BtnActions';
import Swal from 'sweetalert2';
import { useGestionBasica } from '../../../../../hooks/useGestionBasica';

const ActionColumn = ({ row }) => {
  const {
    eliminar,
    validated,
    toggle,
    setOpen,
    setItemsUpdate,
    open, itemsmenuprincipal
  } = useContext(DashboardContext);


   const toggleSignUp = (id) => {
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if(row.cells[0].row.values.id===id)
      setItemsUpdate(row.cells[0].row.values)
      setOpen(open);
      toggle()
    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };
  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
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

           {
           (localPermiso?.update === 'S')?
            <BtnActions
              permisos={'S'}
              key={`EDITAR_${row.cells[0].value}`}
              toggleActions={toggleSignUp}
              row={row.cells[0].value}
              titulo={'EDITAR'}
              descripcion={'Editar Proyecto'}
              icon={'mdi mdi-square-edit-outline'}
            />:''
           }
          </Pagination.Item>
          <Pagination.Item>
          {
           (localPermiso?.update === 'S')?
            <BtnActions
              permisos={'S'}
              key={`ELIMINAR_${row.cells[0].value}`}
              toggleActions={eliminar}
              row={row.cells[0].value}
              titulo={'ELIMINAR'}
              descripcion={'Registrar Proyecto'}
              icon={'mdi mdi-delete'}
            />:''
          }
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const Proyecto = (props) => {
  const permisos = props.permisos || {};
  const {itemsProyectos,query} = useGestionBasica()
  const {
    validated, itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList, StatusColumn,
  } = useContext(DashboardContext);

  const datos = itemsProyectos?.data || [{}];

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
      with: 20,
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
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('GestionesBasicas', 'Proyecto', [{ opcion: 'consultar', obj: 'Proyecto' }]);
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
              {datos?.length > 0 && permisos?.query === 'S' ?  (<Table
                columns={columns}
                data={datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isVisible={true}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={itemsmenuprincipal}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Proyecto;
