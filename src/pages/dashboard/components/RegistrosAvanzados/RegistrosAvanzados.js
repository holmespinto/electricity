// @flow
import React  from 'react';
import ParametosPrecios from './ParametosPrecios/ParametosPrecios';
import Categorias from './Categorias/Categorias';
import SubCapitulos from './SubCapitulos/SubCapitulos';
import AnalisisPreciosUnitarios from './AnalisisPreciosUnitarios/AnalisisPreciosUnitarios';
import PermisoAlert from '../PermisoAlert/PermisoAlert';

const RegistrosAvanzados = (props) => {



const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props.tipo) {
          case 'Categorias':
            return (<>
            {permisos?.query?.length ===1 ?
            <Categorias
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
              permisos={permisos}
            />:<PermisoAlert/>}
            </>);
            case 'EditorPUA':
            return (<>
            { permisos?.query?.length ===1 ?
            <SubCapitulos
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
              permisos={permisos}
            />:<PermisoAlert/>}
            </>);
            case 'APU':
            return (<>
            { permisos?.query?.length ===1 ?
            (<AnalisisPreciosUnitarios
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
              permisos={permisos}
            />):<PermisoAlert/>}
            </>);
            case 'ParametosPrecios':
            return (<>
            { permisos?.query?.length ===1 ?
            <ParametosPrecios
              accion={'RegistrosAvanzados'}
              tipo={props.tipo}
              permisos={permisos}
            />:<PermisoAlert/>}
            </>);
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default RegistrosAvanzados;
