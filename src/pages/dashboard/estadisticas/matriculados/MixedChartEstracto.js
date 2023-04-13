// @flow
import React,{memo} from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// Mixed chart
const MixedChartEstracto = ({barChartData}): React$Element<any> => {
    // default options
    var apexMixedOpts = {
        chart: {
            height: 380,
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: [0, 2, 4],
            curve: 'smooth',
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
            },
        },
        colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d'],
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: 'vertical',
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100],
            },
        },
        labels: barChartData.axial,
        markers: {
            size: 0,
        },
        legend: {
            offsetY: -10,
        },
        xaxis: {
            type: 'date',
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== 'undefined') {
                        return y.toFixed(0) + ' Total';
                    }
                    return y;
                },
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    // chart data
    const apexMixedData = [
        {
            name: '1',
            type: 'column',
            data:barChartData.uno
        },
        {
            name: '2',
            type: 'area',
            data:barChartData.dos,
        },
        {
            name: '3',
            type: 'line',
            data:barChartData.tres,
        },{
            name: '4',
            type: 'line',
            data: barChartData.cuatro,
        },
    ];

    return (
        <Card>
            <Card.Body>
            <h4 className="header-title mb-3">{barChartData.programa}</h4>
            <h4 className="header-title mb-3">Por Estracto</h4>
                <Chart
                    options={apexMixedOpts}
                    series={apexMixedData}
                    type="line"
                    height={320}
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default memo(MixedChartEstracto);
