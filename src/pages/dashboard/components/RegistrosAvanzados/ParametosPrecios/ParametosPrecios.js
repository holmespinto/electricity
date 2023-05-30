/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal,Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnActions from '../../BtnActions';
import FormAdd from './FormAdd';
import OptionsActions from './OptionsActions';
import Table from '../../../../../components/Table';
import MensajeAlert from '../../PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';


const ActionColumn = ({ row }) => {

  const {
    eliminar,
    toggle,
    setOpen,
    setItemsUpdate,
    open,
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
      <Row>
        <Modal show={open} onHide={toggleSignUp}>
          <Modal.Body>
            <OptionsActions />
          </Modal.Body>
        </Modal>
      </Row>
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
const ParametosPrecios = (props) => {
  const {itemsParametroPrecio,query} = useGestionPrecios()
  const datos = itemsParametroPrecio?.data?.ParametrosPrecios || [];
  const permisos = props?.permisos || {};
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList, isLoading,
  } = useContext(DashboardContext);


  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Parametro',
      accessor: 'Parametro',
      sort: true,
      with: 20,
    },    {
      Header: 'Valor',
      accessor: 'valor',
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
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('RegistrosAvanzados', 'ParametroPrecio', [{ opcion: 'consultar', obj: 'ParametroPrecio' }]);
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
              {!isLoading && datos?.length > 0 && permisos?.query === 'S' ? (<Table
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
                titulo={' Crear Configuración'}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />): <MensajeAlert/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ParametosPrecios;
