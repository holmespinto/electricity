/* eslint-disable array-callback-return */
// @flow
import React, { useContext } from 'react';
import { Row, Col, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import { DashboardContext } from '../../../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import Table from '../../../../../components/Table';
import PermisoAlert from '../../../../../components/PermisoAlert/PermisoAlert';
const ActionColumnEmpleado = ({ row }) => {
  const {
    setItemsUpdate,open, setOpen, toggle  } = useContext(DashboardContext);

  const toggleUpUpdateEmpleado = (id) => {

    let menuNomina = localStorage.getItem('menuNomina');
    const itemsNomina = JSON.parse(menuNomina);

    const Empleado = itemsNomina?.data?.Empleado || [{}];
    const EmpleadoNomina = [];

    const Conceptos = itemsNomina?.data?.Conceptos || [{}];
    const TodasNomina = itemsNomina?.data?.TodasNomina || [{}];


    const nominaActiva = []

    if (id > 0)
      TodasNomina?.map((row, i) => {
        if (row.Estado === 'Procesando') {
          nominaActiva.push(row)
        }
      })
    const DatosEmpleado = []
    Empleado?.map((row, i) => {
      if (row.id === id) {
        DatosEmpleado.push(row)
      }
    })

    itemsNomina?.data?.EmpleadoNomina?.map((row, i) => {
      if (row?.Empleado === id && row?.IdNomina === nominaActiva[0]?.id) {
        EmpleadoNomina.push(row)
      }
    })

    const obj = {
      "data": {
        "Empleado": DatosEmpleado[0],
        "Nomina": nominaActiva[0],
        "EmpleadoNomina": EmpleadoNomina,
        "Conceptos": Conceptos,
        "isLoading": true,
      }
    }

    setItemsUpdate(obj)
    setOpen(open);
    toggle()
    //console.log('toggleUpUpdate',obj?.data)
  };

  return (
    <React.Fragment>
      <Link to="#" className="action-icon" data-bs-toggle="collapse" onClick={() => toggleUpUpdateEmpleado(row.cells[0].value)}>
        {' '}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
    </React.Fragment>
  );
};

const NominaEmpleado = (props) => {

  const datos = props?.datos || [{}];

  const permisos = props?.permisos || {};
  const {sizePerPageList, isLoading,open,
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
      Header: 'Nombres',
      accessor: 'Nombres',
      sort: true,
    }, {
      Header: 'Apellidos',
      accessor: 'Apellidos',
      sort: true,
    }, {
      Header: 'Cargo',
      accessor: 'Cargo',
      sort: false,
    }, {
      Header: 'Salario',
      accessor: 'Salario',
      sort: false,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumnEmpleado,
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Collapse in={open} appear>
                <div>
                  <Row>
                    <Col sm={12} >
                      <FormAdd EmpleadoId={1} />
                    </Col>
                  </Row>
                </div>
              </Collapse>

              {!isLoading && datos?.length > 0 && permisos?.query === 'S' ? (
                localStorage.setItem('menuNomina',JSON.stringify(props.itemsNomina)),
              <Table
                columns={columns}
                data={datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                isVisible={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
              />):<PermisoAlert />}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NominaEmpleado;
