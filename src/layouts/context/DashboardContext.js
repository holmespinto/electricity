/* eslint-disable array-callback-return */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
import React, { createContext, useState, useCallback } from 'react';
import Swal from 'sweetalert2'
import classNames from 'classnames';
import encodeBasicUrl from '../../utils/encodeBasicUrl';
import {Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import createResponseHandler from './createResponseHandler';
import ConfirmacionEliminacionStrategy from './ConfirmacionEliminacionStrategy';
import ConfirmacionAddStrategy from './ConfirmacionAddStrategy';
import ConfirmacionUpdateStrategy from './ConfirmacionUpdateStrategy';
import ConfirmacionBorrarStrategy from './ConfirmacionBorrarStrategy';

import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(false);
  const [itemsmenuprincipal, setitemsMenuPrincipal] = useState('');
  const [itemUrl, setitemsUrl] = useState('');
  const [items, setItems] = useState([]);
  const [itemsUsuarios, setIUsuarios] = useState([]);
  const [itemsQuery, setItemsQuery] = useState([]);
  const [empleadoNomina, setEmpleadoNomina] = useState([]);
  const [signUpModal, setSignUpModal] = useState(false);
  const [openNomin, setOpenNomina] = useState(false);
  const [signUpModalAdd, setSignUpModalAdd] = useState(false);
  const [signUpNomina, setSignUpNomina] = useState(false);
  const [openActions, setActions] = useState(false);
  const [itemsUpProductos, setSignUpProductos] = useState(false);
  const [open, setOpen] = useState(false);

  const [itemsUpdate, setItemsUpdate] = useState([]);
  const [itemsAdd, setItemsAdd] = useState([]);
  const [itemsRoles, setRoles] = useState([]);
  const [itemsEmpleado, setEmpleado] = useState([]);
  const [itemsNomina, setNomina] = useState([]);
  const [itemsControlDiario, setControlDiario] = useState([]);
  const [itemsOrdenCompra, setOrdenCompra] = useState([]);
  const [itemsCliente, setCliente] = useState([]);
  const [itemsProyecto, setProyecto] = useState([]);
  const [itemsProductos, setProductos] = useState([]);
  const [itemsCategorias, setCategorias] = useState([]);
  const [itemsSubCategorias, setSubCategorias] = useState([]);
  const [itemsApu, setApu] = useState([]);
  const [itemsParametroPrecios, setParametroPrecio] = useState([]);
  const [itemsapuTransport, setApuTrasporte] = useState([]);
  const [PERMISOS_USER, setpermisos] = useState([{}]);
// función para obtener el valor de una cookie
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return JSON.parse(parts.pop().split(";").shift());
  }
}

