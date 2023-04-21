import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Swal from 'sweetalert2'
import {environments} from '../environments/environments';

import { APICore } from './api/apiCore';
const api = new APICore();

var mock = new MockAdapter(axios);

export function configureFakeBackend() {
  mock.onPost('/login/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        let params = JSON.parse(config?.data);
        const url = `accion=auteur&opcion=consulta_auteur`;
        const Usuarios = api.sendRequestUser(`${url}`,params.username,params.password);
        Usuarios.then(function (response) {
          try {
          if (response.status === '404' || response.status ==='') {
              resolve([401, { message: 'Username or password is incorrect' }]);
          } else {
              if (response.status === '202') {
                  let arrayRes = [];
                  let users = {
                      id: response?.Idsuario,
                      name: response?.Nom,
                      username: response?.Usuario,
                      email: response?.Email,
                      role: response?.Rol,
                      password: response?.Password,
                      token: environments.TOKEN,
                      Apikey: response?.Apikey,
                      ApiToken: response?.ApiToken,
                  };
                  arrayRes.push(users);
                  resolve([202,arrayRes]);
              }
          }
        } catch (error) {
          console.error(error);
          resolve([401, { message:error }]);
        }
        });
      }, 1000);
    });
  });
  mock.onPost('/register/').reply(function (config) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let params = JSON.parse(config?.data);
            let obj=params?.datos

            if (params) {
              var queryString = obj
                ? Object.keys(obj)
                  .map((key) => key + '=' + obj[key])
                  .join('&')
                : '';
              }
              const url = `${queryString}`;
              const respuesta = api.sendRequestData(`${url}`);
              respuesta.then(function (resp) {
                Swal.fire('' + resp[0].menssage + '');
              })
                .catch((error) => console.error('Error:', error))
              resolve([200, params]);
            }, 1000);
        });
});

mock.onPost('/queryform/').reply(function (config) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let params = JSON.parse(config?.data);
            let obj=params?.datos

            if (params) {
              var queryString = obj
                ? Object.keys(obj)
                  .map((key) => key + '=' + obj[key])
                  .join('&')
                : '';
              }
              const url = `${queryString}`;
              const respuesta = api.sendRequestData(`${url}`);
              respuesta.then(function (resp) {
                Swal.fire('' + resp[0].menssage + '');
              })
                .catch((error) => console.error('Error:', error))
              resolve([200, params]);
            }, 1000);
        });
});



  mock.onPost('/forget-password/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        /*
        const [usuarios, setUsuarios] = useState([]);
        // get parameters from post request
        let params = JSON.parse(config.data);
        // find if any user matches login credentials
        let filteredUsers = usuarios.filter((user) => {
            return user.username === params.username;
        });

        if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let responseJson = {
                message: "We've sent you a link to reset password to your registered email.",
            };
            resolve([200, responseJson]);
        } else {
            // else return error
            resolve([401, { message: 'Sorry, we could not find any registered user with entered username' }]);
        }
        */
      }, 1000);
    });
  });
}
