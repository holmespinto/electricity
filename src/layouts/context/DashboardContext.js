import React, { createContext, useState, useCallback } from 'react';
import Swal from 'sweetalert2'
import classNames from 'classnames';
import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(false);
  const [itemsmenuprincipal, setitemsMenuPrincipal] = useState('');
  const [itemUrl, setitemsUrl] = useState('');
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsUsuarios, setIUsuarios] = useState([]);
  const [itemsQuery, setItemsQuery] = useState([]);
  const [empleadoNomina, setEmpleadoNomina] = useState([]);
  const [itemsQueryNominaEmpleado, setItemsQueryNominaEmpleado] = useState([{}]);
  //const [itemsConcNomina, setItemConcNomina] = useState([]);
  const [signUpModal, setSignUpModal] = useState(false);
  const [openNomin, setOpenNomin] = useState(false);
  const [signUpModalAdd, setSignUpModalAdd] = useState(false);
  const [signUpNomina, setSignUpNomina] = useState(false);
  const [signUpModalLiqNomina, setSignUpModalLiqNomina] = useState(false);
  const [open, setOpen] = useState(false);
  const [ ItemsUpdate, setItemsUpdate] = useState([]);


  const toggle = () => {
    setOpen((prevState) => !prevState);
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

  //DESPLEGAR LISTA
  const ConsultarListaDatos = useCallback((itemUrl, itemsmenuprincipal) => {
    setLoading(true)
    const url = `accion=${itemUrl}&opcion=consultar&tipo=${itemsmenuprincipal}`;
    const datosMaterial = api.sendRequestData(`${url}`);
    datosMaterial?.then(function (response) {
      try {
        response?setItems(response):setItems([]);

      } catch (error) {
        console.error(error);
      }
    }).catch((error) => console.error('Error:', error))
      .finally(() => {
        //setTimeout(function () {
        setLoading(false)
        // }, 000);
      });

  }, []);
  //DESPLEGAR LISTA CLIENTES

  const query = useCallback((itemUrl, itemsmenuprincipal,opcion) => {
    setLoading(true)
    let varibles;
    let datos=opcion;
    if (opcion) {
      var queryString = datos[0]
        ? Object.keys(datos[0])
          .map((key) => key + '=' + datos[0][key])
          .join('&')
        : '';
    }
    varibles = queryString;
    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&${varibles}`;
    const datosMaterial = api.sendRequestData(`${url}`);
    datosMaterial?.then(function (response) {
      try {
        (() => {
          switch (datos[0]?.obj) {
            case "Usuarios":
              setIUsuarios(response)
            // eslint-disable-next-line no-fallthrough
            default:
              setItemsQuery(response)
          }
        })()

      } catch (error) {
        console.error(error);
      }
    }).catch((error) => console.error('Error:', error))
      .finally(() => {
        //setTimeout(function () {
        setLoading(false)
        // }, 000);
      });

  }, []);

  const queryNominaEmpleado = useCallback((itemUrl, itemsmenuprincipal,opcion) => {
    setLoading(true)
    let varibles;
    let datos=opcion;
    if (opcion) {
      var queryString = datos[0]
        ? Object.keys(datos[0])
          .map((key) => key + '=' + datos[0][key])
          .join('&')
        : '';
    }
    varibles = queryString;
    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&${varibles}`;
    const datosMaterial = api.sendRequestData(`${url}`);
    datosMaterial?.then(function (response) {
      try {
        setItemsQueryNominaEmpleado(response);
      } catch (error) {
        console.error(error);
      }
    }).catch((error) => console.error('Error:', error))
      .finally(() => {
        //setTimeout(function () {
        setLoading(false)
        // }, 000);
      });

  }, []);

  const sendData = useCallback((event, opcion,data) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (validated) {
      let response;
      let datos;
      datos= (opcion ==='add')||(opcion ==='addNomina')?data:items;
      if (datos) {
        var queryString = datos[0]
          ? Object.keys(datos[0])
            .map((key) => key + '=' + datos[0][key])
            .join('&')
          : '';
      }

      response = queryString;
      const url = `accion=${itemUrl}&opcion=${opcion}&${response}&tipo=${itemsmenuprincipal}`;
      const respuesta = api.sendRequestData(`${url}`);
      respuesta.then(function (resp) {
        Swal.fire('' + resp[0].menssage + '');

      })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
          setTimeout(function () {
            (() => {
              switch (opcion) {
                case "add":
                  setSignUpModalAdd(false)
                // eslint-disable-next-line no-fallthrough
                case "addNomina":
                  queryNominaEmpleado('OtrosRegistros','GenerarNomina',[{opcion:'consultar_nomina_empleado',idEmpleado:data[0]?.IdEmpleado,idNomina:data[0]?.IdNomina}])
                // eslint-disable-next-line no-fallthrough
                default:
                  setSignUpModal(false);
                  ConsultarListaDatos(itemUrl,itemsmenuprincipal)
              }
            })()

          }, 2000);
        })
    }

  }, [validated, items, itemUrl, itemsmenuprincipal, queryNominaEmpleado, ConsultarListaDatos]);

  //ELEIMINAR REGISTRO

  const eliminar = useCallback((cel) => {
    Swal.fire({
      title: 'Desea eliminar el registro? ' + cel,
      showCancelButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const url = `accion=GestionBasica&tipo=${itemsmenuprincipal}&opcion=delete&id=${cel}`;
        const respuesta = api.sendRequestData(`${url}`);
        respuesta.then(function (resp) {
          Swal.fire('' + resp[0].menssage + '');
        })
          .catch((error) => console.error('Error:', error))
          .finally(() => {
            setTimeout(function () {
              ConsultarListaDatos(itemUrl,itemsmenuprincipal)

            }, 5000);
          })
      }
    })
    // eslint-disable-next-line no-use-before-define
  }, [ConsultarListaDatos, itemUrl, itemsmenuprincipal]);


  //ACTUALIZAR REISTRO
  const update = useCallback((event) => {
    sendData(event, 'update',[])

  }, [sendData]);

  //GUARDAR REGISTRO
  const add = useCallback((event, data) => {
    sendData(event, 'add', data)
  }, [sendData]);

  const addNomina = useCallback((event, data) => {
    sendData(event, 'addNomina', data)
  }, [sendData]);



  const data = {
    itemsMenuCallBack,
    setLoading,
    isLoading,
    itemsmenuprincipal,
    itemUrl, setItems, items, validated,
    eliminar, update, ConsultarListaDatos, add,
    signUpModal, setSignUpModal,
    StatusColumn, sizePerPageList, INIT_RESPONSE,
    signUpModalAdd, setSignUpModalAdd,
    itemsQuery, setItemsQuery,query,
    itemsQueryNominaEmpleado, setItemsQueryNominaEmpleado,queryNominaEmpleado,
    empleadoNomina, setEmpleadoNomina,
    signUpNomina, setSignUpNomina,
    setSignUpModalLiqNomina, signUpModalLiqNomina,
    addNomina,
    open, setOpen,toggle,
    openNomin, setOpenNomin,
    itemsUsuarios, setIUsuarios,
    ItemsUpdate, setItemsUpdate,
  };

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };
