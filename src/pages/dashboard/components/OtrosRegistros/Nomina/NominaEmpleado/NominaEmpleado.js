// @flow
import React, { useContext,Suspense } from 'react';
import { Row, Col, Card,Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import Table from '../../../../../../components/Table';
const loading = () => <div className="text-center"></div>;

const ActionColumnEmpleado = ({ row }) => {
  const {
    setItemsUpdate, itemsNomina, openNominaEmpleado, setOpenNominaEmpleado, toggle
  } = useContext(DashboardContext);

  const toggleUpUpdateEmpleado = (id) => {
    const Empleado = itemsNomina?.data?.Empleado || [{}];
    const EmpleadoNomina =  [];
    //const Nomina = itemsNomina?.data?.Nomina || [{}];
    const Conceptos = itemsNomina?.data?.Conceptos || [{}];
    const TodasNomina = itemsNomina?.data?.TodasNomina || [{}];

    const nominaActiva=[]
    // eslint-disable-next-line array-callback-return
    TodasNomina?.map((row, i) => {
      if (row.Estado === 'Procesando') {
        nominaActiva.push(row)
      }
    })

    // eslint-disable-next-line array-callback-return
    Empleado?.map((row, i) => {
      if (row.id === id) {
        Empleado.push(row)
      }
    })
    // eslint-disable-next-line array-callback-return
    itemsNomina?.data?.EmpleadoNomina?.map((row, i) => {
      //console.log('row',row)
      if (row?.Empleado === id && row?.IdNomina===nominaActiva[0]?.id) {
        EmpleadoNomina.push(row)
      }
    })
    const obj={
      "data": {
        "Empleado":Empleado[0],
        "Nomina": nominaActiva[0],
        "EmpleadoNomina":EmpleadoNomina,
        "Conceptos":Conceptos,
        "isLoading":true,
      }}

    setItemsUpdate(obj)
    setOpenNominaEmpleado(!openNominaEmpleado);
    toggle()
    //console.log('toggleUpUpdate',obj?.data)
  };

  return (
    <React.Fragment>
      <Link to="#" className="action-icon" data-bs-toggle="collapse"onClick={() => toggleUpUpdateEmpleado(row.cells[0].value)}>
        {' '}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
    </React.Fragment>
  );
};

const NominaEmpleado = (props) => {

  const {
    sizePerPageList, isLoading,itemsNomina,ItemsUpdate,
    openNominaEmpleado
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
  //console.log('open',open,ItemsUpdate)
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Collapse in={openNominaEmpleado} appear>
            <div>
              <Row>
                <Col sm={12} >
                  <FormAdd EmpleadoId={ItemsUpdate}/>
                </Col>
              </Row>
              </div>
                </Collapse>

              {!isLoading && itemsNomina?.data?.Empleado?.length>0? (<Table
                columns={columns}
                data={itemsNomina?.data?.Empleado}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />) : <Suspense fallback={loading()}>Esperando...</Suspense>}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NominaEmpleado;
