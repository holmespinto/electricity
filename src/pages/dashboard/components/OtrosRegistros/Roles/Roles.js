// @flow
import React, { useContext, Suspense,useEffect} from 'react';
import { Row, Col, Card,  Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {

  const {
    validated,setOpen,open,toggle,setItemsUpdate,itemsRoles
  } = useContext(DashboardContext);

  const toggleUpUpdate = (id) => {
  let array = [];


  if(id>0)
   // eslint-disable-next-line array-callback-return
  itemsRoles.dataRoles?.roles?.map((row, i) =>{
         if(row.id===id){
          array.push(row)
         }
      })
      //console.log('ActionColumn',array[0])

    setOpen(open);
    toggle()

    setItemsUpdate(array[0])
  };

//console.log('signUpUpdate',signUpUpdate)
  return (
    <React.Fragment>
      <Modal show={open} onHide={toggleUpUpdate} size={'lg'}>
        <Modal.Body>
          <FormUpdate
          title={`ACTUALIZAR DATOS DEL USUARIOS`}
          validated={validated}
        />
        </Modal.Body>
      </Modal>
      <Link to="#" className="action-icon" onClick={() => toggleUpUpdate(row.cells[0].value)}>
        {' '}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
    </React.Fragment>
  );
};
const Roles = (props) => {


  const {
    sizePerPageList, isLoading,query
  } = useContext(DashboardContext);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Menu',
      accessor: 'menu',
      sort: true,
    },
    {
      Header: 'Submenu',
      accessor: 'submenu',
      sort: true,
    }
    , {
      Header: 'rol',
      accessor: 'rol',
      sort: false,
    }, {
      Header: 'query',
      accessor: 'c',
      sort: false,
    }, {
      Header: 'add',
      accessor: 'a',
      sort: false,
    }, {
      Header: 'update',
      accessor: 'u',
      sort: false,
    }, {
      Header: 'delete',
      accessor: 'd',
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

  useEffect(() => {
    query('OtrosRegistros','Roles',[{opcion:'consultar',obj:'Roles'}]);
  }, [query])

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {!isLoading && props?.datos?.dataRoles?.roles?.length>1? (<Table
                columns={columns}
                data={props?.datos?.dataRoles?.roles}
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

export default Roles;
