// @flow
import React, { useContext,Suspense} from 'react';
import { Row, Col, Card, Button, Modal,Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../../components/Table';
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,
    signUpModal,
    setSignUpModal,
    setItems,itemsmenuprincipal,query
  } = useContext(DashboardContext);

  const toggleSignUp = () => {

     if(row.cells[0].value>0)

     query('OtrosRegistros','GenerarNomina',[{opcion:'consultar_estados'}]);
      setSignUpModal(!signUpModal);
      setItems([{
      id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
      Codigo: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      FechaInicial: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      FechaFinal: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Total:  row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      Estado: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
    }])
};

  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body><FormUpdate
                    title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
                    validated={validated}
                  />
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
const Nomina = (props) => {



  const {
    validated,
    open, setOpen,toggle,
    setItems,sizePerPageList,isLoading,query,
  } = useContext(DashboardContext);



  const columns = [
    {
      Header: 'No',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Codigo',
      accessor: 'Codigo',
      sort: true,
    }, {
      Header: 'FechaInicial',
      accessor: 'FechaInicial',
      sort: true,
    }, {
      Header: 'FechaFinal',
      accessor: 'FechaFinal',
      sort: true,
    }
    ,{
      Header: 'Total',
      accessor: 'Total',
      sort: false,
    },{
      Header: 'Estado',
      accessor: 'Estado',
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
    let opciones =[{opcion:'consultar_estados'}]
    query('OtrosRegistros','GenerarNomina',opciones);
    toggle();
    setOpen(!open);
    setItems([{
      id: 1,
      Codigo: '',
      Empresa: '',
      FechaInicial: '',
      FechaFinal:'',
      Comprobante:'',
      Total:'',
      Estado:'',
      status:'',
    }])
 };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Collapse in={open}>
                    <div>
              <Row>
                <Col sm={12} >
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={open} onHide={setOpen}>
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
              </div>
                </Collapse>
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

export default Nomina;
