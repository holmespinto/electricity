import { Modal, Pagination, Row } from "react-bootstrap";
import BtnActions from "../BtnActions";
import React from "react";

const BtnSeccionAction = (props,children) => {
  return (
    <React.Fragment>
      <Modal show={props?.obj?.open} onHide={props?.obj?.toggleSignUp}>
        <Modal.Body>{props?.children ? props?.children : null}
        </Modal.Body>
      </Modal>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>
            {
              (props?.obj?.localPermiso?.update === 'S') ?
                <BtnActions
                  permisos={'S'}
                  key={`EDITAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={'Editar Proyecto'}
                  icon={'mdi mdi-square-edit-outline'}
                /> : ''
            }
          </Pagination.Item>
          <Pagination.Item>
            {
              (props?.obj?.localPermiso?.delete === 'S') ?
                <BtnActions
                  permisos={'S'}
                  key={`ELIMINAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.eliminar}
                  row={props?.obj?.row}
                  titulo={'ELIMINAR'}
                  descripcion={'Registrar Proyecto'}
                  icon={'mdi mdi-delete'}

                /> : ''
            }
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionAction;
