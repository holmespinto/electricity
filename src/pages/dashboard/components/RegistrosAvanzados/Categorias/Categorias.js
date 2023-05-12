/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
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
    setSignUpModalAdd,
    signUpModalAdd,
    setItemsUpdate,toggle,
    setOpen,itemsCategorias,
    open, itemsmenuprincipal, PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const Categorias = itemsCategorias?.data?.Categorias || [{}];
  const TipoCategoria = itemsCategorias?.data?.TipoCategoria|| [{}];

  const toggleSignUp = (id) => {
    let array = [];

    if(id>0)
    Categorias?.map((row, i) =>{
           if(row.id===id){
            const obj ={
              id:row.id,
              Nombre:row.Categoria,
              IdTipoCategoria:row.TipoCategoria,
              TipoCategorias:TipoCategoria
            }
            array.push(obj)
           }
        })
      setItemsUpdate(array[0])
      setOpen(open);
      setSignUpModalAdd(signUpModalAdd);
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
const Categorias = (props) => {
  //const [registros, setRegistros] = useState();
  const {
    validated,itemsmenuprincipal,itemsCategorias,setItemsAdd,toggle,
    signUpModalAdd, setSignUpModalAdd, query,Spinners,setOpen,open,
    sizePerPageList, StatusColumn, PERMISOS_USER
  } = useContext(DashboardContext);

  const permisos = PERMISOS_USER || [{}];
  const datos = itemsCategorias?.data?.Categorias || [];

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
      Header: 'Categoria',
      accessor: 'Categoria',
      sort: true,
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

    const TipoCategoria = itemsCategorias?.data?.TipoCategoria|| [{}];
    let Categoria = [];
    const obj ={
      value:'0',
      label:'Registrar como nueva Categoria'
    }
    if (TipoCategoria.length>0)
    Categoria.push(obj)
    TipoCategoria?.map((row, i) =>{
            const obj ={
              value:row.id,
              label:row.Categoria
            }
            Categoria.push(obj)
        })
      setItemsAdd(Categoria)
      toggle()
     setSignUpModalAdd(!signUpModalAdd);
     setOpen(open);
  };

  useEffect(() => {
    {
      query('RegistrosAvanzados','Categorias',[{opcion:'consultar',obj:'Categorias'}]);
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
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                isVisible={true}
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

export default Categorias;
