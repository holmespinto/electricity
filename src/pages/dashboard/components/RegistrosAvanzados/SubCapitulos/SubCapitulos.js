/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
import React, { useContext,Suspense, useEffect } from 'react';
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
    setOpen,itemsSubCategorias,
    open, itemsmenuprincipal, PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];
  const Categorias = itemsSubCategorias?.data?.Categoria || [{}];
  const SubCategorias = itemsSubCategorias?.data?.SubCategorias|| [{}];

  const toggleSignUp = (id) => {
    let array = [];

    if(id>0)
    SubCategorias?.map((row, i) =>{
           if(row.id===id){
            const obj ={
              id: row.id,
              idCategoria: row.id,
              Codigo: row.Codigo,
              Descripcion:row.Descripcion,
              Unidad: row.Unidad,
              Cantidad: row.Cantidad,
              ValorUnitario: row.ValorUnitario,
              TipoCategoria:Categorias
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

const SubCapitulos = (props) => {
  const {
    validated,itemsSubCategorias,setItemsAdd,toggle,signUpModalAdd, setSignUpModalAdd,Spinners,setOpen,open,
    sizePerPageList,PERMISOS_USER,
     query
  } = useContext(DashboardContext);

  const permisos = PERMISOS_USER || [{}];
  const datos = itemsSubCategorias?.data?.SubCategorias || [];

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
      Header: 'Descripcion',
      accessor: 'Descripcion',
      sort: true,
    },{
      Header: 'Unidad',
      accessor: 'Unidad',
      sort: true,
    },{
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: true,
    },{
      Header: 'Valor Unitario',
      accessor: 'ValorUnitario',
      sort: true,
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

    const TipoCategoria = itemsSubCategorias?.data?.Categoria|| [{}];
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
              label:row.Codigo +'.-'+ row.Categoria
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
      query('RegistrosAvanzados','SubCategorias',[{opcion:'consultar',obj:'SubCategorias'}]);
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
              { /*datos?.length>0 && permisos?.query === 'S'*/ datos?.length>0? (<Table
                columns={columns}
                data={datos}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={' Registrar SubCapitulo'}
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

export default SubCapitulos;
