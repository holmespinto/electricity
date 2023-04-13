import jwtDecode from 'jwt-decode';
import axios from 'axios';
import encodeBasic from '../../utils/encodeBasic';
import {environments} from '../../environments/environments';
import config from '../../config';

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;
axios.defaults.baseURL = config.REACT_APP_LOGIN_API;
axios.defaults.baseURL = config.REACT_APP_PASSWORD_API;

// intercepting to capture errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;

        if (error && error.response && error.response.status === 404) {
            // window.location.href = '/not-found';
        } else if (error && error.response && error.response.status === 403) {
            window.location.href = '/access-denied';
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    message = 'Access Forbidden';
                    break;
                case 404:
                    message = 'Sorry! the data you are looking for could not be found';
                    break;
                default: {
                    message =
                        error.response && error.response.data ? error.response.data['message'] : error.message || error;
                }
            }
            return Promise.reject(message);
        }
    }
);

const AUTH_SESSION_KEY = 'hyper_user';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromSession = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
const getApiUsuario = (url) => {
  const fetchUser = async () => {
      try {
          const res = await fetch(url);
          const datos = await res.json();
          return JSON.stringify(datos);
      } catch (error) {
          console.log(error);
      }
  };
  return fetchUser();
};
class APICore {

generateToken = (user,tokenSecret,tokenMaxAge) => {
  var jwt = require('jsonwebtoken');
    let token = '';

    var u = {
      id: user.id,
      exp: Math.floor((Date.now() + tokenMaxAge) / 1000),
      };

    token = jwt.sign(u,tokenSecret, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
   });
    return token;
}
getApiKey = () => {
  let userInfo = sessionStorage.getItem('hyper_user');
  const params={
    IdUsuario:userInfo?.id,
    username:environments.loginAPI,
    password:environments.passwordAPI
  }
  return params;
};
/*
async generateToken(user,tokenSecret,tokenMaxAge) {
  var jwt = require('jsonwebtoken');
  return new Promise((resolve, reject) => {
    // HMAC using SHA-256 hash algorithm
    // token 过期时间，单位秒
    jwt.sign({
      id: user.id,
      exp: Math.floor((Date.now() + tokenMaxAge) / 1000),
    }, tokenSecret, { algorithm: 'HS256'}, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
}
*/
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    };

    getFile = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls, params) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    };

    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data);
    };

    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data);
    };

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data);
    };

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url);
    };

    /**
     * post given data to url with file
     */
    importFile = (url, dataFiles) => {
      const sendRequest = async () => {

          const formData = new FormData();
          //for (let step = 0; step < data.length; step++) {
              formData.append('filename',dataFiles.filename);
              formData.append('size',dataFiles.size);
              formData.append('formattedSize',dataFiles.formattedSize);
              formData.append('lastModified',dataFiles.lastModified);
              formData.append('type',dataFiles.type);
          //}

           //const user = this.getLoggedInUser();
          const config = {
              method: 'POST',
              body: formData,
              headers: {
                  ...axios.defaults.headers,
                  'content-type': 'application/x-www-form-urlencoded; boundary=' + formData + '',
                  //Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
              },
          };

          try {
              const response = await fetch(`${url}`, config);
              const datos = await response.json();
              return datos;
          } catch (err) {
              console.error(err);
          }
      };
      return sendRequest();
  };

  sendRequestData = (url) => {
    const authOptions = {
      url: `${environments.baseURL}${url}`,
      method: 'GET',
      headers: {
          ...axios.defaults.headers,
          Authorization: `Basic ${encodeBasic(environments.loginAPI,environments.passwordAPI)}`,
      },
  };
    const sendRequest = async () => {
        try {
            const urls=`${environments.baseURL}${url}`;
            const response = await fetch(urls,authOptions);
            const datos = await response.json();
            return datos;
        } catch (err) {
            console.error(err);
        }
    };
    return sendRequest();
};
sendRequestUser = (url,username,password) => {
    const authOptions = {
      method: 'GET',
      headers: {
          Url:`${environments.baseURL}&${url}&username=${username}`,
          ...axios.defaults.headers,
          Authorization: `Basic ${encodeBasic(username,password)}`,
      },
  };
    const sendRequest = async () => {
        try {
            const urls=`${environments.baseURL}${url}`;
            const response = await fetch(urls,authOptions);
            const datos = await response.json();
            return datos;
        } catch (err) {
            console.error(err);
        }
    };
    return sendRequest();
};
    createWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(url, formData, config);
    };

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user || (user && !user.token)) {
            return false;
        }
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    };

    setLoggedInUser = (session) => {
        if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    };

    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromSession();
    };

    setUserInSession = (modifiedUser) => {
        let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { token, user } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...user, ...modifiedUser });
        }
    };
    getDatos = (url) => {
      const getconsultar = async () => {
          try {
              const res = await fetch(url);
              const datos = await res.json();
              return datos;
          } catch (error) {
              console.log(error);
          }
      };
      return getconsultar();
  };
  setUsuarioslocal = (url) => {
    return getApiUsuario(url);
};
}

/*
Check if token available in session
*/
let user = getUserFromSession();
if (user) {
    const { token } = user;
    if (token) {
        setAuthorization(token);
    }
}

export { APICore, setAuthorization };
