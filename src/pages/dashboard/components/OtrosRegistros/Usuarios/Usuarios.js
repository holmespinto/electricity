/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense,useEffect} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../Table';
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,setOpen,open,toggle,setItemsUpdate,itemsUsuarios
  } = useContext(DashboardContext);

  const toggleUpUpdate = (id) => {
  let auteurs = [];
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
      <Link to="#" className="action-icon" onClick={() => toggleUpUpdate(row.cells[0].value)}>
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
const Usuarios = (props) => {


  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,query,
    sizePerPageList, isLoading
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
    setSignUpModalAdd(!signUpModalAdd);
  };
  useEffect(() => {
    query('GestionBasica','Usuarios',[{opcion:'lista_Usuarios',obj:'Usuarios'}]);
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
                        <Modal.Body><FormAdd
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
              {!isLoading && props?.datos?.auteurs?.length>0? (<Table
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
              />) : <Suspense fallback={loading()}>Esperando...</Suspense>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Usuarios;
