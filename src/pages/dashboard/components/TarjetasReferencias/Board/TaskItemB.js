/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React,{useEffect,useState} from 'react';
import { Card, Dropdown,OverlayTrigger,Tooltip } from 'react-bootstrap';
import { FormInput } from '../../../../../components/';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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
  const valor = props.task.ValorUnitario || 0;
  const task = props.task || {};

  const [valorUnitario, setState] = useState(0);
  const [totalValorUnitario, setValorUnitario] = useState(0);

/*
    useEffect(() => {
      const subtotal = Number(valor)+(Number(totalValorUnitario))
      props.setCoutPage(subtotal)
    }, [])
*/
    useEffect(() => {
      const total = props.multiplicar(Number(valorUnitario),Number(valor))
      setValorUnitario(total)
      props.setCoutPage({Total:Number(props.currentCout+total)})
      if(valorUnitario>=2){
       props.update(task.id,props.idProyecto,total);
      }
    }, [valorUnitario])


    //

    return (
        <Card className="mb-0">
            <Card.Body className="p-3">
                <p className="mb-0">
                <small className="float-end text-muted">{'$ '}{props.convertirACifraDecimal(Number(task.ValorUnitario))}</small>
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
                onChange={(e) =>
                  setState(e.target.value)
                }
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
                        <OverlayTrigger
                              key="bottom"
                              placement="bottom"
                              overlay={<Tooltip>Editar Productos Asignados a Esta APU</Tooltip>}>
                               <Link to={`/dashboard/Informes/EditarProyecto?p=${props.idProyecto}`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                               <i className="mdi mdi-exit-to-app me-1"></i>Editar
                               </Link>
                            </OverlayTrigger>
                        </Dropdown.Item>
                        <Dropdown.Item divider />
                        <Dropdown.Item>
                        <OverlayTrigger
                              key="bottom"
                              placement="bottom"
                              overlay={<Tooltip>Eliminar Productos Asignados a Esta APU</Tooltip>}>
                              <button
                                className="btn btn-link p-0 text-secondary shadow-none px-0 py-2"
                                id="addNewTodo"
                                onClick={() => props.borrar(task.id,props.idProyecto)}>
                                <i className="mdi mdi-delete me-1"></i>Delete
                              </button>
                            </OverlayTrigger>
                        </Dropdown.Item>
                        <Dropdown.Item divider />


                    </Dropdown.Menu>
                </Dropdown>

                <p className="mb-0">
                    <img src={task.image?task.image:'https://robohash.org/doloribusatconsequatur.png?size=100x100&set=set1'} alt={task.Codigo} className="rounded-circle avatar-lg img-thumbnail w-25" style={{ height: '80px' }} />
                    <span className="align-middle bg-danger text-white"><b>{' $ '}{props.convertirACifraDecimal(Number(totalValorUnitario))}</b></span>
                </p>

            </Card.Body>
        </Card>
    );
};

export default TaskItemB;
