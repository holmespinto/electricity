/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card,  Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,
    setItemsUpdate,toggle,
    setOpen,itemsProductos,
    open, itemsmenuprincipal, PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const toggleSignUp = (id) => {
    let array = [];
    //console.log('itemsProductos',id)
    if(id>0)
    itemsProductos?.map((row, i) =>{
           if(row.id===id){
            const obj ={
              id:row.id,
              Nombre:row.Nombre,
              Unidad:row.Unidad,
              Cantidad:row.Cantidad,
              ValorUnitario:row.ValorUnitario,
              Producto:row.Producto
            }
            array.push(obj)
           }
        })
      setItemsUpdate(array[0])
      setOpen(open);
      toggle()

  };

  return (
    <React.Fragment>
      <Modal show={open} onHide={toggleSignUp}>
        <Modal.Body><FormUpdate
          title={`ACTUALIZAR ${itemsmenuprincipal?.toUpperCase()}`}
          validated={validated}
        />
        </Modal.Body>
      </Modal>
      {
        permisos?.update === 'S' ? (
          <Link to="#" className="action-icon" onClick={() => toggleSignUp(row.cells[0].value)}>
            {' '}
            <i className="mdi mdi-square-edit-outline"></i>
          </Link>) : ''
      }
      {
        permisos?.delete === 'S' ? (
          <Link to="#" className="action-icon" onClick={() => eliminar(row.cells[0].value)}>
            {' '}
            <i className="mdi mdi-delete"></i>
          </Link>) : ''}
    </React.Fragment>
  );
};
const Productos = (props) => {
  //const [registros, setRegistros] = useState();
  const {
    validated,itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd, query,Spinners,
    sizePerPageList, StatusColumn, PERMISOS_USER
  } = useContext(DashboardContext);

  const permisos = PERMISOS_USER || [{}];
  const datos = props?.datos || [{}];

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
      accessor: 'ValorUnitario',
      sort: true,
    }, {
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: true,
    }, {
      Header: 'Total',
      accessor: 'Total',
      sort: false,
    },{
      Header: 'Tipo',
      accessor: 'Producto',
      sort: false,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      Cell: StatusColumn,
    },
  ];
  const toggleSignUp = () => {
    setSignUpModalAdd(!signUpModalAdd);
  };

  useEffect(() => {
    {
     query('GestionesBasicas', 'Productos', [{ opcion: 'consultar', obj: 'Productos' }]);
    }
  }, [props.tipo, query])

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12} className={`${signUpModalAdd ? '' : 'd-lg-none'}`}>
                  <Card>
                    <Card.Body>
                      {/* Sign up Modal */}
                      <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
                        <Modal.Body>{
                          permisos?.add === 'S' ? (<FormAdd
                            title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                            validated={validated}
                          />) : ''}
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {datos?.length>0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isVisible={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={itemsmenuprincipal}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />) : <Suspense fallback={loading()}><Spinners /></Suspense>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Productos;
