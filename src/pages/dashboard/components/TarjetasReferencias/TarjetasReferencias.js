/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row } from 'react-bootstrap';
//import Table from './Table'
import Kanban from './Board/'

import { DashboardContext } from '../../../../layouts/context/DashboardContext';

type TarjetasReferenciasProps = {
  onDateClick: (value: any) => void,
  onListaClick: (value: any) => void,
  IdCategorias?: number,
  textClass?: string,
  bgclassName?: string,
  icon?: string,
  title: string,
  idUser: number,
  description: string,
  inventario?: string,
  trend: {
    textClass?: string,
    icon?: string,
    stock?: string,
    time?: string,
  },
  data: {
    IdCategorias?: number,
    title: string,
    description: string,
    inventario?: string,
    stock?: string,
  },
};

const TarjetasReferencias = (props: TarjetasReferenciasProps): React$Element<any> => {
  const { query, itemsSubCategorias,PERMISOS_USER
  } = useContext(DashboardContext);
  const SubCategorias = itemsSubCategorias?.data?.SubCategorias || [{}];
  const permisos = PERMISOS_USER || [{}];
  useEffect(() => {
    query('RegistrosAvanzados', 'EditorPUA', [{ opcion: 'consultar', obj: 'EditorPUA' }]);
  }, [query])


  return (<>
    <Row>
    {SubCategorias?.length>0?<Kanban data={SubCategorias} />:''}
    </Row>

    </>
    );

};

export default TarjetasReferencias;
