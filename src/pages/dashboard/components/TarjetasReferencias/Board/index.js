/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
// components
import HyperDatepicker from '../../../../../components/Datepicker';
import { FormInput } from '../../../../../components/';
import { convertirACifraDecimal } from '../../../../../utils/convertirACifraDecimal';

import TaskItem from './Task';
import TaskItemB from './TaskItemB';
import Pagination from '../Pagination'
// dummy data
//import { tasks } from './Data';

import defaultAvatar from './avatar-1.jpg';


type StateType = {
  todoTasks: Array<any>,
  inprogressTasks: Array<any>,
  totalTasks: number,
  newTaskModal: boolean,
  newTask: any,
  currentCout: any,
};

// kanban
const Kanban = (props): React$Element<React$FragmentType> => {
  const tasks = props?.data || [{}];
  const [currentCout, setCoutPage] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(4);
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

  /*
   * Form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      idCategoria: yup.string().required(),
      Descripcion: yup.string().required(),
      Unidad: yup.string().required(),
      ValorUnitario: yup.string().required(),
      Codigo: yup.string().required(),
    })
  );

  /*
   * Form methods
   */
  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

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
  const newTask = (status, queue) => {
    setState({
      ...state,
      newTask: { dueDate: new Date(), image: defaultAvatar, status: status, queue: queue },
      newTaskModal: true,
    });
  };

  /**
   * When date changes
   * @param {} date
   */
  const handleDateChange = (date) => {
    if (state.newTask) {
      setState({
        ...state,
        newTask: { ...state.newTask, dueDate: date },
      });
    }
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
    }
  };

  /**
   * Handles the new task form submission
   */
  const handleNewTask = (event, values) => {
    const formData = {
      idCategoria: values.target['idCategoria'].value,
      Descripcion: values.target['Descripcion'].value,
      Unidad: values.target['Unidad'].value,
      ValorUnitario: values.target['ValorUnitario'].value,
      image: values.target['image'].value,
      Codigo: values.target['Codigo'].value,
    };
    const newTask = {
      ...state.newTask,
      ...formData,
      id: state.totalTasks + 1,
      dueDate: state.newTask.dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      currentCout: currentCout,
    };

    var localState = { ...state };
    var tasks = localState[newTask.queue];
    tasks.push(newTask);
    localState[newTask.queue] = tasks;
    localState['newTask'] = { dueDate: new Date(), image: '', status: '', queue: '' };
    localState['newTaskModal'] = false;
    localState['totalTasks'] = localState.totalTasks + 1;
    setState(localState);
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


  console.log('',currentCout)
  return (
    <React.Fragment>
      <Row>
        <Col>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
              {/* todo */}

              <Row>

                <Droppable droppableId="todoTasks">
                  {(provided, snapshot) => (
                    <><div><OverlayTrigger
                      key="bottom"
                      placement="bottom"
                      overlay={<Tooltip>Add New Todo Task</Tooltip>}>
                      <button
                        className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                        id="addNewTodo"
                        onClick={() => newTask('Pending', 'todoTasks')}>
                        <i className="mdi mdi-plus"></i>
                      </button>
                    </OverlayTrigger>
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
                                <TaskItem task={item} convertirACifraDecimal={convertirACifraDecimal}/>
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

                      <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={<Tooltip>Add New In-progress Task</Tooltip>}>
                        <button
                          className="btn btn-link p-0 text-secondary float-end shadow-none px-0 py-2"
                          id="addInprogressTask"
                          onClick={() => newTask('Inprogress', 'inprogressTasks')}>
                          <i className="mdi mdi-plus"></i>
                        </button>
                      </OverlayTrigger>

                      <span className="d-flex align-items-center bg-primary pt-2"><h5 className="mt-0 task-header text-uppercase">
                        {state.inprogressTasks.length === 0?
                          <p className="text-center text-muted pt-2 mb-0">No Tasks</p>:`+(${(state.inprogressTasks.length)})  Total General: $ ${convertirACifraDecimal(Number(currentCout))}`
                        }
                      </h5></span>
                    </div>
                      <div ref={provided.innerRef} className="tasks">


                        {state.inprogressTasks.map((item, index) => (

                          <Draggable key={item.id} draggableId={item.id + ''} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <TaskItemB task={item} setCoutPage={setCoutPage} currentCout={currentCout} convertirACifraDecimal={convertirACifraDecimal}/>

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
            <h4 className="modal-Description">Create New Task</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(handleNewTask)} className="p-2">
              <FormInput
                name="idCategoria"
                label="Categoria"
                type="select"
                containerClass="mb-3"
                className="form-select form-control-light"
                register={register}
                key="idCategoria"
                errors={errors}
                control={control}>
                <option>Select</option>
                <option>Hyper</option>
                <option>CRM</option>
                <option>iOS App</option>
              </FormInput>

              <Row>
                <Col md={8}>
                <FormInput
                name="description"
                label="Description"
                type="textarea"
                containerClass="mb-3"
                className="form-control form-control-light"
                rows="3"
                register={register}
                key="description"
                errors={errors}
                control={control}
              />
                </Col>
                <Col md={4}>
                  <FormInput
                    name="Unidad"
                    label="Unidad"
                    type="select"
                    containerClass="mb-3"
                    className="form-select form-control-light"
                    register={register}
                    key="Unidad"
                    errors={errors}
                    control={control}>
                    <option>Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </FormInput>
                </Col>
              </Row>



              <Row>
                <Col md={6}>
                  <FormInput
                    name="Codigo"
                    label="Assign To"
                    type="select"
                    containerClass="mb-3"
                    className="form-select form-control-light"
                    register={register}
                    key="Codigo"
                    errors={errors}
                    control={control}>
                    <option>Select</option>
                    <option>Coderthemes</option>
                    <option>Robert Carlile</option>
                    <option>Louis Allen</option>
                    <option>Sean White</option>
                    <option>Riley Steele</option>
                    <option>Zak Turnbull</option>
                  </FormInput>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label className="form-label">Due Date</label> <br />
                    <HyperDatepicker
                      hideAddon={true}
                      dateFormat="yyyy-MM-dd"
                      value={state.newTask.dueDate}
                      onChange={(date) => {
                        handleDateChange(date);
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
              <Col md={4}>
              <FormInput
                name="ValorUnitario"
                label="Valor Unitario"
                type="text"
                containerClass="mb-3"
                className="form-control form-control-light"
                register={register}
                key="ValorUnitario"
                errors={errors}
                control={control}
              />
                </Col>
              </Row>

              <div className="text-end">
                <Button variant="light" type="button" className="me-1" onClick={toggleNewTaskModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Kanban;
