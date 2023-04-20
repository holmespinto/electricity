import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import FormEmpleado from './FormEmpleado';
import FormControlDiario from './FormControlDiario';
import FormOrdenCompra from './FormOrdenCompra';
import FormNomina from './FormNomina';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();

const AddItems = (props) => {
  const INIT_RESPONSE = {
    id: 1,
    Nombre: '',
    Unidad: '',
    Valor: '',
    Descripcion: '',
    status: 'Activated',
  };
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState(INIT_RESPONSE);

  const add = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validated) {
      let response;
      if (items) {
        var queryString = items
          ? Object.keys(items)
            .map((key) => key + '=' + items[key])
            .join('&')
          : '';
      }
      response = queryString;
      const url = `accion=${props.accion}&opcion=add&${response}$tipo=${props.tipo}`;
      const respuesta = api.sendRequestData(`${url}`);
      respuesta.then(function (resp) {
        if (resp) {
          Swal.fire('' + resp[0].menssage + '');
        }
      });
    }
  };
  return (
    <Card>
      <Card.Body>
        {/* Sign up Modal */}
        <Modal show={props.signUpModal} onHide={props.toggleSignUp}>
          <Modal.Body>
            {(() => {
              switch (props.tipo) {
                case "RegistrarEmpleado":
                  return (<><FormEmpleado
                    title={`GESTIONAR ${props.tipo?.toUpperCase()}`}
                    signUpModal={props.signUpModal}
                    setItems={setItems}
                    items={items}
                    Close={props.Close}
                    toggleSignUp={props.toggleSignUp}
                    validated={validated}
                    accion={add}
                  /></>);
                  case "ControlDiario":
                  return (<><FormControlDiario
                    title={`GESTIONAR EGRESO`}
                    signUpModal={props.signUpModal}
                    setItems={setItems}
                    items={items}
                    Close={props.Close}
                    toggleSignUp={props.toggleSignUp}
                    validated={validated}
                    accion={add}
                  /></>);
                  case "OrdenCompra":
                  return (<><FormOrdenCompra
                    title={`GESTIONAR ORDEN DE COMPRA`}
                    signUpModal={props.signUpModal}
                    setItems={setItems}
                    items={items}
                    Close={props.Close}
                    toggleSignUp={props.toggleSignUp}
                    validated={validated}
                    accion={add}
                  /></>);
                  case "Nomina":
                  return (<><FormNomina
                    title={`GENERAR NOMINA`}
                    signUpModal={props.signUpModal}
                    setItems={setItems}
                    items={items}
                    Close={props.Close}
                    toggleSignUp={props.toggleSignUp}
                    validated={validated}
                    accion={add}
                  /></>);
                default:
                  return (
                    <>{''}</>
                  );
              }
            })()}
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};
export default AddItems;
