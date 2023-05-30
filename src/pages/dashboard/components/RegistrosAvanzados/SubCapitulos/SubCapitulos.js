/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
import React, { useContext,useEffect,useMemo } from 'react';

import { Row, Col, Card, Modal,Pagination } from 'react-bootstrap';
import BtnActions from '../../BtnActions';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import Swal from 'sweetalert2';
import MensajeAlert from '../../PermisoAlert/PermisoAlert';

import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';

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
      setItemsUpdate(row?.cells[0]?.row?.values)
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
              descripcion={'Editar Orden de Compra'}
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
              descripcion={'Registrar Orden de Compra'}
              icon={'mdi mdi-delete'}
            />:''
          }
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};

const SubCapitulos = (props) => {
  const {itemsEditorApu,query} = useGestionPrecios()

  const datos = itemsEditorApu?.data?.SubCategorias || [{}];

  const permisos = props?.permisos || {};
  const {validated,signUpModalAdd, setSignUpModalAdd, sizePerPageList,
  } = useContext(DashboardContext);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Código',
      accessor: 'Codigo',
      sort: true,
    },
    {
      Header: 'Descripcion',
      accessor: 'Descripcion',
      sort: true,
    },{
      Header: 'Unidad',
      accessor: 'Unidad',
      sort: true,
    },{
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: true,
    },{
      Header: 'Valor Unitario',
      accessor: 'ValorUnitario',
      sort: true,
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
    {
      query('RegistrosAvanzados','EditorPUA',[{opcion:'consultar',obj:'EditorPUA'}]);
    }
  }, [props.tipo, query])

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
                isVisible={true}
                nametable={props.accion}
                titulo={' Listado APU'}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />) : <MensajeAlert/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SubCapitulos;
