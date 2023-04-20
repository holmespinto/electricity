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
  const [signUpModal, setSignUpModal] = useState(false);
  const [signUpModalAdd, setSignUpModalAdd] = useState(false);

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
  const ConsultarListaDatos = useCallback(() => {
    setLoading(true)
    const url = `accion=${itemUrl}&opcion=consultar&tipo=${itemsmenuprincipal}`;
    const datosMaterial = api.sendRequestData(`${url}`);
    datosMaterial?.then(function (response) {
      try {
        setItems(response);
      } catch (error) {
        console.error(error);
      }
    }).catch((error) => console.error('Error:', error))
      .finally(() => {
        //setTimeout(function () {
        setLoading(false)
        // }, 000);
      });

  }, [itemUrl, itemsmenuprincipal]);

  const sendData = useCallback((event, opcion) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (validated) {
      let response;

      if (items) {
        var queryString = items[0]
          ? Object.keys(items[0])
            .map((key) => key + '=' + items[0][key])
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
            (opcion === 'add') ? setSignUpModalAdd(false) : setSignUpModal(false);
            ConsultarListaDatos()
          }, 2000);
        })
    }

  }, [items, validated, itemUrl, itemsmenuprincipal, ConsultarListaDatos]);

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
              ConsultarListaDatos()

            }, 5000);
          })
      }
    })
    // eslint-disable-next-line no-use-before-define
  }, [ConsultarListaDatos, itemsmenuprincipal]);


  //ACTUALIZAR REISTRO
  const update = useCallback((event) => {
    sendData(event, 'update')

  }, [sendData]);

  //GUARDAR REGISTRO
  const add = useCallback((event, data) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (validated) {
      let response;
      if (data) {
        var queryString = data
          ? Object.keys(data)
            .map((key) => key + '=' + data[key])
            .join('&')
          : '';
      }
      response = queryString;
      const url = `accion=${itemUrl}&opcion=add&${response}&tipo=${itemsmenuprincipal}`;
      const respuesta = api.sendRequestData(`${url}`);
      respuesta.then(function (resp) {
        Swal.fire('' + resp[0].menssage + '');

      })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
          setTimeout(function () {
            setSignUpModalAdd(false)
            ConsultarListaDatos()
          }, 2000);
        })
    }

  }, [ConsultarListaDatos, itemUrl, itemsmenuprincipal, validated]);


  const data = {
    itemsMenuCallBack,
    setLoading,
    isLoading,
    itemsmenuprincipal,
    itemUrl, setItems, items, validated,
    eliminar, update, ConsultarListaDatos, add,
    signUpModal, setSignUpModal,
    StatusColumn, sizePerPageList, INIT_RESPONSE,
    signUpModalAdd, setSignUpModalAdd
  };

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <>
      <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
    </>
  );
};
export { DashboardContext, DashboardProvider };
