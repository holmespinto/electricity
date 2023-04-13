// @flow
import React, { useContext } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { DashboardContext } from '../../../layouts/context/DashboardContext';


/**
 * PageTitle
 */
const Title = ()=> {
  const {itemsmenu, itemsmenuprincipal,info} = useContext(DashboardContext)
      const breadCrumbItems=
        [
          // eslint-disable-next-line no-undef
          { label: itemsmenu.length===0 ?'Bienvenidos':itemsmenuprincipal.toUpperCase()+' / '+itemsmenu.toUpperCase(), path: '/'+itemsmenuprincipal.toUpperCase()+'/'+itemsmenu.toUpperCase()+ '/', active: true },
          // eslint-disable-next-line no-undef
          {title:itemsmenu.length===0 ?'Bienvenidos, para comenzar seleccione uno de los items del menu principal':itemsmenuprincipal.toUpperCase()+'-' + itemsmenu.toUpperCase()}
        ]
    return (
        <Row>
            <Col>
                <div className="page-title-box bg-success text-white">
                    <div className="page-title-right">
                        <Breadcrumb className="m-0">
                            <Breadcrumb.Item href="/" className="text-white">Inicio</Breadcrumb.Item>
                                    <Breadcrumb.Item active key='1' className="text-white">
                                            {breadCrumbItems[0]?.label}
                                    </Breadcrumb.Item>

                        </Breadcrumb>
                    </div>
                    <h4 className="page-title p-1 mb-2">{breadCrumbItems[1]?.title +' / '+(info?.programa? info?.programa+' / ':'')+(info?.sede? info?.sede.toUpperCase():'')}</h4>
                </div>
            </Col>
        </Row>
    );
};

export default Title;
