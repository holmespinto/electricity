// @flow
import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import VistaMaterial from './VistaMaterial';
import Table from '../../../../components/Table';



const ActionColumn = ({ row }) => {
  const INIT_MATERIAL = {
    id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
    Nombre: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Unidad: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
    Valor: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
    Descripcion: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
    status: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
  };
  const [signUpModal, setSignUpModal] = useState(false);
  const [items, setItems] = useState(INIT_MATERIAL);

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
          <VistaMaterial
            title={`Detalles de la consulta`}
            items={items}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
const ConsultaMaterial = (props) => {
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
      accessor: 'Valor',
      sort: true,
    }, {
      Header: 'Descripción',
      accessor: 'Descripcion',
      sort: false,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
     Cell:StatusColumn,
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

export default ConsultaMaterial;
