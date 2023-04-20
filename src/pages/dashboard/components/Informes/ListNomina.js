// @flow
import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Card,  Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Swal from 'sweetalert2'
//import { GestionBasicaContext } from '../../../../layouts/context/GestionBasicaContext';
import VistaNomina from './VistaNomina';
import Table from '../../../../components/Table';
//import { APICore } from '../../../../helpers/api/apiCore';
//const api = new APICore();


const ActionColumn = ({ row }) => {
  const INIT_NOMINA = {
    id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
    Codigo: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Nombre: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    FechaInicial: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
    FechaFinal: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
    Valor: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
    status: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
  };
  const [signUpModal, setSignUpModal] = useState(false);
  //const [validated, setValidated] = useState(false);
  const [items, setItems] = useState(INIT_NOMINA);

  const toggleSignUp = () => {
    setSignUpModal(!signUpModal);
  };

/*
  const update = useCallback((event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validated) {
      let response;
      if (items) {
        var queryString = items
          ? Object.keys(items)
            .map((key) => key + '=' + items[key])
            .join('&')
          : '';
      }
      response = queryString;
      let itemsmenus = JSON.parse(sessionStorage.getItem('ITEM_SELECT'))
      if (itemsmenus?.memorizer.length > 0) {
        const url = `accion=${itemsmenus.menu}&opcion=update&${response}&tipo=${itemsmenus.memorizer}`;
        const respuesta = api.sendRequestData(`${url}`);
        respuesta.then(function (resp) {
          if (resp) {
            Swal.fire('' + resp[0].menssage + '');
          }
        });
      }

    }
  }, [items, validated]);

  const Close = (e) => {
    e.preventDefault();
    setSignUpModal(false);
    setItems([]);
  };
*/

  return (
    <React.Fragment>
      <Link to="#" className={`action-icon`} onClick={() => toggleSignUp()}>
        {' '}
        <i className={`mdi mdi-square-edit-outline ${!signUpModal ? '' : 'd-lg-none'}`}></i>
      </Link>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <Modal.Body>
        <VistaNomina
        title={'Cunsulta Nomina'}
        items={items}/>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
const ListNomina = (props) => {
/*
  const {
   // signUpModal,
   // toggleSignUp,
   // Close,
     onConsulta, consultdata,
    sizePerPageList, StatusColumn

  } = useContext(GestionBasicaContext);
*/
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Código',
      accessor: 'Codigo',
      sort: true,
    },
    {
      Header: 'Nombre',
      accessor: 'Nombre',
      sort: true,
    }, {
      Header: 'Fecha Inicial',
      accessor: 'FechaInicial',
      sort: true,
    }, {
      Header: 'Fecha Final',
      accessor: 'FechaFinal',
      sort: true,
    }
    ,{
      Header: 'Valor',
      accessor: 'Valor',
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

  useEffect(() => {
    onConsulta();
  }, [consultdata, onConsulta]);
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

export default ListNomina;
