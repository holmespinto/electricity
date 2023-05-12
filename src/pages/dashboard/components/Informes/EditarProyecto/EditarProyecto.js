/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card, Pagination, Modal, Dropdown,Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
//import classNames from 'classnames';
import Table from '../../../components/Table';
//import BtnActions from '../../../components/BtnActions';
import FormUpdate from './FormUpdate';
//dummy data
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {

   const {
      eliminar,
      validated,
      idCategoria,
      setSignUpModalAdd,
      signUpModalAdd,
      setItemsUpdate,toggle,
      setOpen,setLoading,
      open, itemsmenuprincipal
    } = useContext(DashboardContext);

    //const permisos = PERMISOS_USER || [{}];
    //const SubCategorias = itemsSubCategorias?.data?.SubCategorias|| [{}];

    const toggleSignUp = (id) => {
      let array = [];
      const obj=[{
        id: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
        Descripcion: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        Unidad: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        Cantidad: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
        ValorUnitario: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
        Producto: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
      }]

      let productos= obj?.filter((item) => {
        return item.id === row.cells[1].value;
      });

      if(id>0)
        array.push(productos)
        setItemsUpdate(array[0])
        setOpen(open);
        setLoading(open);
        setSignUpModalAdd(signUpModalAdd);
        toggle()
        console.log('SubCategorias',array[0])
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
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>

          <Link to={`dashboard/Informes/EditarProyecto?p=${idCategoria}`} key={`edit-${row.cells[1].value}`} className="action-icon" onMouseMove={() => toggleSignUp(row.cells[1].value)}>
            {' '}
            <i className="mdi mdi-square-edit-outline"></i>
          </Link>
          </Pagination.Item>
          <Pagination.Item>
          <Link to={`dashboard/Informes/EditarProyecto?p=${idCategoria}`} key={`delete-${row.cells[1].value}`} className="action-icon" onClick={() => eliminar(row.cells[1].value)}>
            {' '}
            <i className="mdi mdi-delete"></i>
          </Link>
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};

const columns = [
  {
    Header: 'id',
    accessor: 'id',
    sort: false
  },
  {
    Header: 'Descripcion',
    accessor: 'Descripcion',
    sort: false,
  },
  {
    Header: 'Unidad',
    accessor: 'Unidad',
    sort: false,
  },
  {
    Header: 'Cantidad',
    accessor: 'Cantidad',
    sort: false,
  }, {
    Header: 'ValorUnitario',
    accessor: 'ValorUnitario',
    sort: false,
  }, {
    Header: 'Producto',
    accessor: 'Producto',
    sort: false,
  },{
    Header: 'Action',
    accessor: 'action',
    sort: false,
    classes: 'table-action',
    Cell: ActionColumn,
  },
];

const EditarProyecto = (props) => {
  const {
    Spinners,
    query,
    isLoading, PERMISOS_USER,
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const proyectos = [props?.datos[0]?.data?.DatosProyect] || []
  const Apus = props?.datos[0]?.data?.Apus || [{}]
  // const productos = [props?.datos[0]?.data?.Productos] || [{}]
  //const idProyecto = [props?.datos[0]?.data?.idProyecto] || 0


  const sizePerPageList = [
    {
      text: '25',
      value: 25,
    },
    {
      text: '30',
      value: 30,
    },
    {
      text: '45',
      value: 45,
    },
    {
      text: 'All',
      value: Apus.length,
    },
  ];
  useEffect(() => {
    query('Informes', 'EditarProyecto', [{ opcion: 'consultar', obj: 'EditarProyecto' }]);
  }, [])
  //console.log('Apus', Apus)

  const BasicTable = (props) => {
    //console.log('BasicTable', props)
    return (
      <>
        {props?.data?.Nombre?.length > 0 ?
          <Card>
            <Card.Body>
              <div className="p-1 text-sm-end">
                <span className="btn btn-info mb-0 me-5 p-2">
                  <i className="mdi mdi-tray-plus"></i>{props?.data?.Nombre}</span>
              </div>
            </Card.Body>
          </Card> : ''}
      </>)
  };
  return (
    <>
          <Row className="justify-content-left">
                        <Col lg={7} md={10} sm={11}>
                            <div className="horizontal-steps mt-2 mb-2 pb-2">
                                <div className="horizontal-steps-content">
                                    <div className="step-item current">
                                    <Link to={`/dashboard/Informes/asignarApu?p=${props?.idProyecto}`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                                        <span
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Adjuntar APU"
                                            data-original-title="20/08/2018 07:24 PM">
                                              APU
                                        </span>
                                        </Link>
                                    </div>
                                    <div className="step-item">
                                    <Link to={`/dashboard/Informes/EditarProyecto?p=${props?.idProyecto}`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                                        <span
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title=""
                                            data-original-title="21/08/2018 11:32 AM">

                                        </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="process-line" style={{ width: '33%' }}></div>
                            </div>
                        </Col>
                    </Row>
      <Row>
        <Col xl={12}>
          <BasicTable data={proyectos[0]} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {!isLoading && Apus?.length > 0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={Apus}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isExpandable={true}
                isSelectable={false}
              />) : <Suspense fallback={loading()}><Spinners /></Suspense>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditarProyecto;
