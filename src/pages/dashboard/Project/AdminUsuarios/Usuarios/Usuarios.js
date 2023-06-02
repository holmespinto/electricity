/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect} from 'react';
import { Row, Col, Card, Button, Modal,Pagination } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import BtnActions from '../../BtnActions';
import MensajeAlert from '../../PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';


const ActionColumn = ({ row }) => {


  const {
    eliminar,
    validated,setOpen,open,toggle,setItemsUpdate,itemsUsuarios
  } = useContext(DashboardContext);


  const toggleUpUpdate = (id) => {
    let auteurs = [];
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);

    if (localPermiso?.update === 'S') {
  if (id > 0)
  itemsUsuarios?.data?.auteurs?.map((row, i) =>{
         if(row.id===id){
         const obj =
            {
                id: row.id,
                login: row.login,
                email: row.email,
                rol: row.rol
            }
            auteurs.push(obj)
         }
      })
      setItemsUpdate(auteurs[0])

    setOpen(open);
    toggle()
  } else {
    Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
  }
  };

//console.log('signUpUpdate',signUpUpdate)
  return (
    <React.Fragment>
      <Modal show={open} onHide={toggleUpUpdate}>
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
              descripcion={'Editar Usuario'}
              icon={'mdi mdi-square-edit-outline'}
            />
          </Pagination.Item>
          <Pagination.Item>
            <BtnActions
              permisos={'S'}
              key={`ELIMINAR_${row.cells[0].value}`}
              toggleActions={eliminar}
              row={row.cells[0].value}
              titulo={'ELIMINAR'}
              descripcion={'Eliminar Usuario'}
              icon={'mdi mdi-delete'}
            />
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const Usuarios = (props) => {
  const permisos = props?.permisos || {};
  const datos = props?.datos?.auteurs || [];
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,query,
    sizePerPageList,
  } = useContext(DashboardContext);



  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Login',
      accessor: 'login',
      sort: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      sort: true,
    }
    , {
      Header: 'Tipo Usuario',
      accessor: 'rol',
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
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}

  };
  useEffect(() => {
    query('AdminUsuarios','Usuarios',[{opcion:'lista_Usuarios',obj:'Usuarios'}]);
  }, [query]);

  //console.log('Usuarios',props)
  return (
    <>

      <Row>
        <Col>
          <Card>
            <Card.Body>
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
                    <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
                      <i className="mdi mdi-cog-outline"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
              {datos?.length > 0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={props?.datos?.auteurs}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />) : <MensajeAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Usuarios;
