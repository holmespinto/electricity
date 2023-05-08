/* eslint-disable array-callback-return */
// @flow
import React from 'react';
import { Card, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
//import { getItemStorage } from './itemStorage.ts';
//import { DashboardContext } from '../../../../layouts/context/DashboardContext';

type TarjetasReferenciasProps = {
    onDateClick: (value: any) => void,
    onListaClick: (value: any) => void,
    IdCategorias?: number,
    textClass?: string,
    bgclassName?: string,
    icon?: string,
    title: string,
    idUser: number,
    description: string,
    inventario?: string,
    trend: {
        textClass?: string,
        icon?: string,
        stock?: string,
        time?: string,
    },
    data: {
        IdCategorias?: number,
        title: string,
        description: string,
        inventario?: string,
        stock?: string,
    },
};

const Tarjetas = (props: TarjetasReferenciasProps): React$Element<any> => {


    //const [total, setTotal] = useState(0);
    const handleListaClick = (arg) => {
        props.onListaClick(arg);
    };
    const textClass = props.textClass || 'text-muted';
/*
    useEffect(() => {
        const itemsData = getItemStorage({
            item: 'storesDataRef',
            typeOfStorage: localStorage,
        });
        const filteredLocales = [itemsData?.filter(({ IdCategorias }) => IdCategorias === props.IdCategorias)];
        const Totals = filteredLocales?.length;
        setTotal(Totals);
    }, [props.IdCategorias]);
*/


  //


    return (
        <Card className={classNames('widget-flat', props.bgclassName)}>
            <Card.Body>
                   <div className="float-end">
                        <img src={props.image} className="rounded-circle avatar-lg img-thumbnail" alt="" />
                    </div>
                <h5 className={classNames('text-decoration-underline', 'mt-0', textClass)} title={props.description}>
                    {props.IdCategorias}-{props.title}
                </h5>
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            <i className={classNames(props.trend.icon)}></i>{'0'}
                        </span>
                        <span className="text-nowrap">{props.trend.time}</span>
                    </p>
           </Card.Body>
        </Card>
    );
};

export default Tarjetas;
