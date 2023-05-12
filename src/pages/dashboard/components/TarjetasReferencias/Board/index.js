/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useState,useContext } from 'react';
import { Row, Col,  Modal } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import classNames from 'classnames';

// components
import VistaPrevia from '../../RegistrosAvanzados/AnalisisPreciosUnitarios/VistaPrevia';
//import { FormInput } from '../../../../../components/';
import { convertirACifraDecimal,multiplicar } from '../../../../../utils/convertirACifraDecimal';

import TaskItem from './Task';
import TaskItemB from './TaskItemB';
import Pagination from '../Pagination'
import HorizontalSteps from '../../HorizontalSteps/HorizontalSteps'
import TitleProyect from '../../TitleProyect/TitleProyect'



type StateType = {
  todoTasks: Array<any>,
  inprogressTasks: Array<any>,
  totalTasks: number,
  newTaskModal: boolean,
  newTask: any,
  currentCout: any,
};
const defaultAvatar='https://robohash.org/doloribusatconsequatur.png?size=100x100&set=set1'
// kanban
const Kanban = (props): React$Element<React$FragmentType> => {
 const {setItemsUpdate,add,update,borrar} = useContext(DashboardContext);
  const idProyecto = props?.data?.data?.idProyecto || 0;
  const tasks = props?.data?.data?.SubCategorias || [{}];
  const ProductosApu = props?.data?.data?.ProductosApu || [{}];
  const DatosProyect = props?.data?.data?.DatosProyect || [{}];


  const [currentCout, setCoutPage] = useState({Total:0});
   const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const [state, setState] = useState < StateType > ({
    todoTasks: tasks.filter((t) => t.status === 'Pending'),
    inprogressTasks: tasks.filter((t) => t.status === 'Inprogress'),
    totalTasks: tasks.length,
    newTaskModal: false,
    newTask: null,
  });


  /**
   * Toggles the new task modal
   */
  const toggleNewTaskModal = () => {
    setState({
      ...state,
      newTaskModal: !state.newTaskModal,
    });
  };

  /**
   * Creates new empty task with given status
   */
  const newTask = (status, queue,id) => {
   let array=[]
   const datosTask=state?.todoTasks.filter((t) => t.id ===id)
    if (id > 0)
    datosTask?.map((row, i) => {
      const obj ={
        id: row.id,
        IdApu: row.id,
        Objetivo: row.Descripcion,
        Total: row.Cantidad,
        Codigo: row.Codigo,
        Unidad: row.Unidad,
        ValorUnitario: row.ValorUnitario,
        idCategoria: row.idCategoria,
        Opcion: [],
        Productos:ProductosApu,
      }
        if (row.id === id) {
          array.push(obj)
        }
      })
    setState({
      ...state,
      newTask: { dueDate: new Date(), image: defaultAvatar, status: status, queue: queue,id:id},
      newTaskModal: true,
      datosTask:array[0]
    });
    setItemsUpdate(array[0])

  };



  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  /**
   * Gets the list
   */
  const getList = (id) => state[id];

  /**
   * On drag end
   */
  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(getList(source.droppableId), source.index, destination.index);
      let localState = { ...state };
      localState[source.droppableId] = items;
      setState(localState);

    } else {
      const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
      const localState = { ...state, ...result };
      setState(localState);
      add(result.inprogressTasks[0].id,idProyecto)

    }
  };

  const currentTasks = state.todoTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredTasks = currentTasks.filter(task => {
    const Descripcion = task.Descripcion.toLowerCase();
    const Codigo = task.Codigo.toLowerCase();
    return Descripcion.includes(searchTerm.toLowerCase()) || Codigo.includes(searchTerm.toLowerCase());
  })


  //console.log('DatosProyect',state)
  return (
    <React.Fragment>
      <HorizontalSteps
      contentInit={'current'}
      contentEnd={''}
      titleInit={''}
      titleEnd={'Editar'}
      idProyecto={idProyecto} />

    <Row>
        <Col xl={12}>
          <TitleProyect title={DatosProyect?.Objetivo?DatosProyect?.Objetivo:'Ingrese nuevamente a esta opcion'} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
              {/* todo */}
              <Row>
                <Droppable droppableId="todoTasks">
                  {(provided, snapshot) => (
                    <><div>
                    <div className={classNames('mt-2 mb-3')}>
                        <span className="d-flex align-items-center">
                            Search :{' '}
                            <input
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder={`${state.todoTasks.length} records...`}
                                className="form-control w-auto ms-1"
                            />
                        </span>
                    </div>
                      <h5 className="mt-0 task-header">TODO ({state.todoTasks.length})</h5></div>
                      <div className="tasks" ref={provided.innerRef}>


                        {state.todoTasks.length === 0 && (
                          <p className="text-center text-muted pt-2 mb-0">No Tasks</p>
                        )}
                        {filteredTasks.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <TaskItem task={item} convertirACifraDecimal={convertirACifraDecimal} newTask={newTask}/>
                              </div>
                            )}
                          </Draggable>

                        ))}


                        {provided.placeholder}

                      </div>
                      <Pagination
                        tasksPerPage={tasksPerPage}
                        totalTasks={tasks.length}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}>
                      </Pagination>
                    </>
                  )}
                </Droppable>
              </Row>
              <Row>
                {/* in progress */}
                <Droppable droppableId="inprogressTasks">
                  {(provided, snapshot) => (
                    <><div>
                      <span className="d-flex align-items-center bg-primary pt-2"><h5 className="mt-0 task-header text-uppercase">
                        {state.inprogressTasks.length === 0?
                          <p className="text-center text-muted pt-2 mb-0">HAGA CLIK SOTENIDO EN LA TARJETA DE LA APU Y ARRASTRELA HACIA ABAJO,AL AREA GRIS, PARA ADJUNTARLA AL PROYECTO</p>:`+(${(state.inprogressTasks.length)})  Total General: $ ${convertirACifraDecimal(Number(currentCout.Total))}`
                        }
                      </h5></span>
                    </div>
                      <div ref={provided.innerRef} className="tasks bg-secondary w-auto shadow-none h-auto">


                        {state.inprogressTasks.map((item, index) => (

                          <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <TaskItemB
                                task={item}
                                idProyecto={idProyecto}
                                borrar={borrar}
                                newTask={newTask}
                                update={update}
                                setCoutPage={setCoutPage}
                                currentCout={currentCout.Total}
                                convertirACifraDecimal={convertirACifraDecimal}
                                multiplicar={multiplicar}
                                />

                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </>)}
                </Droppable>
              </Row>
            </div>
          </DragDropContext>
        </Col>
      </Row>

      {/* new task model */}
      {state.newTask && (
        <Modal show={state.newTaskModal} onHide={toggleNewTaskModal} size="lg" centered>
          <Modal.Header closeButton>
            <h4 className="modal-description">{state?.datosTask[0]?.Descripcion}</h4>
          </Modal.Header>
          <Modal.Body>
          <VistaPrevia/>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Kanban;
