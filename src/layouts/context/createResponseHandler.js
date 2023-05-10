const createResponseHandler = (response, setData) => {
  return {
    Usuarios: () => setData.setIUsuarios(response),
    Roles: () => setData.setRoles(response),
    Empleado: () => setData.setEmpleado(response),
    GenerarNomina: () => setData.setNomina(response),
    ControlDiario: () => setData.setControlDiario(response),
    OrdenCompra: () => setData.setOrdenCompra(response),
    Cliente: () => setData.setCliente(response),
    Proyecto: () => setData.setProyecto(response),
    EditarProyecto: () => setData.setEditarProyecto(response),
    Productos: () => setData.setProductos(response),
    Categorias: () => setData.setCategorias(response),
    EditorPUA: () => setData.setSubCategorias(response),
    Apu: () => setData.setApu(response),
    ParametroPrecio: () => setData.setParametroPrecio(response),
    default: () => setData.setItemsQuery(response)
  };
};
export default createResponseHandler;
