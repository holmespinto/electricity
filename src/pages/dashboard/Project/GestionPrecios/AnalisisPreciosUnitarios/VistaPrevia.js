/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext} from 'react';
import { Row, Col,  } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Table from '../../../components/Table';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
// Create Document Component
const VistaPrevia  = (props) => {
  const {itemsUpdate,sizePerPageList} = useContext(DashboardContext);
  //console.log('VistaPrevia',itemsUpdate?.datos)
  const datos = itemsUpdate?.datos || [{}];
  console.log('VistaPrevia',itemsUpdate?.datos)
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Codigo',
      accessor: 'Codigo',
      sort: true,
    },
    {
      Header: 'Descripcion',
      accessor: 'Descripcion',
      sort: true,
    },
    {
      Header: 'Producto',
      accessor: 'Producto',
      sort: true,
    }, {
      Header: 'Total',
      accessor: 'Total',
      sort: true,
    }
    , {
      Header: 'Unidad',
      accessor: 'Unidad',
      sort: false,
    }, {
      Header: 'Valor',
      accessor: 'ValorUnitario',
      sort: false,
    },
  ];
  const toggleSignUp = () => {
    console.log('Toggle')
  };
return (

    <React.Fragment>
        <div className="text-left mt-2 mb-auto btn-info text-white mx-auto">
        <div className="row">
          <div className="col-md-auto ml-auto font-13 mt-2 mb-2"></div>
        </div>
      </div>
        <Row>
            <Col xl={12}>
            {datos?.length > 0 ?
              (<Table
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
                nametable={props.accion}
                titulo={''}
                permisos={'SI'}
                toggleSignUp={toggleSignUp}
                />) : <PermisoAlert />}
            </Col>
        </Row>
    </React.Fragment>
);
}
export default VistaPrevia;
