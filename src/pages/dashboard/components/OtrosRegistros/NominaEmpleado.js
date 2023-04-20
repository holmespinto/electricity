// @flow
import React, { useEffect, useContext, useState,useCallback } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
//import { GestionBasicaContext } from '../../../../layouts/context/GestionBasicaContext';
//import AddItems from './AddItems';
import NominaFormIngresoEgreso from './NominaFormIngresoEgreso';
import Table from '../../../../components/Table';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();


const ActionColumn = ({ row }) => {
  const INIT_MATERIAL = {
    id: row.cells[0].value ? row.cells[0].value : row.cells[0].value,
    Identificacion: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Nombres: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
    Apeillidos: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
    Salario: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
    status: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
  };

  const [signUpModalIngreso, setSignUpModalIngeso] = useState(false);
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState(INIT_MATERIAL);

  const toggleIngreso = () => {
    setSignUpModalIngeso(!signUpModalIngreso);

  };


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
    toggleIngreso(false);
    setItems([]);
  };
console.log(items)
  return (
    <React.Fragment>
      <Link to="#" className={`action-icon`} onClick={() => toggleIngreso()}>
        {' '}
        <i className={`mdi mdi-square-edit-outline`}></i>
      </Link>
      <Modal show={signUpModalIngreso} onHide={toggleIngreso} size={'lg'} >
        <Modal.Body>
        <NominaFormIngresoEgreso
          title={`ACTUALIZAR`}
          setItems={setItems}
          items={items}
          Close={Close}
          validated={validated}
          accion={update}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
const NominaEmpleado = (props) => {
/*
  const {
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
      Header: 'Identificacion',
      accessor: 'Identificacion',
      sort: true,
    },
    {
      Header: 'Nombres',
      accessor: 'Nombre',
      sort: true,
    }, {
      Header: 'Apellidos',
      accessor: 'PrimerApellido',
      sort: true,
    },{
      Header: 'Cargo',
      accessor: 'Cargo',
      sort: false,
    },{
      Header: 'Salario',
      accessor: 'Salario',
      sort: false,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      //Cell: //StatusColumn,
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

export default NominaEmpleado;
