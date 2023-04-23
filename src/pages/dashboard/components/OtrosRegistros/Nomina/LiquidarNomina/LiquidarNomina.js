// @flow
import React, { useContext } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd'
import Table from '../../../../../../components/Table';
//const loading = () => <div className="text-center"></div>;

const ActionColumn = ({ row }) => {
  const {
    eliminar,
  } = useContext(DashboardContext);

  return (
    <React.Fragment>
      <Link to="#" className="action-icon" onClick={() => eliminar(row.cells[0].value)}>
        {' '}
        <i className="mdi mdi-delete"></i>
      </Link>
    </React.Fragment>
  );
};

const LiquidarNomina = (props) => {
  const DatosEmpleadoNomina = props?.EmpleadoNomina[0] || [{}];
  const DatosEmpleado = props?.Empleado || [{}];
  const {
    //validated,
    setSignUpModalLiqNomina, signUpModalLiqNomina,
  } = useContext(DashboardContext);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: false,
    }, {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: false,
    }, {
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: false,
    }, {
      Header: 'Devengado',
      accessor: 'Devengado',
      sort: false,
    }, {
      Header: 'Deducido',
      accessor: 'Deducido',
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

  const toggleUpNomina = () => {

    setSignUpModalLiqNomina(!signUpModalLiqNomina);

  };
  //console.log('listNomina', DatosEmpleado)
  return (
    <>
      <Row>
        <Col sm={12}>
          <Modal show={signUpModalLiqNomina} onHide={toggleUpNomina} size={'lg'}>
            <Modal.Body>
              {
                DatosEmpleado?.Identificacion >0 ?
                  <FormAdd
                    title={`GESTIONAR NOMINA`}
                    Empleado={props?.Empleado}
                    Nomina={props?.Nomina}
                    Conceptos={props?.Conceptos}
                    DatosEmpleadoNomina={DatosEmpleadoNomina}
                  /> : 'Seleccione el Empleado para liquidar la Nomina'
  }
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col sm={10}>
        </Col>
        <Col sm={2}>
          <div className="text-sm-end position-relative">
            <Button class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" onClick={toggleUpNomina}>
              <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><i className="mdi mdi-account-alert-outline"></i><span class="visually-hidden">unread messages</span></span>
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
        {
          <div className="text-left mt-2 mb-4 text-white mx-auto ">
            {DatosEmpleadoNomina?.length > 0 ? (<Table
              columns={columns}
              data={DatosEmpleadoNomina}
              isSortable={true}
              isSearchable={false}
              numtable={'1'}
              isVisible={false}
            />) : ('Esperando...')}
          </div>
            }
        </Col>
      </Row>
    </>
  );
};

export default LiquidarNomina;
