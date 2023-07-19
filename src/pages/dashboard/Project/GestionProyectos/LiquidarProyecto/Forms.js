/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const Forms = (props) => {
    const { itemsUpdate, typeAcccion, itemsmenuprincipal, itemUrl } = useContext(DashboardContext);
    let Ids = localStorage.getItem('Ids');
    const idUrls = JSON.parse(Ids);
    const url = `?p=${idUrls?.p}&q=${idUrls?.q}`;
    const urlb = `/dashboard/${itemUrl}/`;
    const objAdd = {
        urlVariables: url,
        urlBase: urlb,
        idItems: itemsUpdate?.id,
        accion: itemUrl,
        opcion: 'AddItemOrden',
        tipo: itemsmenuprincipal,
        id: itemsUpdate?.id,
    };
    console.log(objAdd);
    return (
        <React.Fragment>
            {(() => {
                switch (typeAcccion) {
                    case 'VISTA':
                        return <>{'hghgh'}</>;
                        break;
                    case 'UPDATE':
                        return (
                            <>
                                <Fields
                                    items={itemsUpdate}
                                    title={'Actualizar una Orden Compra'}
                                    textBtn={'Actualizar Orden Compra'}
                                    accion={'GestionFinanciera'}
                                    tipo={'OrdenCompra'}
                                    opcion={'update'}
                                    validated={props.validated}
                                />
                            </>
                        );
                        break;
                    default:
                        return (
                            <>
                                <Fields
                                    items={itemsUpdate}
                                    title={'Crear una Orden Compra'}
                                    textBtn={'Crear Orden Compra'}
                                    accion={'GestionFinanciera'}
                                    tipo={'OrdenCompra'}
                                    opcion={'add'}
                                    validated={props.validated}
                                />
                            </>
                        );
                }
            })()}
        </React.Fragment>
    );
};
export default Forms;
