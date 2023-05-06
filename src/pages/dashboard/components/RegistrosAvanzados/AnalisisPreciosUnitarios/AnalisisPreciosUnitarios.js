/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense, useEffect,useState } from 'react';
import { Row, Col, Card, Modal,Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnActions from '../../BtnActions';
import FormAdd from '../SubCapitulos/FormAdd';
import OptionsActions from './OptionsActions';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;


const ActionColumn = ({ row }) => {
  const {
    openActions, setActions,
     toggle, setItemsUpdate,
     itemsApu, PERMISOS_USER
  } = useContext(DashboardContext);



  const permisos = PERMISOS_USER || [{}];
  //itemsapuTransport, setApuTrasporte

  const SubCategorias = itemsApu?.data?.SubCategorias || [];

 const toggleActions = (id,opcion) => {

  let trans= itemsApu?.data?.Transportes?.filter((item) => {
    return item.IdApu === id;
  });
  const Productos = opcion==='TRANSPORTE'?trans:itemsApu?.data?.Productos;
    let array = [];
    let productos= Productos?.filter((item) => {
      return item.Producto === opcion;
    });
    if (id > 0)
    SubCategorias?.map((row, i) => {
      const obj ={
        id: row.id,
        IdApu: row.IdApu,
        Objetivo: row.Descripcion,
        Total: row.Cantidad,
        Codigo: row.Codigo,
        Unidad: row.Unidad,
        ValorUnitario: row.ValorUnitario,
        idCategoria: row.idCategoria,
        Opcion: opcion,
        Productos:productos,
      }
        if (row.id === id) {
          array.push(obj)
        }
      })



    toggle()
    setItemsUpdate(array[0])
    setActions(!openActions);
  };
  return (
    <React.Fragment>
      <Row>
        <Modal show={openActions} onHide={toggleActions} fullscreen={true} animation={true}>
          <Modal.Body>
            <OptionsActions />
          </Modal.Body>
        </Modal>
      </Row>
      <Row>
      <Pagination className="pagination-rounded mx-auto" size="sm">
       <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`EQUIPOS_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'EQUIPOS'}
            descripcion={'Registrar Equipos o Herramientas'}
            icon={'mdi mdi-account-hard-hat'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`MATERIALES_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'MATERIALES'}
            descripcion={'Registrar Materiales'}
            icon={'mdi mdi-alpha-m-circle'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`TRANSPORTE_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'TRANSPORTE'}
            descripcion={'Registrar Transporte'}
            icon={'mdi mdi-ambulance'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`MANOBRA_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'MANO DE OBRA'}
            descripcion={'Registrar Mano de Obras'}
            icon={'mdi mdi-allergy'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`IMAGEN_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'IMAGEN'}
            descripcion={'Subir una imagen'}
            icon={'mdi mdi-panorama'}
          />
        </Pagination.Item>
        <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`VISTA_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'VISTA'}
            descripcion={'Vista previa de la APU'}
            icon={'mdi mdi-eye-check'}
          />
        </Pagination.Item>

        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const AnalisisPreciosUnitarios = (props) => {

  const {
    validated, Spinners, itemsApu,setItemsAdd,
    toggle,setOpen,open,
    signUpModalAdd, setSignUpModalAdd, query,
    sizePerPageList, isLoading, PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];

  const Apus = itemsApu?.data?.SubCategorias || [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Descripcion',
      accessor: 'Descripcion',
      sort: true,
      with: 20,
    },
    {
      Header: '',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    }
  ];
  const toggleSignUp = () => {
    const TipoCategoria = itemsApu?.data?.Categorias || [{}];

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
    query('RegistrosAvanzados', 'Apu', [{ opcion: 'consultar', obj: 'Apu' }]);
  }, [query])

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
                        <Modal.Body><FormAdd
                          title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                          validated={validated}
                        />
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {!isLoading && Apus?.length > 0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={Apus}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={' Crear APU'}
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

export default AnalisisPreciosUnitarios;
