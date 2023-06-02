/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, Pagination, } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import BtnActions from '../../BtnActions';
import Swal from 'sweetalert2';
import PermisoAlert from '../../PermisoAlert/PermisoAlert';
import FormAdd from './FormAdd';

const ActionColumn = ({ row }) => {

  const {
    validated, setOpen, open, toggle, setItemsUpdate, itemsRoles
  } = useContext(DashboardContext);

  const toggleUpUpdate = (id) => {
    let array = [];
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {
      if (id > 0)
        itemsRoles.dataRoles?.roles?.map((row, i) => {
          if (row.id === id) {
            array.push(row)
          }
        })
      setOpen(open);
      toggle()
      setItemsUpdate(array[0])
    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };


  return (
    <React.Fragment>
      <Modal show={open} onHide={toggleUpUpdate} size={'lg'}>
        <Modal.Body>
          <FormUpdate
            title={`ACTUALIZAR DATOS DEL USUARIOS`}
            validated={validated}
          />
        </Modal.Body>
      </Modal>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>
            <BtnActions
              permisos={'S'}
              key={`EDITAR_${row.cells[0].value}`}
              toggleActions={toggleUpUpdate}
              row={row.cells[0].value}
              titulo={'EDITAR'}
              descripcion={'Editar Rol'}
              icon={'mdi mdi-square-edit-outline'}
            />
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const Roles = (props) => {
  const permisos = props.permisos || {};
  const datos = props?.datos?.dataRoles?.roles || [{}];
  const {
    sizePerPageList, query,
    setSignUpModalAdd,
    signUpModalAdd,
    validated,
  } = useContext(DashboardContext);


  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Menu',
      accessor: 'menu',
      sort: true,
    },
    {
      Header: 'Submenu',
      accessor: 'submenu',
      sort: true,
    }
    , {
      Header: 'rol',
      accessor: 'rol',
      sort: false,
    }, {
      Header: 'query',
      accessor: 'c',
      sort: false,
    }, {
      Header: 'add',
      accessor: 'a',
      sort: false,
    }, {
      Header: 'update',
      accessor: 'u',
      sort: false,
    }, {
      Header: 'delete',
      accessor: 'd',
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

  useEffect(() => {
    query('AdminUsuarios', 'Roles', [{ opcion: 'consultar', obj: 'Roles' }]);
  }, [query])

  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              {/* Sign up Modal */}
              <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
                <Modal.Body>
                  <FormAdd
                    title={`GESTIONAR USUARIOS`}
                    validated={validated}
                  />
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
            {/*
            <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
              <i className="mdi mdi-cog-outline"></i>
            </Button>
            */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {datos?.length > 0 && permisos?.query === 'S' ? (<Table
                    columns={columns}
                    data={datos}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    nametable={props.accion}
              />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Roles;
