/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
import VistaPrevia from './VistaPrevia';

const OptionsActions = (props) => {

 const {itemsUpdate,itemUrl} = useContext(DashboardContext);
 const Productos = itemsUpdate?.Productos|| [];
  const conteg = []
Productos?.map((row, i) => {
    const obj = {
      id: row.id,
      Codigo: row.Codigo,
      value: row.id,
      label: row.Nombre,
      Total: row.Total,
      Unidad: row.Unidad,
      ValorUnitario: row.ValorUnitario,
      Producto:itemsUpdate?.Opcion
    }
    conteg.push(obj)
  })
  // if{
 //console.log('conteg',itemsUpdate?.Opcion)
  return (
  <React.Fragment>
{(itemsUpdate?.Opcion!=='VISTA')?<Fields
        accion={itemUrl}
        tipo={'Apu'}
        NombreApu={itemsUpdate?.Objetivo}
        IdApu={itemsUpdate?.id}
        Categorias={conteg}
        opcion={'add_producto_apu'}
        textBtn={'Adjuntar Equipo'}
        ItemsUpdate={[itemsUpdate]}
        producto={itemsUpdate?.Opcion} />:<div class="table-responsive-lg"><VistaPrevia  NombreApu={itemsUpdate?.Objetivo}/></div>}
  </React.Fragment>
    );
}
export default OptionsActions;

