// @flow
import React, { useEffect, useContext } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import VistaCliente from './VistaCliente';
import Table from '../../../../components/Table';



const ActionColumn = ({ row }) => {
  const {
    setSignUpModal, signUpModal,items

  } = useContext(DashboardContext);

  const INIT_CLIENTE = {
    id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
    Identificacion: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Email: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
    Nombre: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
    Direccion: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
    Telefono: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
    status: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
  };


  const toggleSignUp = () => {
    setSignUpModal(!signUpModal);
  };


  return (
    <React.Fragment>
      <Link to="#" className={`action-icon`} onClick={() => toggleSignUp()}>
        {' '}
        <i className={`mdi mdi-square-edit-outline ${!signUpModal ? '' : 'd-lg-none'}`}></i>
      </Link>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
          <VistaCliente
            title={`DETALLES DEL CLIENTE`}
            items={items}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
const ConsultaCliente = (props) => {
  const {
    StatusColumn, sizePerPageList

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
    },{
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

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
                <Table
                columns={columns}
                data={''}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ConsultaCliente;
