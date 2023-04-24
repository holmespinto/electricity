// @flow
import React, { useContext,Suspense} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
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
    signUpModal,
    setSignUpModal,
    setItems,itemsmenuprincipal,PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const toggleSignUp = () => {
     if(row.cells[0].value>0)
    setSignUpModal(!signUpModal);
    setItems([{
      id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
      Nombre: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      Unidad: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      ValorUnitario: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Descripcion: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      status: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
    }])
};

  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
        {(() => {
              switch (itemsmenuprincipal) {
                case "Material": case "ManoObra": case "Herramientas":
                  return (<><FormUpdate
                    title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
                    validated={validated}
                  /></>);
                default:
                  return (
                    <>{''}</>
                  );
              }
            })()}
        </Modal.Body>
      </Modal>
            {
            permisos?.update==='S'?(
            <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>):''
            }
             {
            permisos?.delete==='S'?(
            <Link to="#" className="action-icon" onClick={() => eliminar(row.cells[0].value)}>
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>):''}
        </React.Fragment>
  );
};
const Material = (props) => {
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    setItems,sizePerPageList,StatusColumn,isLoading,PERMISOS_USER
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
    },
    {
      Header: 'Unidad',
      accessor: 'Unidad',
      sort: true,
    }, {
      Header: 'Valor',
      accessor: 'ValorUnitario',
      sort: true,
    }, {
      Header: 'Descripción',
      accessor: 'Descripcion',
      sort: false,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      // eslint-disable-next-line no-undef
      Cell: StatusColumn,
    },
  ];
  const toggleSignUp = () => {
    setSignUpModalAdd(!signUpModalAdd);
 };
 console.log('PERMISOS_USER',permisos)
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
          permisos?.add==='S'?(<FormAdd
                    title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                    validated={validated}
                  />):''}
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
                  {
                  permisos?.add==='S'?(
                  <div className="text-sm-end">
                    <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
                      <i className="mdi mdi-cog-outline"></i>
                    </Button>
                  </div>
                  ):''
                    }
                </Col>
              </Row>
              {!isLoading && permisos?.query==='S'?(<Table
                columns={columns}
                data={props.datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />):<Suspense fallback={loading()}>Esperando...</Suspense>}
            </Card.Body>
          </Card>
        </Col>
       </Row>
    </>
  );
};

export default Material;
