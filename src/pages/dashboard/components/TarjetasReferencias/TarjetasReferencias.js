/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect, useState } from 'react';
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
  const [idCategoria, setIdCategoria] = useState(0);

  const { query, itemsApu,isLoading,pagesInSearch
  } = useContext(DashboardContext);
  const nombresApus = itemsApu?.data?.Apus || [{}];
  const SubCategorias = itemsApu?.data?.SubCategorias || [{}];
  const ProductosApu = itemsApu?.data?.ProductosApu || [{}];
  const ProyectosApu = itemsApu?.data?.ProyectosApu || [{}];

  //const permisos = PERMISOS_USER || [{}];
  useEffect(() => {
    query('RegistrosAvanzados', 'Apu', [{ opcion: 'consultar', obj: 'Apu' }]);
    const id = pagesInSearch();
    let str = '#/dashboard/Informes/asignarApu?p=';
    setIdCategoria(id?.replace(str, ''))

  }, [query])

  const DatosProyect = nombresApus?.length>0?nombresApus?.filter((t) => t.id === idCategoria):[{}]
  const apusProyecto = ProyectosApu?.length>0?ProyectosApu?.filter((t) => t.IdProyecto === idCategoria):[{}]
  const Datos=[{"data":{SubCategorias:SubCategorias,ProductosApu:ProductosApu,DatosProyect:DatosProyect[0],idProyecto:idCategoria,ProyectosApu:apusProyecto}}]
//

  return (<>
    <Row>
      {!isLoading && Datos?.length > 0? <Kanban  data={Datos[0]}  /> : ''}
    </Row>

  </>
  );

};

export default TarjetasReferencias;
