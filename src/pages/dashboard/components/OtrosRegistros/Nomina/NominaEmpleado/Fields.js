import React from 'react';
import { Row, Col } from 'react-bootstrap';
//import Select from 'react-select';
import LiquidarNomina from '../LiquidarNomina/LiquidarNomina';

//, Collapse, Card
const Fields = (props) => {
  const listNomina = [props.listNomina] || [];

  /*
    const secondaryUser = estados.filter(item => item.value === props.items[0]?.Estado)
    console.log(secondaryUser[0]?.Descripcion)

  const [cart, setCart] = useState({
    items: [listNomina?.data?.DatosNomina],
    sub_total: 1071.29,
    shipping: 0,
    total: 1071.29,
  });
  /**
   * Update the shipping cost


  const updateShipping = (shippingCost) => {
    var localCart = { ...cart };
    localCart['shipping'] = shippingCost;
    localCart['total'] = localCart['sub_total'] + shippingCost;
    setCart(localCart);
  };

updateShipping()
 */
  console.log('fields-EmpleadoNomina', props)
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
                      <td className="text-end text-body fw-semibold">{props?.Nomina?.Codigo}</td><td className="text-end"></td><td className="text-end">Nombre:</td><td className="text-left">{props?.Empleado?.Nombres} {props?.Empleado?.Apellidos}</td><td>Cargo:</td><td className="text-left">{listNomina[0]?.data?.Empleado?.Cargo}</td>
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
          <LiquidarNomina
            EmpleadoNomina={props.EmpleadoNomina}
            Empleado={props?.Empleado}
            Nomina={props?.Nomina}
            Conceptos={props?.Conceptos}
            accion={'GenerarNomina'} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default Fields;
