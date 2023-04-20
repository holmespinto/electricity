// @flow
import React, { useContext} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
//import { GestionBasicaContext } from '../../../../layouts/context/GestionBasicaContext';
import FormClienteAdd from './FormClienteAdd';
import FormClienteUpdate from './FormClienteUpdate';
import Table from '../../../../components/Table';

const ActionColumn = ({ row }) => {

  const {
    eliminar,
    update,
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
      Identificacion: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
      Email: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
      Nombre: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
      Direccion: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
      Telefono: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
      status: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
    }])
};

  return (
    <React.Fragment>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
        {(() => {
              switch (itemsmenuprincipal) {
                case "Cliente":
                  return (<><FormClienteUpdate
                    title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
                    validated={validated}
                    accion={update}
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
const Material = (props) => {
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    items,add,
    setItems,sizePerPageList,StatusColumn,isLoading
  } = useContext(DashboardContext);
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Identificacion',
      accessor: 'Identificacion',
      sort: true,
    },
    {
      Header: 'Email',
      accessor: 'Email',
      sort: true,
    }, {
      Header: 'Nombre',
      accessor: 'Nombre',
      sort: true,
    }, {
      Header: 'Direccion',
      accessor: 'Direccion',
      sort: false,
    }, {
      Header: 'Telefono',
      accessor: 'Telefono',
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
      Nombre: '',
      Unidad: '',
      ValorUnitario: '',
      Descripcion:'',
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
                case "Cliente":
                  return (<><FormClienteAdd
                    title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                    setItems={setItems}
                    items={items}
                    validated={validated}
                    accion={add}
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
                data={props.materias}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />):'Esperando...'}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Material;
