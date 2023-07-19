/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionProyecto } from '../../../../../hooks/useGestionProyecto';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import Forms from './Forms';
import Titulo from './Titulo';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';

export const LiquidarProyecto = () => {
    const [idCategoria, setIdCategoria] = useState(0);
    const { pagesInSearch, sizePerPageList } = useContext(DashboardContext);
    const { isLoading, itemsGestionarProyecto, query } = useGestionProyecto();
    useEffect(() => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/LiquidarProyecto?p=';
        setIdCategoria(id?.replace(str, ''));
        query('GestionProyecto', 'EditarProyecto', [
            { opcion: 'consultarLiquidacion', obj: 'EditarProyecto', idProyecto: id?.replace(str, '') },
        ]);
    }, []);

    const Proyecto = itemsGestionarProyecto?.data?.Proyecto[0] || [{}];
    const Principal = itemsGestionarProyecto?.data?.Principal[0] || [{}];
    const Liquidadas = itemsGestionarProyecto?.data?.Liquidadas || [{}];

    const ActionColumn = ({ row }) => {
        const { eliminar, validated, toggle, setOpen, setItemsUpdate, open, itemsmenuprincipal } =
            useContext(DashboardContext);

        const toggleSignUp = (id) => {
            let permiso = sessionStorage.getItem('PERMISO');
            const localPermiso = JSON.parse(permiso);
            if (localPermiso?.update === 'S') {
                if (row.cells[0].row.values.id === id) setItemsUpdate(row?.cells[0]?.row?.values);
                setOpen(open);
                toggle();
            } else {
                Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
            }
        };

        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);
        const obj = {
            open,
            toggleSignUp,
            localPermiso,
            validated,
            row: row.cells[0].value,
            eliminar,
        };
        return (
            <React.Fragment>
                <BtnSeccionAction obj={obj}>
                    <Forms
                        title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
                        validated={validated}
                    />
                </BtnSeccionAction>
            </React.Fragment>
        );
    };
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Código',
            accessor: 'Codigo',
            sort: true,
        },
        {
            Header: 'Descripcion',
            accessor: 'Descripcion',
            sort: true,
        },
        {
            Header: 'Unidad',
            accessor: 'Unidad',
            sort: true,
        },
        {
            Header: 'Cantidad',
            accessor: 'Cantidad',
            sort: true,
        },
        {
            Header: 'Valor Unitario',
            accessor: 'ValorUnitario',
            sort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];
    console.log(itemsGestionarProyecto, idCategoria);
    return (
        <>
            <Row>
                <Col xl={12}>
                    <Titulo
                        title1={Proyecto?.Nombre ? Proyecto?.Nombre : ''}
                        title2={Principal?.Valor ? Principal?.Valor : ''}
                    />
                </Col>
            </Row>
            {!isLoading && Liquidadas?.length > 0 ? (
                <Table
                    columns={columns}
                    data={Liquidadas}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    isVisible={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                />
            ) : (
                <PermisoAlert />
            )}
        </>
    );
};
