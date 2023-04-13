import React, {useEffect,useContext } from 'react';
import BuscadorProgramas from './BuscadorProgramas/BuscadorProgramas';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { SearchContext } from '../../../layouts/context/SearchContext';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

const SearchCustomizations = () => {
  const {
    itemPrograma,
    setPeriodo,
} = useContext(SearchContext);

  const {itemsmenuprincipal} = useContext(DashboardContext)

  useEffect(() => {
    if(itemPrograma?.length > 0){
     const url = `accion=periodos&opcion=consulta&programa=${itemPrograma}&datable=${itemsmenuprincipal}`;
     const syllab = api.sendRequestData(`${url}`);
     syllab.then(function (resp) {
         if (resp) {
           setPeriodo([resp]);
         }
     });
    }
   }, [itemPrograma,itemsmenuprincipal,setPeriodo]);

    return (
        <React.Fragment>
            <BuscadorProgramas />
        </React.Fragment>
    );
};

export default SearchCustomizations;
