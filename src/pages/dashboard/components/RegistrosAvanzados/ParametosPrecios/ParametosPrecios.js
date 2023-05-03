/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense, useEffect } from 'react';
import { Row, Col, Card, Modal,Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnActions from '../../BtnActions';
import FormAdd from './FormAdd';
import OptionsActions from './OptionsActions';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;


const ActionColumn = ({ row }) => {

  const {
    openActions, setActions,
     toggle, setParametroPrecio,
     itemsParametroPrecio, PERMISOS_USER
  } = useContext(DashboardContext);

  const permisos = PERMISOS_USER || [{}];

 const toggleActions = (id,opcion) => {

  const Parametros = itemsParametroPrecio?.data?.ParametroPrecios;
  let param= Parametros?.filter((item) => {
    return item.id === id;
  });
let Array=[];
    if (id > 0)
    param?.map((row, i) => {
      const obj ={
        id: row.id,
        Parametro: row.Parametro,
        Valor: row.Valor,
        Opcion: opcion,
      }
        if (row.id === id) {
          Array.push(obj)
        }
      })

    setActions(!openActions);
    toggle()
    setParametroPrecio(Array[0])
  };
  return (
    <React.Fragment>
      <Row>
        <Modal show={openActions} onHide={toggleActions}>
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
            key={`ACTUALZAR_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'ACTUALZAR'}
            descripcion={'Actualizar Registro'}
            icon={'mdi mdi-square-edit-outline'}
          />
        </Pagination.Item>
       <Pagination.Item>
        <BtnActions
            permisos={permisos?.update}
            key={`ELIMINAR_${row.cells[0].value}`}
            toggleActions={toggleActions}
            row={row.cells[0].value}
            titulo={'ELIMINAR'}
            descripcion={'Eliminar Registro'}
            icon={'mdi mdi-delete'}
          />
        </Pagination.Item>

        </Pagination>
      </Row>
    </React.Fragment>
  );
};
const ParametosPrecios = (props) => {

  const {
    validated, Spinners,
    itemsParametroPrecios,
    setItemsAdd,
    toggle,setOpen,open,
    signUpModalAdd, setSignUpModalAdd, query,
    sizePerPageList, isLoading, PERMISOS_USER
  } = useContext(DashboardContext);
  const permisos = PERMISOS_USER || [{}];

  const ParametroPrecios = itemsParametroPrecios?.data?.ParametrosPrecios || [];

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Parametro',
      accessor: 'Parametro',
      sort: true,
      with: 20,
    },    {
      Header: 'Valor',
      accessor: 'valor',
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
    const TipoCategoria = itemsParametroPrecios?.data?.ParametrosPrecios || [{}];

    let Categoria = [];
    const obj ={
      value:'0',
      label:'Registrar como nueva Configuración'
    }
    if (TipoCategoria.length>0)
    Categoria.push(obj)
    TipoCategoria?.map((row, i) =>{
            const obj ={
              value:row.id,
              label:row.Parametro +'.-'+ row.Valor
            }
            Categoria.push(obj)
        })
      setItemsAdd(Categoria)
      toggle()
     setSignUpModalAdd(!signUpModalAdd);
     setOpen(open);

  };
  useEffect(() => {
    query('RegistrosAvanzados', 'ParametroPrecio', [{ opcion: 'consultar', obj: 'ParametroPrecio' }]);
  }, [query])
  console.log(ParametroPrecios)
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
              {!isLoading && ParametroPrecios?.length > 0 && permisos?.query === 'S' ? (<Table
                columns={columns}
                data={ParametroPrecios}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSearchable={true}
                nametable={props.accion}
                titulo={' Crear Configuración'}
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

export default ParametosPrecios;
