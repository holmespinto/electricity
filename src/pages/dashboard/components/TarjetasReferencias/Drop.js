/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Card } from 'react-bootstrap';
import classNames from 'classnames';
import BtnActions from '../../components/BtnActions';
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
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,
  width: 230,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});
const getItems = (SubCategorias) => {
  let array = []
SubCategorias?.map((row, i) => {
   /*
  const obj = {
      id: row.original.id,
      content: row.original.Descripcion,
      image: row.original.image,
      Codigo: row.original.Codigo
    }
*/
const obj = {
  id: row.id,
  content: row.Descripcion,
  image: row.image,
  Codigo: row.Codigo
}
    array.push(obj)
  })
  return array
}
const QuoteApp = (props) => {
  const SubCategorias = props?.data || [{}];
  //const Categorias = props?.rows || [{}];
  const [state, setState] = useState([getItems(SubCategorias)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }
  let trend = [
    {
      textClass: 'badge bg-info',
      icon: 'mdi mdi-arrow-down-bold',
      stock: '1',
      time: '1',
    },
  ];
  //console.log('SubCategorias',Categorias?.data  )
  return (
    <Row>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <Card>
        <Card.Body>

          <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Row>

                {state.map((el, ind) => (
                  <Droppable key={ind} droppableId={`${ind}`} >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {el.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div className="me-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <Card className={classNames('mb-0', 'mt-1', 'text-white', 'bg-info','w-60')} >
                                  <Card.Body>
                                    <div className="me-2">
                                      <blockquote className="card-bodyquote mb-0">
                                        <div className="float-end">
                                          <img
                                            src={item.image ? item.image : 'https://robohash.org/animidebitisfacilis.png?size=100x100&set=set1'}
                                            className="rounded-circle avatar-lg img-thumbnail"
                                            alt=""
                                          />
                                        </div>
                                        <p className={classNames('mb-0')}>
                                          <span
                                            className={classNames(trend[0].textClass, 'me-2')}>
                                            <i className={classNames(trend[0].icon)}></i>
                                            {item.Codigo}
                                          </span><h6
                                            className={classNames(
                                              'text-justify-content'
                                            )}
                                          >
                                            {item.Descripcion}
                                          </h6></p>
                                        <footer>
                                          <span className="text-nowrap">
                                            <BtnActions
                                              permisos={'S'}
                                              key={`EDITAR_${item.id}`}
                                              toggleActions={'toggleSignUp'}
                                              row={item.id}
                                              titulo={'Ver...'}
                                              descripcion={'Ver contenido'}
                                              icon={'mdi mdi-eye-check'}
                                            /><BtnActions
                                              permisos={'S'}
                                              key={`ELIMINAR_${item.id}`}
                                              toggleActions={'eliminar'}
                                              row={item.id}
                                              titulo={'Seleccionar'}
                                              descripcion={'Seleccionar APU'}
                                              icon={'mdi mdi-alpha-a-circle'}
                                            /> </span>
                                        </footer>
                                      </blockquote>
                                    </div>

                                  </Card.Body>

                                  <div
                                    style={{
                                      display: "d-flex",
                                      justifyContent: "space-around"
                                    }}
                                  >
                                    {item.content}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newState = [...state];
                                        newState[ind].splice(index, 1);
                                        setState(
                                          newState.filter(group => group.length)
                                        );
                                      }}
                                    >
                                      delete
                                    </button>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}

              </Row>
            </DragDropContext>
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default QuoteApp;
