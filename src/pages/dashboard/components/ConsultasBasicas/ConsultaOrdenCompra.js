// @flow
import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { GestionBasicaContext } from '../../../../layouts/context/GestionBasicaContext';
import VistaOrdenCompra from './VistaOrdenCompra';
import Table from '../../../../components/Table';



const ActionColumn = ({ row }) => {
  const INIT_ORDEN = {
    id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
    Empresa: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Fecha: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
    status: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
  };
  const [signUpModal, setSignUpModal] = useState(false);
  const [items, setItems] = useState(INIT_ORDEN);

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
          <VistaOrdenCompra
            title={`Detalles de la consulta`}
            items={items}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
const ConsultaOrdenCompra = (props) => {

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
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
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      //Cell:// StatusColumn,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];
/*
  useEffect(() => {
    onConsulta();
  }, [consultdata, onConsulta]);
*/
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
                sizePerPageList={''}
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

export default ConsultaOrdenCompra;
