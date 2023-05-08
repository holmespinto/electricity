/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React,{useEffect} from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { FormInput } from '../../../../../components/';
import classNames from 'classnames';

type TaskItemProps = {
    task: {
        id: number,
        Descripcion: string,
        status: string,
        Unidad: string,
        image: string,
        idCategoria: string,
        ValorUnitario: number,
        Cantidad: number,
        Codigo: string,
        maj: string,
    },
};

// task item
const TaskItemB = (props: TaskItemProps): React$Element<any> => {
    const task = props.task || {};

    useEffect(() => {
      const total = (Number(task.ValorUnitario)===Number(props.currentCout))?Number(task.ValorUnitario):Number(task.ValorUnitario)+Number(props.currentCout)
      props.setCoutPage(total)
    }, [])


    return (
        <Card className="mb-0">
            <Card.Body className="p-3">
                <p className="mb-0">
                <small className="float-end text-muted">{task.maj}</small>
                <br/>
                </p>
                <h5 className="mt-2 mb-2 badge bg-primary text-wrap text-capitalize lh-1 text-start">
                    <a href="/" className="card-descripcion">
                        {task.Descripcion.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </a>
                </h5>
                <p className="mb-0" >
                <span
                    className={classNames('badge', {
                        'bg-danger': task.Unidad === 'UN',
                        'bg-secondary': task.Unidad === 'ML',
                        'bg-success': task.Unidad === 'GL',
                    })} style={{width: '32%' }}>

                    <FormInput
                name={task.id}
                type="number"
                containerClass="mb-0"
                placeholder=''
                key={task.id}
                className="form-control-light"

              />
                </span>

                </p>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle
                        variant="link"
                        className="text-muted card-drop arrow-none cursor-pointer p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical font-18"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <i className="mdi mdi-pencil me-1"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-delete me-1"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item divider />
                        <Dropdown.Item>
                            <i className="mdi mdi-plus-circle-outline me-1"></i>Add People
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-exit-to-app me-1"></i>Leave
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <p className="mb-0">
                    <img src={task.image?task.image:'https://robohash.org/doloribusatconsequatur.png?size=100x100&set=set1'} alt={task.Codigo} className="rounded-circle avatar-lg img-thumbnail w-25" style={{ height: '80px' }} />
                    <span className="align-middle bg-danger text-white"><b>{' $ '}{props.convertirACifraDecimal(Number(task.ValorUnitario))}</b></span>
                </p>

            </Card.Body>
        </Card>
    );
};

export default TaskItemB;
