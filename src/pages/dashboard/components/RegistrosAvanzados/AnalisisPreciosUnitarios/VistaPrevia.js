/* eslint-disable array-callback-return */
import React, { useContext} from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

function sumarArray(array) {
  let suma = 0;
  for (let i = 0; i < array.length; i++) {
    suma += array[i];
  }
  return suma;
}
function convertirACifraDecimal(numero) {
  const cifraDecimal = numero.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return cifraDecimal;
}

const DataTable = (props) => {

  let Datos= props?.Productos?.filter((item) => {
    return item.IdApu=== props?.itemsUpdate?.id && item.Producto===props?.tipo;
  });

  const totales = []
  Datos?.map((row, i) => {
    totales.push(Number(row.Total))
    })
    const resultado = sumarArray(totales);
  return (
    <>     <div className="text-left mt-4 mb-4 btn-primary text-white mx-auto">
        <div class="row">
          <div class="col-sm-2 ml-auto font-13 text-left btn-success"><p class="h5">{props?.tipo}</p></div>
          <div class="col-sm-8 ml-auto font-13 text-left btn-success"><p class="h5">{''}</p></div>
          <div class="col-sm-2 ml-auto font-13 text-right btn-success"><p class="h5"></p></div>
        </div>
  </div>
<Table class="table table-striped font-11">
        <thead class="thead-light">
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Unidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Datos?.map((record, index) => {
            return (
              <tr key={index}>
                <td>{record.Codigo}</td>
                <td>{record.Nombre}</td>
                <td>{record.Unidad}</td>
                <td>{record.ValorUnitario}</td>
                <td>{record.Total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="mt-2 mb-2  text-white mx-auto">
        <div class="row">
          <div class="col-sm-2 ml-auto font-13 mt-2 text-left btn-secondary"><p class="h5">{'SUB TOTAL'}</p></div>
          <div class="col-sm-8 ml-auto font-13 mt-2 text-left btn-secondary"><p class="h5">{''}</p></div>
          <div class="col-sm-2 ml-auto font-13 mt-2 text-right btn-secondary"><p class="h5">$ {convertirACifraDecimal(Number(resultado))}</p></div>
        </div>
      </div>
      </>
  );
};
const DataTotales= (props) => {

  let Datos= props?.Productos?.filter((item) => {
    return item.IdApu=== props?.itemsUpdate?.id;
  });

  const totales = []
  Datos?.map((row, i) => {
    totales.push(Number(row.Total))
    })
    const resultado = sumarArray(totales);
  return (
    <>
     <div className="text-left mt-2 mb-4 text-white mx-auto">
          <div class="row">
          <div class="col-sm-2 ml-auto font-13 mt-2 text-left btn-dark"><p class="h4">{'TOTAL COSTO DIRECTO'}</p></div>
          <div class="col-sm-8 ml-auto font-13 mt-2 text-left btn-dark"><p class="h4">{''}</p></div>
          <div class="col-sm-2 ml-auto font-13 mt-2 text-right btn-dark"><p class="h4">$ {convertirACifraDecimal(Number(resultado))}</p></div>
        </div>
      </div></>
  );
};
// Create Document Component
const VistaPrevia  = (props) => {
  const {itemsUpdate,itemsApu} = useContext(DashboardContext);
  const Productos = itemsApu?.data?.ProductosApu || [];
return (

    <React.Fragment>
        <div className="text-left mt-2 mb-auto btn-info text-white mx-auto">
        <div class="row">
          <div class="col-md-auto ml-auto font-13 mt-2 mb-2">{props?.NombreApu}</div>
        </div>
      </div>
        <Row>
            <Col xl={12}>
                <DataTable itemsUpdate={itemsUpdate} Productos={Productos} tipo={"EQUIPOS"}/>
            </Col>
        </Row>
        <Row>
            <Col xl={12}>
                <DataTable itemsUpdate={itemsUpdate} Productos={Productos} tipo={"MATERIALES"}/>
            </Col>
        </Row>
        <Row>
            <Col xl={12}>
                <DataTable itemsUpdate={itemsUpdate} Productos={Productos} tipo={"TRANSPORTE"}/>
            </Col>
        </Row>
        <Row>
            <Col xl={12}>
                <DataTable itemsUpdate={itemsUpdate} Productos={Productos} tipo={"MANO DE OBRA"}/>
            </Col>
        </Row>
        <Row>
            <Col xl={12}>
                <DataTotales itemsUpdate={itemsUpdate} Productos={Productos}/>
            </Col>
        </Row>
    </React.Fragment>
);
}
export default VistaPrevia;
