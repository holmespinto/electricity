import React,{Suspense } from 'react';
import { Row, Col } from 'react-bootstrap';
import LiquidarNomina from '../LiquidarNomina/LiquidarNomina';
const loading = () => <div className="text-center"></div>;

const Fields = (props) => {
  const DatosEmpleadoNomina = [props.EmpleadoNomina] || [];
  const isLoading = props.loading;

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <div className="border p-3 mt-4 mt-lg-0 rounded bg-primary">
            <div className="table-responsive">
              <table className="table table-centered mb-0 table-sm">
                <tbody>
                  <>
                    <tr>
                      <td>
                        <p className="m-0 d-inline-block align-middle text-body fw-semibold">
                          Comprobante Número:
                        </p>
                      </td>
                      <td className="text-end text-body fw-semibold">{props?.Nomina?.Codigo}</td><td className="text-end"></td><td className="text-end">Nombre:</td><td className="text-left">{props?.Empleado?.Nombres} {props?.Empleado?.Apellidos}</td><td>Cargo:</td><td className="text-left">{props?.Empleado?.Cargo}</td>
                    </tr><tr>
                      <td>
                        <p className="m-0 d-inline-block align-middle text-body fw-semibold">
                          Periodo de Pago:
                        </p>
                      </td>
                      <td className="text-end">{props?.Nomina?.FechaInicial} - {props?.Nomina?.FechaFinal}</td><td className="text-end"></td><td className="text-end">Identificación:</td><td className="text-left">{props?.Empleado?.Identificacion}</td><td>Salario básico:</td><td className="text-left">{props?.Empleado?.Salario}</td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
        {!isLoading && DatosEmpleadoNomina?.length>0? (
          <LiquidarNomina
            EmpleadoNomina={DatosEmpleadoNomina}
            Empleado={props?.Empleado}
            Nomina={props?.Nomina}
            Conceptos={props?.Conceptos}
            accion={'GenerarNomina'} />
            ) :<Suspense fallback={loading()}>Esperando...</Suspense>}
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default Fields;
