// @flow
import React, { useContext,Suspense,useEffect} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {
  const {
    validated,setOpen,open,toggle,setItemsUpdate,itemsNomina,eliminar,
    itemsmenuprincipal,
    itemUrl
  } = useContext(DashboardContext);
  const DatosTodasNomina = itemsNomina?.data?.TodasNomina || [{}];
  const EstadosNomina = itemsNomina?.data?.EstadosNomina || [{}];

  const toggleUpUpdate = (id) => {
  let array = [];

  // eslint-disable-next-line array-callback-return
  DatosTodasNomina?.map((row, i) =>{
         if(row.id===id){
          array.push(row)
         }
      })

    const obj={
      "data": {
        "Nomina":array[0],
        "Estados": EstadosNomina,
        "isLoading":true,
      }}

    setOpen(open);
    toggle()
    setItemsUpdate(obj)
  };

  return (
    <React.Fragment>
      <Modal show={open} onHide={toggleUpUpdate}>
        <Modal.Body><FormUpdate
                    title={`ACTUALIZAR`}
                    validated={validated}
                    tipo={itemsmenuprincipal}
                    accion={itemUrl}
                  />
        </Modal.Body>
      </Modal>
            <Link to="#" className="action-icon" onClick={() => toggleUpUpdate(row.cells[0].value)}>
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
const ConfigNomina = (props) => {
  const {
    validated,
    setOpen,open,
    setItems,sizePerPageList,isLoading,itemsNomina,query
  } = useContext(DashboardContext);

  const DatosTodasNomina = itemsNomina.data?.TodasNomina || [{}];


  const columns = [
    {
      Header: 'No',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Codigo',
      accessor: 'Codigo',
      sort: true,
    }, {
      Header: 'FechaInicial',
      accessor: 'FechaInicial',
      sort: true,
    }, {
      Header: 'FechaFinal',
      accessor: 'FechaFinal',
      sort: true,
    }
    ,{
      Header: 'Total',
      accessor: 'Total',
      sort: false,
    },{
      Header: 'Estado',
      accessor: 'Estado',
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
  const toggleSignUp = () => {

    setOpen(!open)
    setItems([{
      id: 1,
      Codigo: '',
      Empresa: '',
      FechaInicial: '',
      FechaFinal:'',
      Comprobante:'',
      Total:'',
      Estado:'',
      status:'',
    }])
 };
 useEffect(() => {
  query('OtrosRegistros','GenerarNomina',[{opcion:'consultar',obj:'GenerarNomina'}]);
}, [query]);
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12} >
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={open} onHide={toggleSignUp}>
                        <Modal.Body><FormAdd
                          title={`GESTIONAR NOMINA`}
                          validated={validated}
                          tipo={props.tipo}
                          accion={props.accion}
                        />
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
              {!isLoading && DatosTodasNomina.length>0?(<Table
                columns={columns}
                data={DatosTodasNomina}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
              />):<Suspense fallback={loading()}>Esperando...</Suspense>}
            </Card.Body>
          </Card>
        </Col>
       </Row>
    </>
  );
};

export default ConfigNomina;
