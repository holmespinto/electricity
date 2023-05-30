// @flow
import React, { useEffect } from 'react';

import MenuNomina from './MenuNomina/MenuNomina';
import { useOtrosRegistros } from '../../../../../hooks/useOtrosRegistros';
const Nomina = (props) => {
  localStorage.removeItem('menuNomina')
  const permisos = props?.permisos || {};
  const {itemsNomina,query} = useOtrosRegistros()
  const datos = itemsNomina?.data?.Empleado || [{}];


  useEffect(() => {
    query('OtrosRegistros', 'Nomina', [{ opcion: 'consultar', obj: 'Nomina' }]);
  }, [query])

  return (
    <>
      <MenuNomina
        accion={'OtrosRegistros'}
        tipo={props.tipo}
        permisos={permisos}
        datos={datos}
        itemsNomina={itemsNomina}
      />
    </>
  );
};

export default Nomina;
