// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VistaControlDiario from './VistaControlDiario';
import Table from '../../../../components/Table';



const ActionColumn = ({ row }) => {
  const INIT_CONSTROL = {
    id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
    Ciudad: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Concepto: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
    Fecha: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
    status: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
  };
  const [signUpModal, setSignUpModal] = useState(false);
  const [items, setItems] = useState(INIT_CONSTROL);

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
          <VistaControlDiario
            title={`Detalles de la consulta`}
            items={items}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
const ConsultaControlDiario = (props) => {



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
    },{
      Header: 'Ciudad',
      accessor: 'Ciudad',
      sort: true,
    }, {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: false,
    }, {
      Header: 'Fecha',
      accessor: 'Fecha',
      sort: false,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
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
                data={consultdata}
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

export default ConsultaControlDiario;