// función para eliminar una cookie
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };
  const updateApu = (id) => {
      query('Informes', 'Apu', [{ opcion: 'consultar_idapu_vistaprevia', obj: 'Apu',IdApu:id}]);
   };
  //DESGLOSAR URL PARA CADA OPCION DEL MENU
  const itemsMenuCallBack = useCallback((e) => {

    const items_sub = e?.replace('/dashboard/', '').replace('/', '');
    if (items_sub) {
      let userInfo = JSON.parse(sessionStorage.getItem('ITEM_SELECT'))
      if (userInfo?.memorizer.length > 0) {
        setitemsMenuPrincipal(userInfo?.memorizer);
        setitemsUrl(userInfo?.menu);
        setLoading(false)
      }
    }
  }, []);

  const Spinners = () => {
    const sizes = ['sm'];
    return (
        <Card>
            <Card.Body>
                <div className="row">
                    {sizes.map((size, index) => {
                        return (
                            <div key={index} className="col-lg-6">
                                <Spinner className="text-primary m-2" color="primary" size={size} />
                            </div>
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );
};
  const StatusColumn = ({ row }) => {
    return (
      <React.Fragment>
        <span
          className={classNames('badge', {
            'bg-success': row.original.status,
            'bg-danger': !row.original.status,
          })}>
          {row.original.status ? 'Active' : 'Deactivated'}
        </span>
      </React.Fragment>
    );
  };

  const sizePerPageList = [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
  ];

  const INIT_RESPONSE = [{
    id: 1,
    Nombre: 'NO EXISTE AUN REGISTROS EN EL SISTEMA',
    Unidad: '0',
    Valor: '0',
    Descripcion: '',
    status: 'Deactivated',
  }];

  const queryFile = useCallback((queryDatos,dataFile) => {
    const url = `accion=selectedFile&tipo=selectedFile&opcion=add_imagen_apu&${queryDatos}`;
    const datosMaterial = api.sendFile(url,dataFile);
    datosMaterial?.then(function (resp) {
        Swal.fire('' + resp[0].menssage + '');
    }).catch((error) => console.error('Error:', error))
      .finally(() => {
        setTimeout(function () {
        setLoading(false)
        },1000);
      });

  }, []);


//QUERY DE RESPUSTA DE CONSULTAS
  const query = useCallback((itemUrl, itemsmenuprincipal, opcion) => {
    setLoading(true);
    let varibles;
    let datos = opcion;
    if (opcion) {
      var queryString = datos[0]
        ? Object.keys(datos[0])
          .map((key) => key + '=' + datos[0][key])
          .join('&')
        : '';
      varibles = queryString;
    }
    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&${varibles}`;
    const datosMaterial = api.sendRequestData(`${url}`);
    datosMaterial?.then(function (response) {
      try {
        const dataHandler = createResponseHandler(response, {
          setIUsuarios,
          setRoles,
          setEmpleado,
          setNomina,
          setControlDiario,
          setOrdenCompra,
          setCliente,
          setProyecto,
          setProductos,
          setCategorias,
          setSubCategorias,
          setApu,
          setParametroPrecio,
          setItemsQuery
        });
        const handler = dataHandler[datos[0]?.obj] || dataHandler.default;
        handler();
      } catch (error) {
        console.error(error);
      }
    })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setTimeout(function () {
          setLoading(false);
        }, 1000);
      });
  }, []);

  //ELEIMINAR REGISTRO
  const eliminar = useCallback((cel) => {
    const estrategiaConfirmacion = new ConfirmacionEliminacionStrategy();
    estrategiaConfirmacion.confirmar(cel, (cel) => {
      const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=delete&id=${cel}`;
      const respuesta = api.sendRequestData(`${url}`);
      respuesta.then(function (resp) {
        Swal.fire('' + resp[0].menssage + '');
      })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
          setTimeout(function () {
          }, 5000);
        });
    });
  }, [itemUrl, itemsmenuprincipal]);


  const onPermisos = useCallback((itemUrl) => {
    setTimeout(function () {

      // get parameters from post request
      let userInfo = sessionStorage.getItem('hyper_user');
      const user = JSON.parse(userInfo);
      if (user) {
        const url = `accion=permisos&opcion=consultar&IdMenu=${encodeBasicUrl(user[0]?.role)}`;
        const datosMenu = api.sendRequestData(`${url}`);
        datosMenu.then(function (response) {
          try {
            const perm = []
            const permisos = response?.Permisos || [{}];
            if (itemUrl.length > 0)
              permisos?.map((row, i) => {
                if (row.opcion === itemUrl) {
                  perm.push(row)
                }
              })

           perm?.length > 0?setpermisos(perm[0]):setpermisos([{
            "query": "N",
            "add": "N",
            "update": "N",
            "delete": "N",
            "opcion": itemUrl,
            "userInfo":user[0]?.role
        }])

          } catch (error) {
            console.error(error);
          }
        });
      }
    }, 1000);
  }, []);

 //EDITOR DE APUS
 const add = useCallback((cel,idProyecto) => {
  const estrategiaConfirmacion = new ConfirmacionAddStrategy();
  estrategiaConfirmacion.confirmar(cel, (cel) => {
    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=add_apu&idApu=${cel}&idProyecto=${idProyecto}`;
    const respuesta = api.sendRequestData(`${url}`);
    respuesta.then(function (resp) {
      Swal.fire('' + resp[0].menssage + '');
    })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setTimeout(function () {
        }, 5000);
      });
  });
}, [itemUrl, itemsmenuprincipal]);

 //ACTULIZAR  APUS ASIGNADAS
 const update = useCallback((cel,idProyecto,valor) => {
  const estrategiaConfirmacion = new ConfirmacionUpdateStrategy();
  estrategiaConfirmacion.confirmar(cel, (cel) => {
    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=update_apu&idApu=${cel}&idProyecto=${idProyecto}&valor=${valor}`;
    const respuesta = api.sendRequestData(`${url}`);
    respuesta.then(function (resp) {
      Swal.fire('' + resp[0].menssage + '');
    })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setTimeout(function () {
        }, 5000);
      });
  });
}, [itemUrl, itemsmenuprincipal]);

 //ACTULIZAR  APUS ASIGNADAS
 const borrar = useCallback((cel,idProyecto) => {
  const estrategiaConfirmacion = new ConfirmacionBorrarStrategy();
  estrategiaConfirmacion.confirmar(cel, (cel) => {
    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=delete_apu&idApu=${cel}&idProyecto=${idProyecto}`;
    const respuesta = api.sendRequestData(`${url}`);
    respuesta.then(function (resp) {
      Swal.fire('' + resp[0].menssage + '');
    })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setTimeout(function () {
        }, 5000);
      });
  });
}, [itemUrl, itemsmenuprincipal]);

  const data = {
    itemsMenuCallBack,
    setLoading,
    setitemsMenuPrincipal,
    isLoading,
    itemsmenuprincipal,setitemsUrl,
    itemUrl, setItems, items,
    eliminar,
    signUpModal, setSignUpModal,
    StatusColumn, sizePerPageList, INIT_RESPONSE,
    signUpModalAdd, setSignUpModalAdd,
    itemsQuery, setItemsQuery, query,
    empleadoNomina, setEmpleadoNomina,
    signUpNomina, setSignUpNomina,
    open, setOpen, toggle,
    openNomin, setOpenNomina,
    openActions, setActions,

    itemsUsuarios, setIUsuarios,
    itemsUpdate, setItemsUpdate,
    itemsAdd, setItemsAdd,
    itemsRoles, setRoles,
    itemsEmpleado, setEmpleado,
    itemsNomina, setNomina,
    itemsControlDiario, setControlDiario,
    itemsOrdenCompra, setOrdenCompra,
    itemsCliente, setCliente,
    itemsProyecto, setProyecto,
    Spinners,
    itemsProductos, setProductos,
    itemsUpProductos, setSignUpProductos,
    itemsCategorias, setCategorias,
    itemsSubCategorias, setSubCategorias,
    itemsApu, setApu,
    itemsapuTransport, setApuTrasporte,
    itemsParametroPrecios, setParametroPrecio,
    getCookie,deleteCookie,
    queryFile,updateApu,
    onPermisos, PERMISOS_USER,add,update,borrar
  };
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };
