// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2'

// components
import Table from '../../components/Table';
import GuardarUsuarios from './GuardarUsuarios';


import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();
//var jwt = require('jsonwebtoken')
/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-success': row.original?.status,
                    'bg-danger': !row.original?.status,
                })}>
                {row.original.status ? 'Active' : 'Deactivated'}
            </span>
        </React.Fragment>
    );
};
/* action column render */
const ActionColumn = ({ row }) => {
    const INIT_TEMAS = {
        id: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
        username: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        nombres: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        apellidos: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
        rol: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
        clave: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
        status: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
    };

    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState(INIT_TEMAS);


    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };

    const eliminar = (event) => {
        Swal.fire({
          title: 'Desea eliminar el registro??',
          showCancelButton: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            //console.log('event',event.IdCategorias);
            const url = `accion=${event.itemUrl}&opcion=eliminar&id=${event.id}`;
            const respuesta = api.getDatos(`${url}`);
            respuesta.then(function (resp) {
                if (resp) {
                  Swal.fire('' + resp[0].menssage + '');
                }
            });
          }
        })
    };

    const actualizar = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validated) {
            let response;
            if (temas) {
                var queryString = temas
                    ? Object.keys(temas)
                          .map((key) => key + '=' + temas[key])
                          .join('&')
                    : '';
            }
            response = queryString;

            const url = `accion=usuarios&opcion=actualizar&${response}`;
            const respuesta = api.getDatos(`${url}`);
            respuesta.then(function (resp) {
                if (resp) {
                  Swal.fire('' + resp[0].menssage + '');
                }
            });
        }
    };

    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setTemas([]);
    };
    //console.log(row);
    return (
        <React.Fragment>
            <Modal show={signUpModal} onHide={toggleSignUp}>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                placeholder="Digite el username"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, username: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nombres">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="nombres"
                                placeholder="Digite el nombres"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, nombres: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el nombre.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="apellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="apellidos"
                                placeholder="Digite el apellido"
                                value={temas.title}
                                onChange={(e) => setTemas({ ...temas, apellidos: e.target.value })}
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
                                required
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, status: e.value })}
                                options={[
                                    { value: temas.rol, rol: 'Estado: ' + temas.rol + '' },
                                    { value: 'Admin', label: 'Admin' },
                                    { value: 'Consultas', label: 'Consultas' },
                                ]}
                                placeholder="Selecione el rol..."
                                selected={temas.rol}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el status.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Select
                                type="select"
                                name="status"
                                required
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, status: e.value })}
                                options={[
                                    { value: temas.status, label: 'Estado: ' + temas.status + '' },
                                    { value: 'Active', label: 'Activo' },
                                    { value: 'Deactivated', label: 'Inactivo' },
                                ]}
                                placeholder="Selecione el status..."
                                selected={temas.status}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el status.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="button-list">
                            <Button type="button" onClick={actualizar}>
                                +
                            </Button>

                            <Button type="button" className="btn-icon" onClick={Close}>
                                <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon" onClick={() => eliminar(temas)}>
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>
        </React.Fragment>
    );
};
const columns = [
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        classes: 'table-action',
        Cell: ActionColumn,
    },
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Usuario',
        accessor: 'username',
        sort: true,
    },
    {
        Header: 'Nombres',
        accessor: 'nombres',
        sort: true,
    },{
        Header: 'Apellidos',
        accessor: 'apellidos',
        sort: true,
    },{
        Header: 'Role',
        accessor: 'role',
        sort: true,
    },{
        Header: 'Clave',
        accessor: 'clave',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,
    },
];
const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
];
/*
function generateToken(user) {

    let token = '';
    var u = {
        username: user?.username,
        id: user?.id,
    };
    token = jwt.sign(u, user?.password, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    return token;
}
*/


const ListaUsuarios = ({props}) => {
    const [records, openCategoriass] = useState([]);
    const [data, cargarCategorias] = useState([]);
    const [signUpModal, setSignUpModal] = useState(false);

    useEffect(() => {
        const url = `accion=configuraciones&opcion=consultar`;
        const syllab = api.getDatos(`${url}`);
        syllab.then(function (resp) {
            if (resp) {
                openCategoriass(resp);
            }
        });
    }, [props]);

    useEffect(() => {
        if (records && records.length > 0) {
            //const cur = JSON.parse(records);
            const mapped = [];
            mapped.push(records);
            cargarCategorias(mapped[0]);
        }
    }, [records]);

    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };
    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        // agregarsetTemas([]);
    };
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Adminitrador de Usuarios:</h4>
                            <Row>
                            <Col sm={4}></Col>
                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                theadClass="table-light"
                                searchBoxClass="mt-2 mb-3"
                                isSearchable={true}
                            />
                            <Row>
                                    <GuardarUsuarios
                                        signUpModal={signUpModal}
                                        Close={Close}
                                        toggleSignUp={toggleSignUp}
                                    />
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ListaUsuarios;
