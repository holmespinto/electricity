import React, { useState } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
// components
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import Swal from 'sweetalert2'
import classNames from 'classnames';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();


const GuardarUsuarios = (props) => {
  const [validated, setValidated] = useState(false);
  const [temas, setTemas] = useState([]);

  const guardar = (event) => {
    let CryptoJS = require('crypto-js');
    var pass = CryptoJS.AES.encrypt(temas?.password, 'key instrumentacion 123').toString();
    let resp ='';
    //const toke =api.generateToken(temas?.username,temas?.username,temas?.id)
    const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }
      setValidated(true);
      if (validated) {
          let response={...temas,clave:pass};
          if (response) {
              var queryString = response
                  ? Object.keys(response)
                        .map((key) => key + '=' + response[key])
                        .join('&')
                  : '';
          }
          resp = queryString;

          const url = `accion=usuarios&opcion=guardar&${resp}`;
          const respuesta = api.getDatos(`${url}`);
          respuesta.then(function (resp) {
              if (resp) {
                Swal.fire('' + resp[0].menssage + '');
              }
          });
      }
  };
  const { t } = useTranslation();
  const schemaResolver = yupResolver(
    yup.object().shape({
        username: yup.string().required(t('Please enter Fullname')),
        password: yup.string().required(t('Please enter Password')),
        nombres: yup.string().required('Please enter Nombres').email('Please enter valid Nombres'),
        apellidos: yup.string().required('Please enter apellidos').email('Please enter valid apellidos'),
        rol: yup.string().required('Please enter rol').email('Please enter valid rol'),
    })
);

  return (
      <Card>
          <Card.Body>
              {/* Sign up Modal */}
              <Modal show={props.signUpModal} onHide={props.toggleSignUp}>
                  <Modal.Body>
                      <div className="text-center mt-2 mb-4">
                          <a href="/">
                              <span></span>
                              <span></span>
                          </a>
                      </div>
                      <Form validated={validated} resolver={schemaResolver} defaultValues={{}}>
                      <Form.Group className="mb-3" controlId="username">
                          <Form.Label>Usuario</Form.Label>
                          <Form.Control
                              type="text"
                              name="username"
                              placeholder="Digite el username"
                              value={temas.username}
                              onChange={(e) => setTemas({ ...temas, username: e.target.value})}
                          />
                          <Form.Control.Feedback type="invalid">
                              Por favor, digite el username.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                              type="text"
                              name="password"
                              placeholder="Digite el password"
                              value={temas.password}
                              onChange={(e) => setTemas({ ...temas, password: e.target.value})}
                          />
                          <Form.Control.Feedback type="invalid">
                              Por favor, digite el password.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="nombres">
                          <Form.Label>Nombres</Form.Label>
                          <Form.Control
                              type="text"
                              name="nombres"
                              placeholder="Digite el nombres"
                              value={temas.nombres}
                              onChange={(e) => setTemas({ ...temas, nombres: e.target.value})}
                          />
                          <Form.Control.Feedback type="invalid">
                              Por favor, digite el nombre.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="apellidos">
                          <Form.Label>Apellido</Form.Label>
                          <Form.Control
                              type="text"
                              name="apellidos"
                              placeholder="Digite el apellido"
                              value={temas.apellidos}
                              onChange={(e) => setTemas({ ...temas, apellidos: e.target.value})}
                          />
                          <Form.Control.Feedback type="invalid">
                              Por favor, digite el apellido.
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="rol">
                          <Form.Label>Rol</Form.Label>
                          <Select
                              type="select"
                              name="rol"
                              className="react-select"
                              classNamePrefix="react-select"
                              onChange={(e) => setTemas({ ...temas, rol: e.value })}
                              options={[
                                  { value: temas.rol, rol: 'Rol: ' + temas.rol + '' },
                                  { value: 'Admin', label: 'Admin' },
                                  { value: 'Docente', label: 'Docente' },
                              ]}
                              placeholder="Selecione el rol..."
                              selected={temas.rol}
                          />
                          <Form.Control.Feedback type="invalid">Por favor, digite el status.</Form.Control.Feedback>
                      </Form.Group>
                          <div className="button-list">
                              <Button type="button" disabled={temas.message ? 'true' : ''} onClick={guardar}>
                                  +
                              </Button>
                              {temas.message && (
                                  <Button type="button" className="btn-icon" onClick={props.Close}>
                                      <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                                  </Button>
                              )}
                          </div>
                      </Form>
                  </Modal.Body>
              </Modal>
          </Card.Body>
      </Card>
  );
};

export default GuardarUsuarios;
