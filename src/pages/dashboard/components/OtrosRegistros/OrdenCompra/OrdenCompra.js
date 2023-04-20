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
    setItems,itemsmenuprincipal
  } = useContext(DashboardContext);

  const toggleSignUp = () => {
     if(row.cells[0].value>0)
    setSignUpModal(!signUpModal);
    setItems([{
      id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
      Codigo: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      Empresa:row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      Fecha: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Descripcion: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      Cantidad: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
      ValorUnitario: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
      status: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
    }])
};

  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
        {(() => {
              switch (itemsmenuprincipal) {
                case "OrdenCompra":
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
            <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
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
const OrdenCompra = (props) => {
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    setItems,sizePerPageList,StatusColumn,isLoading
  } = useContext(DashboardContext);
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Codigo',
      accessor: 'Codigo',
      sort: true,
    },
    {
      Header: 'Empresa',
      accessor: 'Empresa',
      sort: true,
    },
    {
      Header: 'Fecha',
      accessor: 'Fecha',
      sort: true,
    },{
      Header: 'Descripción',
      accessor: 'Descripcion',
      sort: true,
    }
    ,{
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: false,
    },{
      Header: 'Valor',
      accessor: 'ValorUnitario',
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
    setItems([{
      id: 1,
      Codigo: '',
      Empresa: '',
      Fecha: '',
      Descripcion:'',
      Cantidad:'',
      ValorUnitario:'',
      status:'',
    }])
 };

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
            {(() => {
              switch (props?.tipo) {
                case "OrdenCompra":
                  return (<><FormAdd
                    title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
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
              {!isLoading? (<Table
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

export default OrdenCompra;
