import React from 'react';
import { Row, Col, Tab, Card, Nav} from 'react-bootstrap';
import classnames from 'classnames';
import NominaEmpleado from '../NominaEmpleado/NominaEmpleado';
const tabItems = [
  {
    id: 1,
    title: 'Generar Nomina',
    icon: 'mdi mdi-home-variant',
    text: 'En esta sección se Genera la Nomina',
  }
];
const MenuNomina = (props) => {

return (
    <React.Fragment>
      <Row>
        <Card>
          <Card.Body>
            <Tab.Container defaultActiveKey="1">
              <Nav variant="tabs" className={classnames("nav-bordered")} as="ul">
                {tabItems?.map((tab, index) => {
                  return (
                    <Nav.Item as="li" key={index}>
                      <Nav.Link href="#" eventKey={tab.id} >
                        <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
                        <span className={classnames("d-none d-md-block")}>{tab.title}</span>
                      </Nav.Link>
                    </Nav.Item>
                  )
                })}
              </Nav>
              <Tab.Content className={classnames("px-4 pb-4 pt-0 mx-auto")}>
                {tabItems?.map((tab, index) => {
                  return (
                    <Tab.Pane eventKey={tab.id} id={tab.id} key={index}>
                      <Row>
                        <Col sm="12 mt-1">
                          {(() => {
                            switch (tab.id) {
                              case 1:
                                return ( <>
                                <Row>
                                   <Col sm="12 mt-1">
                                  <NominaEmpleado
                                     tipo={props.tipo}
                                     permisos={props.permisos}
                                    accion={props.accion}
                                    datos={props.datos}
                                    EmpleadoNomina={props?.datos?.EmpleadoNomina}
                                    itemsNomina={props?.itemsNomina}
                                    />

                                  </Col>
                                </Row>
                                </> )
                              default:
                                return (
                                  'defould'
                                );
                            }
                          })()}

                        </Col>
                      </Row>

                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};
export default MenuNomina;
