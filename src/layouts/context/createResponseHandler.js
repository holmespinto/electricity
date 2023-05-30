const createResponseHandler = (response, setData) => {
  return {
    Usuarios: () => setData.setIUsuarios(response),
    Roles: () => setData.setRoles(response),
    default: () => setData.setItemsQuery(response)
  };
};
export default createResponseHandler;
