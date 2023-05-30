/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext,useEffect } from 'react';
import { Row, Col, Card,  Modal,Pagination } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
//import { GestionBasicaContext } from '../../../../layouts/context/GestionBasicaContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import BtnActions from '../../BtnActions';
import MensajeAlert from '../../PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import { useOtrosRegistros } from '../../../../../hooks/useOtrosRegistros';

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
              descripcion={'Editar Control Diario'}
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
              descripcion={'Registrar Control Diario'}
              icon={'mdi mdi-delete'}
            />:''
          }
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const ControlDiario = (props) => {
  const {itemsControlDiario,query} = useOtrosRegistros()
  const datos = itemsControlDiario?.data || [{}];
  const permisos = props?.permisos || {};
  const {
    validated,itemsmenuprincipal,
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
                        <Modal.Body>{
                          permisos?.add === 'S' ? (
                          <FormAdd
                            tipo={props?.tipo}
                            accion={props?.accion}
                            title={`GESTIONAR ${props?.tipo?.toUpperCase()}` }
                            validated={validated}
                          />) : ''}
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {!isLoading && datos.length > 0 && permisos?.query === 'S'? (<Table
                columns={columns}
                data={datos}
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
                />) : <MensajeAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ControlDiario;
