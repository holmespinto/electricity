// @flow
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';

const Register = (props): React$Element<React$FragmentType> => {
    //const { setOpen, open } = useContext(DashboardContext);
    const [items, setItems] = useState([
        {
            Categoria: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Nombre : '',
            idCategoria: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.idCategoria : '',
            Codigo: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Codigo : '',
            Descripcion: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Descripcion : '',
            Unidad: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Unidad : '',
            Cantidad: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Cantidad : '',
            ValorUnitario: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.ValorUnitario : '',
            TipoCategoria: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.TipoCategoria : '',
            accion: props?.accion,
            opcion: props?.opcion,
            tipo: props?.tipo,
            id: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.id : '',
        },
    ]);

    const dispatch = useDispatch();
    const { loading, queryForm, error } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));

    const schemaResolver = yupResolver(yup.object().shape({}));
    const onSubmit = () => {
        dispatch(queryFormSend(...items));
        setTimeout(function () {
            if (window.location.hash === '#/dashboard/Informes/EditarProyecto?p=1') {
                window.location.hash.reload();
            }
        }, 1000);
    };

    return (
        <>
            {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
            <Row>
                <Col sm={12}>
                    <div className="text-center m-auto ">
                        <h4 className="header-title bg-success text-white w-auto p-2">{`${props?.textBtn}`}</h4>
                    </div>
                </Col>
            </Row>
            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}
            <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Descripcion">
                            <FormInput
                                label="Descripcion"
                                type="textarea"
                                name="Descripcion"
                                rows="5"
                                containerClass={'mb-3'}
                                key="Descripcion"
                                placeholder="Digite la Descripcion"
                                value={items[0]?.Descripcion}
                                onChange={(e) => setItems([{ ...items[0], Descripcion: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Descripcion.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Unidad">
                            <Form.Label>Unidad </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="Unidad"
                                placeholder="Digite la Unidad"
                                value={items[0]?.Unidad}
                                onChange={(e) => setItems([{ ...items[0], Unidad: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite la Cantidad.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Cantidad">
                            <Form.Label>Cantidad </Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="Cantidad"
                                max={'1'}
                                placeholder="1"
                                value={items[0]?.Cantidad}
                                onChange={(e) => setItems([{ ...items[0], Cantidad: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite la Cantidad.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="ValorUnitario">
                            <Form.Label>Valor Unitario </Form.Label>
                            <Form.Control
                                disabled
                                type="number"
                                name="ValorUnitario"
                                placeholder="Digite el ValorUnitario"
                                value={items[0]?.ValorUnitario}
                                onChange={(e) => setItems([{ ...items[0], ValorUnitario: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el ValorUnitario.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}></Col>
                </Row>
                <Row>
                    <Col sm={9}></Col>
                    <Col sm={3}>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {props?.textBtn}
                        </Button>
                    </Col>
                </Row>
            </VerticalForm>
        </>
    );
};

export default Register;
